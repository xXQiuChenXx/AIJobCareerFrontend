import type React from "react";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  User,
  Bot,
  X,
  Paperclip,
  Send,
  // Mic,
  FileText,
  Download,
  MessageSquare,
  Keyboard,
  Info,
  Code,
} from "lucide-react";
import { useCozeChat } from "../../hooks/useCozeChat";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { cozeAIConfig } from "../../config/cozeAIConfig";
import { formatFileSize } from "@/lib/utils";
import { useAuth } from "@/components/provider/auth-provider";
import LoginRequired from "@/components/utils/login-required";

// Define a type for our file attachment
interface FileAttachment {
  name: string;
  size: number;
  type: string;
}

// Sample suggested questions based on conversation context
const getSuggestedQuestions = (lastMessage: string): string[] => {
  // For testing, we'll return the same suggestions regardless of the AI response
  return [
    "Tell me more about this feature",
    "How can I implement this in my project?",
    "What are the best practices for this?",
    "Can you provide an example?",
  ];
};

export default function ChatPage() {
  const { user } = useAuth();
  if (!user) return <LoginRequired />;
  const { messages, input, handleInputChange, handleSubmit, status } =
    useCozeChat({
      apiKey: cozeAIConfig.apiKey,
      botId: cozeAIConfig.botId,
      streaming: true,
    });

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [aiTyping, setAiTyping] = useState(false);
  const [attachedFile, setAttachedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [suggestedQuestions, setSuggestedQuestions] = useState<string[]>([]);

  // Add this after other useEffect hooks
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Track file attachments for each message
  const [messageAttachments, setMessageAttachments] = useState<
    Record<string, FileAttachment>
  >({});

  // Update when messages change
  useEffect(() => {
    // Generate suggested questions when AI responds
    if (messages.length > 0) {
      const lastMessage = messages[messages.length - 1];
      if (lastMessage.role === "assistant") {
        // Hide suggestions while typing

        // Generate new suggestions based on the last AI message
        const newSuggestions = getSuggestedQuestions(lastMessage.content);
        setSuggestedQuestions(newSuggestions);
      }
    }
  }, [messages, status]);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Set AI typing state based on status
  useEffect(() => {
    if (status === "streaming") {
      setAiTyping(true);
    } else {
      setAiTyping(false);
    }
  }, [status, messages]);

  // Handle file selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setAttachedFile(files[0]);
    }
  };

  // Trigger file input click
  const handleAttachmentClick = () => {
    fileInputRef.current?.click();
  };

  // Remove attached file
  const handleRemoveFile = () => {
    setAttachedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // Custom submit handler to include file information
  const handleFormSubmit = (
    e: React.FormEvent<HTMLFormElement>,
    customInput?: string
  ) => {
    e.preventDefault();

    // Use custom input if provided (for suggested questions), otherwise use the input state
    const messageText = customInput || input;

    if (!messageText.trim() && !attachedFile) return;

    // Get the current message count to identify the new message later
    const currentMessageCount = messages.length;

    // Submit the message
    handleSubmit(e);

    // If there's a file attached, we'll need to track it separately
    if (attachedFile) {
      // We need to wait for the message to be added to the messages state
      setTimeout(() => {
        // Check if a new message was added
        if (messages.length > currentMessageCount) {
          // Get the latest message (which should be the user message we just sent)
          const newMessage = messages[currentMessageCount];
          if (newMessage && newMessage.role === "user") {
            // Add the file attachment to our messageAttachments state
            setMessageAttachments((prev) => ({
              ...prev,
              [newMessage.id]: {
                name: attachedFile.name,
                size: attachedFile.size,
                type: attachedFile.type,
              },
            }));
          }
        }
      }, 50);
    }

    // Clear the file attachment
    setAttachedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // Handle suggested question click
  const handleSuggestionClick = (question: string) => {
    // Set the input value to the question
    handleInputChange({
      target: { value: question },
    } as React.ChangeEvent<HTMLTextAreaElement>);

    // Create a synthetic form event
    const syntheticEvent = {
      preventDefault: () => {},
    } as React.FormEvent<HTMLFormElement>;

    // Submit the form with the suggested question
    handleFormSubmit(syntheticEvent, question);
  };

  return (
    <div className="flex-1 flex flex-col bg-gray-100 min-h-0">
      <div className="flex-1 min-h-0 p-4 sm:p-6 flex">
        <div className="flex flex-col flex-1 bg-white rounded-2xl shadow-md p-4 sm:p-6 border border-gray-200 max-w-5xl mx-auto">
          {/* Chat header */}
          <div className="pb-4 mb-4 border-b border-gray-200 flex items-center justify-between">
            <div className="flex items-center">
              <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center mr-3">
                <Bot className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <h2 className="font-medium text-gray-800 text-lg">
                  AI Career Advisor
                </h2>
                <p className="text-sm text-gray-500">
                  AI Assistant for giving career suggestion and analyse resume
                </p>
              </div>
            </div>
          </div>

          <div className="flex-1 min-h-0 relative">
            <div className="absolute inset-0 overflow-y-auto custom-scrollbar">
              <div className="space-y-4 px-2">
                <AnimatePresence>
                  {messages.map((message) => (
                    <motion.div
                      key={message.id}
                      initial={{
                        opacity: 0,
                        y: 20,
                        rotateX: message.role === "user" ? 45 : 0,
                      }}
                      animate={{ opacity: 1, y: 0, rotateX: 0 }}
                      transition={{
                        duration: 0.3,
                        type: "spring",
                        stiffness: 260,
                        damping: 20,
                      }}
                      className={`flex ${
                        message.role === "user"
                          ? "justify-end"
                          : "justify-start"
                      }`}
                    >
                      <div
                        className={`flex max-w-[80%] ${
                          message.role === "user"
                            ? "flex-row-reverse"
                            : "flex-row"
                        }`}
                      >
                        <div
                          className={`flex-shrink-0 h-10 w-10 rounded-full flex items-center justify-center ${
                            message.role === "user"
                              ? "bg-blue-100 ml-3"
                              : "bg-purple-100 mr-3"
                          }`}
                        >
                          {message.role === "user" ? (
                            <User className="h-5 w-5 text-blue-600" />
                          ) : (
                            <Bot className="h-5 w-5 text-purple-600" />
                          )}
                        </div>
                        <div>
                          <div
                            className={`text-sm font-medium ${
                              message.role === "user"
                                ? "text-right text-blue-600"
                                : "text-left text-purple-600"
                            }`}
                          >
                            {message.role === "user" ? "You" : "AI Assistant"}
                          </div>
                          <div
                            className={`mt-1 rounded-2xl px-4 py-2 break-words break-all prose ${
                              message.role === "user"
                                ? "bg-blue-500 text-white rounded-tr-none"
                                : "bg-white text-gray-800 shadow-sm rounded-tl-none"
                            }`}
                          >
                            <div className="markdown-content">
                              <ReactMarkdown
                                remarkPlugins={[remarkGfm]}
                                components={{
                                  p: ({ node, ...props }) => (
                                    <p className="mb-2 last:mb-0" {...props} />
                                  ),
                                  a: ({ node, ...props }) => (
                                    <a
                                      className={`underline ${
                                        message.role === "user"
                                          ? "text-blue-100"
                                          : "text-blue-600"
                                      }`}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      {...props}
                                    />
                                  ),
                                  ul: ({ node, ...props }) => (
                                    <ul
                                      className="list-disc pl-5 mb-2"
                                      {...props}
                                    />
                                  ),
                                  ol: ({ node, ...props }) => (
                                    <ol
                                      className="list-decimal pl-5 mb-2"
                                      {...props}
                                    />
                                  ),
                                  li: ({ node, ...props }) => (
                                    <li className="mb-1" {...props} />
                                  ),
                                  h1: ({ node, ...props }) => (
                                    <h1
                                      className="text-xl font-bold mb-2 mt-3"
                                      {...props}
                                    />
                                  ),
                                  h2: ({ node, ...props }) => (
                                    <h2
                                      className="text-lg font-bold mb-2 mt-3"
                                      {...props}
                                    />
                                  ),
                                  h3: ({ node, ...props }) => (
                                    <h3
                                      className="text-md font-bold mb-2 mt-3"
                                      {...props}
                                    />
                                  ),
                                  blockquote: ({ node, ...props }) => (
                                    <blockquote
                                      className={`border-l-4 ${
                                        message.role === "user"
                                          ? "border-blue-400 bg-blue-400/30"
                                          : "border-gray-300 bg-gray-100"
                                      } pl-3 py-1 mb-2 italic`}
                                      {...props}
                                    />
                                  ),
                                  hr: ({ node, ...props }) => (
                                    <hr className="my-3 border-t" {...props} />
                                  ),
                                  table: ({ node, ...props }) => (
                                    <div className="overflow-x-auto mb-2">
                                      <table
                                        className="min-w-full border-collapse"
                                        {...props}
                                      />
                                    </div>
                                  ),
                                  th: ({ node, ...props }) => (
                                    <th
                                      className={`px-2 py-1 font-bold border ${
                                        message.role === "user"
                                          ? "border-blue-400"
                                          : "border-gray-300"
                                      }`}
                                      {...props}
                                    />
                                  ),
                                  td: ({ node, ...props }) => (
                                    <td
                                      className={`px-2 py-1 border ${
                                        message.role === "user"
                                          ? "border-blue-400"
                                          : "border-gray-300"
                                      }`}
                                      {...props}
                                    />
                                  ),
                                }}
                              >
                                {message.content}
                              </ReactMarkdown>
                            </div>

                            {/* File attachment display */}
                            {messageAttachments[message.id] && (
                              <div
                                className={`mt-2 pt-2 border-t ${
                                  message.role === "user"
                                    ? "border-blue-400"
                                    : "border-gray-200"
                                }`}
                              >
                                <div
                                  className={`flex items-center rounded-lg p-2 ${
                                    message.role === "user"
                                      ? "bg-blue-400"
                                      : "bg-gray-100"
                                  }`}
                                >
                                  <FileText
                                    className={`h-5 w-5 mr-2 ${
                                      message.role === "user"
                                        ? "text-white"
                                        : "text-gray-500"
                                    }`}
                                  />
                                  <div className="flex-1 min-w-0">
                                    <p
                                      className={`text-sm font-medium truncate ${
                                        message.role === "user"
                                          ? "text-white"
                                          : "text-gray-700"
                                      }`}
                                    >
                                      {messageAttachments[message.id].name}
                                    </p>
                                    <p
                                      className={`text-xs ${
                                        message.role === "user"
                                          ? "text-blue-100"
                                          : "text-gray-500"
                                      }`}
                                    >
                                      {formatFileSize(
                                        messageAttachments[message.id].size
                                      )}
                                    </p>
                                  </div>
                                  <button
                                    type="button"
                                    className={`p-1 rounded-full ${
                                      message.role === "user"
                                        ? "text-white hover:bg-blue-300"
                                        : "text-gray-500 hover:bg-gray-200"
                                    }`}
                                  >
                                    <Download className="h-4 w-4" />
                                  </button>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>

        {/* AI Typing Indicator */}
        <AnimatePresence>
          {aiTyping && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="flex justify-start"
            >
              <div className="flex flex-row">
                <div className="flex-shrink-0 h-10 w-10 rounded-full flex items-center justify-center bg-purple-100 mr-3">
                  <Bot className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <div className="text-sm font-medium text-left text-purple-600">
                    AI Assistant
                  </div>
                  <div className="mt-1 rounded-2xl px-4 py-2 bg-white text-gray-800 shadow-sm rounded-tl-none">
                    <div className="flex space-x-1">
                      <div className="typing-dot"></div>
                      <div className="typing-dot animation-delay-200"></div>
                      <div className="typing-dot animation-delay-400"></div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Suggested Questions */}
        <AnimatePresence>
          {suggestedQuestions.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ delay: 0.3 }}
              className="flex flex-wrap gap-2 justify-center"
            >
              {suggestedQuestions.map((question, index) => (
                <motion.button
                  key={index}
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  onClick={() => handleSuggestionClick(question)}
                  className="bg-white border border-gray-200 rounded-full px-4 py-2 text-sm text-gray-700 shadow-sm hover:bg-gray-50 hover:text-purple-600 transition-colors flex items-center gap-2 group"
                >
                  <MessageSquare className="h-4 w-4 text-purple-400 group-hover:text-purple-600 transition-colors" />
                  {question}
                </motion.button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        <div ref={messagesEndRef} />
      </div>

      <div className="border-t bg-white p-4 sm:p-6">
        <form onSubmit={handleFormSubmit} className="max-w-5xl mx-auto">
          {/* Hidden file input */}
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden"
          />

          {/* Attached file display */}
          <AnimatePresence>
            {attachedFile && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="mb-3 p-3 bg-blue-50 rounded-lg flex items-center justify-between border border-blue-100"
              >
                <div className="flex items-center">
                  <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                    <FileText className="h-5 w-5 text-blue-500" />
                  </div>
                  <div>
                    <span className="text-sm font-medium text-blue-700 block truncate max-w-[250px]">
                      {attachedFile.name}
                    </span>
                    <span className="text-xs text-blue-500">
                      ({formatFileSize(attachedFile.size)})
                    </span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={handleRemoveFile}
                  className="ml-2 p-1.5 rounded-full bg-white text-gray-500 hover:text-red-500 hover:bg-red-50 transition-colors border border-gray-200"
                >
                  <X className="h-4 w-4" />
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Input area with enhanced design */}
          <div className="relative rounded-xl border bg-white transition-all focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-opacity-50 focus-within:border-blue-300">
            {/* Textarea for input */}
            <div className="relative">
              <textarea
                ref={textareaRef}
                value={input}
                onChange={handleInputChange}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    if (input.trim() || attachedFile) {
                      const syntheticEvent = {
                        preventDefault: () => {},
                      } as React.FormEvent<HTMLFormElement>;
                      handleFormSubmit(syntheticEvent);
                    }
                  }
                }}
                placeholder="Type your message..."
                className="w-full bg-transparent px-5 py-4 focus:outline-none resize-none custom-scrollbar min-h-[50px] max-h-[150px] overflow-y-auto pr-24"
                style={{ scrollbarWidth: "thin" }}
              />
            </div>

            {/* Bottom toolbar */}
            <div className="flex items-center justify-between px-3 py-2 border-t border-gray-100">
              {/* Left side - formatting options */}
              <div className="flex items-center space-x-2">
                <button
                  type="button"
                  onClick={handleAttachmentClick}
                  className="p-1.5 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
                  title="Attach file"
                >
                  <Paperclip className="h-5 w-5" />
                </button>

                {/* Keyboard shortcuts info */}
                <div className="hidden sm:flex items-center ml-2 text-xs text-gray-400 border-l border-gray-200 pl-2">
                  <Keyboard className="h-3 w-3 mr-1" />
                  <span>Shift + Enter for new line</span>
                </div>
              </div>

              {/* Right side - character count and send */}
              <div className="flex items-center">
                {/* Character count */}
                {input.length > 0 && (
                  <div
                    className={`text-xs mr-2 ${
                      input.length > 500 ? "text-amber-500" : "text-gray-400"
                    }`}
                  >
                    {input.length} / 1000
                  </div>
                )}

                {/* Send button */}
                <button
                  type="submit"
                  disabled={
                    (!input.trim() && !attachedFile) || status === "streaming"
                  }
                  className="rounded-full p-2 bg-blue-500 text-white disabled:bg-blue-300 transition-colors hover:bg-blue-600 disabled:hover:bg-blue-300 hover-scale"
                >
                  <Send className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Status indicators */}
          <div className="mt-2 flex justify-between items-center">
            <div className="flex items-center text-xs text-gray-500">
              {status === "streaming" ? (
                <div className="flex items-center">
                  <div className="mr-2 h-2 w-2 rounded-full bg-green-500 animate-pulse"></div>
                  <span>AI is responding...</span>
                </div>
              ) : (
                <div className="flex items-center">
                  <Info className="h-3 w-3 mr-1 text-gray-400" />
                  <span>
                    {attachedFile
                      ? "File will be sent with your message"
                      : "Messages are processed by AI"}
                  </span>
                </div>
              )}
            </div>

            {/* Clear button - only show when there's input */}
            {(input.trim() || attachedFile) && (
              <button
                type="button"
                onClick={() => {
                  handleInputChange({
                    target: { value: "" },
                  } as React.ChangeEvent<HTMLTextAreaElement>);
                  handleRemoveFile();
                }}
                className="text-xs text-gray-500 hover:text-gray-700 transition-colors"
              >
                Clear
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
