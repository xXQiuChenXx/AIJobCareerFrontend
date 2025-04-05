import { useState, useEffect, useCallback } from "react";
import { CozeAIService, type CozeMessage } from "../app/services/cozeAI";
import { ChatEventType } from "@coze/api";

interface UseCozeChat {
  messages: CozeMessage[];
  input: string;
  status: "idle" | "streaming" | "submitting";
  handleInputChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  setInput: (input: string) => void;
  suggestedQuestions: string[];
}

interface UseCozeAIConfig {
  apiKey: string;
  botId: string;
  user: {
    userId: string;
    email: string;
    username: string;
  };
}

export function useCozeChat({
  apiKey,
  botId,
  user,
}: UseCozeAIConfig): UseCozeChat {
  const [messages, setMessages] = useState<CozeMessage[]>([]);
  const [input, setInput] = useState("");
  const [status, setStatus] = useState<"idle" | "streaming" | "submitting">(
    "idle"
  );
  const [suggestedQuestions, setSuggestedQuestions] = useState<string[]>([]);
  const [conversationId, setConversationId] = useState<string | undefined>();

  // Initialize the Coze service
  const cozeService = new CozeAIService({ apiKey, botId, user });

  // Function to handle input changes
  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setInput(e.target.value);
    },
    []
  );

  // Function to handle message submission
  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      if (!input.trim()) return;

      // Create a temporary user message
      const userMessage: CozeMessage = {
        id: user.userId,
        role: "user",
        content: input,
        createdAt: new Date(),
      };

      setMessages((prev) => [...prev, userMessage]);
      setInput("");
      setSuggestedQuestions([]);
      setStatus("submitting");

      try {
        // Create a new conversation if we don't have one
        if (!conversationId) {
          const newConversationId = await cozeService.createConversation();
          setConversationId(newConversationId);
        }

        // Create a placeholder for the assistant's response
        const assistantPlaceholder: CozeMessage = {
          id: `placeholder-${Date.now()}`,
          role: "assistant",
          content: "",
          createdAt: new Date(),
        };

        // Add placeholder message for streaming
        setMessages((prev) => [...prev, assistantPlaceholder]);

        // Start streaming response
        const stream = await cozeService.sendMessage(
          input,
          conversationId as string
        );
        setStatus("streaming");

        for await (const chunk of stream) {
          if (chunk.event === ChatEventType.CONVERSATION_MESSAGE_DELTA) {
            setMessages((prev) =>
              prev.map((msg) =>
                msg.id === assistantPlaceholder.id
                  ? { ...msg, content: msg.content + chunk.data.content }
                  : msg
              )
            );
          } else if (
            chunk.event === ChatEventType.CONVERSATION_MESSAGE_COMPLETED &&
            chunk.data.type === "follow_up" &&
            chunk.data.content_type === "text"
          ) {
            setSuggestedQuestions((prev) => [...prev, chunk.data.content]);
          } else if (chunk.event === ChatEventType.CONVERSATION_CHAT_FAILED) {
            setMessages((prev) =>
              prev.map((msg) =>
                msg.id === assistantPlaceholder.id
                  ? { ...msg, content: "Server busy, please try again later." }
                  : msg
              )
            );
          }
        }
        setStatus("idle");
      } catch (error) {
        console.error("Failed to send message:", error);
        setStatus("idle");
        // Could add an error message to the chat here
      }
    },
    [input, cozeService, conversationId]
  );

  // Load conversation history if we have a conversation ID
  useEffect(() => {
    if (conversationId && messages.length === 0) {
      cozeService
        .getConversationHistory(conversationId)
        .then((history) => setMessages(history))
        .catch((error) =>
          console.error("Failed to load conversation history:", error)
        );
    }
  }, [conversationId, cozeService, messages.length]);

  return {
    messages,
    input,
    status,
    handleInputChange,
    handleSubmit,
    suggestedQuestions,
    setInput,
  };
}
