// src/services/difyService.ts
export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
  files?: string[];
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
  private baseUrl: string;

  constructor(baseUrl: string = "/api/chat") {
    this.baseUrl = baseUrl;
  }

  async uploadFile(file: File, user_id: string): Promise<string> {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("user_id", user_id);

    const response = await fetch(`${this.baseUrl}/upload`, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`File upload failed: ${response.statusText}`);
    }

    const data = await response.json();
    return data.fileId;
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

      const response = await fetch(`${this.baseUrl}/message`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok || !response.body) {
        throw new Error(`Chat request failed: ${response.statusText}`);
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let conversationId = request.conversation_id;
      let messageId = "";

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;

        if (value) {
          const chunk = decoder.decode(value, { stream: true });

          // Process SSE data
          const lines = chunk.trim().split("\n\n");
          for (const line of lines) {
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
                }
              } catch (e) {
                // Ignore parsing errors for partial chunks
              }
            }
          }
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
      const response = await fetch(
        `${this.baseUrl}/suggestions/${messageId}?user_id=${userId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch suggestions: ${response.statusText}`);
      }

      const data: SuggestedQuestionsResponse = await response.json();
      return data.data || [];
    } catch (error) {
      console.error("Error fetching suggestions:", error);
      return [];
    }
  }

  async getConversationHistory(
    conversationId: string,
    userId: string,
    firstId: string = "",
    limit: number = 20
  ): Promise<any> {
    const response = await fetch(
      `${
        this.baseUrl
      }/conversation_history?conversationId=${conversationId}&user=${userId}${
        firstId ? `&firstId=${firstId}` : ""
      }&limit=${limit}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch conversation: ${response.statusText}`);
    }

    return await response.json();
  }
}
