import { useState, useEffect, useCallback } from "react";
import { DifyService, type ChatMessage } from "../app/services/dify-service";

interface UseDifyChatProps {
  userId: string;
  email?: string;
}

interface UseDifyChatResult {
  messages: ChatMessage[];
  input: string;
  setInput: (input: string) => void;
  handleInputChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  handleSubmit: (
    e: React.FormEvent<HTMLFormElement>,
    fileId?: string,
    attachedFile?: File
  ) => void;
  status: "idle" | "streaming" | "submitting";
  suggestedQuestions: string[];
  uploadFile: (file: File) => Promise<string>;
}

export function useDifyChat({
  userId,
}: UseDifyChatProps): UseDifyChatResult {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [status, setStatus] = useState<"idle" | "streaming" | "submitting">(
    "idle"
  );
  const [suggestedQuestions, setSuggestedQuestions] = useState<string[]>([]);
  const [conversationId, setConversationId] = useState<string | undefined>();

  // Initialize the Dify service
  const difyService = new DifyService();

  // Function to handle input changes
  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setInput(e.target.value);
    },
    []
  );

  // Function to upload a file
  const uploadFile = useCallback(
    async (file: File): Promise<string> => {
      return await difyService.uploadFile(file, userId);
    },
    [difyService]
  );

  // Function to handle message submission
  const handleSubmit = useCallback(
    async (
      e: React.FormEvent<HTMLFormElement>,
      fileId?: string,
      attachedFile?: File
    ) => {
      e.preventDefault();

      if (!input.trim() && !fileId) return;

      // Create a unique ID for this message
      const messageId = `user-${Date.now()}`;

      // Create a temporary user message
      const userMessage: ChatMessage = {
        id: messageId,
        role: "user",
        content: input,
        timestamp: new Date(),
        attachments: attachedFile
          ? [
              {
                name: attachedFile.name,
                size: attachedFile.size,
                type: attachedFile.type,
                id: fileId as string,
              },
            ]
          : [],
      };

      setInput("");
      setMessages((prev) => [...prev, userMessage]);
      if (suggestedQuestions.length > 0) setSuggestedQuestions([]);
      setStatus("submitting");

      try {
        // Create a placeholder for the assistant's response
        const assistantPlaceholder: ChatMessage = {
          id: `assistant-${Date.now()}`,
          role: "assistant",
          content: "",
          timestamp: new Date(),
        };

        // Add placeholder message for streaming
        setMessages((prev) => [...prev, assistantPlaceholder]);

        // Start streaming response
        await difyService.streamChatMessage(
          {
            query: input,
            user: userId,
            response_mode: "streaming",
            fileId: fileId,
            conversation_id: conversationId,
          },
          (chunk) => {
            setStatus("streaming");
            setMessages((prev) =>
              prev.map((msg) =>
                msg.id === assistantPlaceholder.id
                  ? { ...msg, content: msg.content + chunk }
                  : msg
              )
            );
          },
          (conversation_id) => {
            setConversationId(conversation_id);
            setStatus("idle");
          },
          (error) => {
            console.error("Error from Dify API:", error);
            setMessages((prev) =>
              prev.map((msg) =>
                msg.id === assistantPlaceholder.id
                  ? { ...msg, content: "Server busy, please try again later." }
                  : msg
              )
            );
            setStatus("idle");
          },
          (questions) => {
            setSuggestedQuestions(questions);
          }
        );
      } catch (error) {
        console.error("Failed to send message:", error);
        setStatus("idle");
      }
    },
    [input, difyService, conversationId, userId]
  );

  // Load conversation history if we have a conversation ID
  useEffect(() => {
    if (conversationId && messages.length === 0) {
      difyService
        .getConversationHistory(conversationId, userId)
        .then((history) => {
          // Map Dify history format to our ChatMessage format
          if (history && history.data) {
            const formattedMessages: ChatMessage[] = history.data.map(
              (msg: any) => ({
                id: msg.id,
                role: msg.belongs_to === "user" ? "user" : "assistant",
                content: msg.belongs_to === "user" ? msg.query : msg.answer,
                timestamp: new Date(msg.created_at * 1000),
                attachments: msg.message_files || [],
              })
            );
            setMessages(formattedMessages);
          }
        })
        .catch((error) =>
          console.error("Failed to load conversation history:", error)
        );
    }
  }, [conversationId, difyService, messages.length, userId]);

  return {
    messages,
    input,
    setInput,
    handleInputChange,
    handleSubmit,
    status,
    suggestedQuestions,
    uploadFile,
  };
}
