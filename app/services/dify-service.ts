import Cookies from "js-cookie";
import { apiClient, type ApiClient } from "./api-client";
import { toast } from "sonner";

// src/services/difyService.ts
export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
  files?: string[];
  attachments?: {
    name: string;
    size: number;
    type: string;
    id: string;
  }[];
}

export interface ChatRequest {
  query: string;
  fileId?: string;
  conversation_id?: string;
  user: string;
  response_mode: string;
  inputs?: Record<string, string>;
}

export interface SuggestedQuestionsResponse {
  result: string;
  data: string[];
}

export class DifyService {
  private _apiClient: ApiClient;

  constructor() {
    this._apiClient = apiClient;
  }

  async uploadFile(file: File, user_id: string): Promise<string> {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("user_id", user_id);

    try {
      const data = await this._apiClient.post<{ fileId: string }>(
        "/api/chat/upload",
        {
          formData,
        }
      );
      return data.fileId;
    } catch (error) {
      console.error("Error uploading file:", error);
      toast("File upload failed", {
        description:
          error instanceof Error
            ? error.message
            : "An unexpected error occurred",
      });
      throw error;
    }
  }

  async streamChatMessage(
    request: ChatRequest,
    onChunk: (content: string) => void,
    onComplete: (conversationId: string) => void,
    onError: (error: Error) => void,
    onSuggestedQuestions?: (questions: string[]) => void
  ): Promise<void> {
    try {
      // Convert fileId to files array if present
      const requestBody: any = {
        ...request,
        user: request.user || "default_user",
      };

      // Handle file attachments
      if (request.fileId) {
        requestBody.files = [
          {
            type: "document",
            transfer_method: "local_file",
            upload_file_id: request.fileId,
          },
        ];
        delete requestBody.fileId;
      }
      const token = Cookies.get("token");

      // For streaming responses, we still need to use fetch directly
      // as axios/apiClient doesn't handle streaming well
      const response = await fetch(
        import.meta.env.VITE_BACKEND_API_URL + `/chat/message`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(requestBody),
        }
      );

      if (!response.ok || !response.body) {
        const errorMsg = `Chat request failed: ${response.statusText}`;
        toast("Chat Error", {
          description: errorMsg,
        });
        throw new Error(errorMsg);
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let conversationId = request.conversation_id;
      let messageId = "";
      let last_line = "";
      let haveChunk = false;

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;

        if (value) {
          const chunk = last_line + decoder.decode(value, { stream: true });

          // Process SSE data
          const lines = chunk.trim().split("\n\n");
          last_line = lines[lines.length - 1].trim();
          for (const line of lines.slice(0, -1)) {
            if (line.startsWith("data: ")) {
              const eventData = line.substring(6); // Remove 'data: ' prefix

              try {
                const parsedData = JSON.parse(eventData);

                if (parsedData.conversation_id && !conversationId) {
                  conversationId = parsedData.conversation_id;
                }

                if (parsedData.id && !messageId) {
                  messageId = parsedData.id;
                }

                if (parsedData.answer || parsedData.text) {
                  const text = parsedData.answer || parsedData.text;
                  onChunk(text);
                  haveChunk = true;
                }
              } catch (e) {
                // Ignore parsing errors for partial chunks
              }
            }
          }
          if (!haveChunk) onChunk("(Thinking...) ");
          haveChunk = false;
        }
      }

      // After streaming completes, check for suggested questions
      if (messageId && onSuggestedQuestions) {
        try {
          const suggestions = await this.getSuggestedQuestions(
            messageId,
            request.user
          );
          if (suggestions.length > 0) {
            onSuggestedQuestions(suggestions);
          }
        } catch (error) {
          console.error("Failed to fetch suggestions:", error);
        }
      }

      onComplete(conversationId as string);
    } catch (error) {
      onError(error instanceof Error ? error : new Error(String(error)));
    }
  }

  async getSuggestedQuestions(
    messageId: string,
    userId: string
  ): Promise<string[]> {
    try {
      const data = await this._apiClient.get<SuggestedQuestionsResponse>(
        `/chat/suggestions/${messageId}?user_id=${userId}`
      );
      return data.data || [];
    } catch (error) {
      console.error("Error fetching suggestions:", error);
      toast("Failed to load suggestions", {
        description:
          error instanceof Error
            ? error.message
            : "An unexpected error occurred",
      });
      return [];
    }
  }

  async getConversationHistory(
    conversationId: string,
    userId: string,
    firstId: string = "",
    limit: number = 20
  ): Promise<any> {
    try {
      const queryParams = new URLSearchParams({
        conversationId,
        user: userId,
        limit: limit.toString(),
      });

      if (firstId) {
        queryParams.append("firstId", firstId);
      }

      return await this._apiClient.get(
        `/dify/conversation_history?${queryParams.toString()}`
      );
    } catch (error) {
      console.error("Error fetching conversation history:", error);
      toast("Failed to load conversation history", {
        description:
          error instanceof Error
            ? error.message
            : "An unexpected error occurred",
      });
      throw error;
    }
  }
}
