import { user } from "@/models/user";

export type CozeMessage = {
  id: string;
  role: "user" | "assistant" | "system";
  content: string;
  createdAt?: Date;
};

export type CozeConversation = {
  id: string;
  messages: CozeMessage[];
  title?: string;
};

export interface CozeAIConfig {
  apiKey: string;
  botId: string;
  baseUrl?: string;
}

export class CozeAIService {
  private apiKey: string;
  private botId: string;
  private baseUrl: string;

  constructor(config: CozeAIConfig) {
    this.apiKey = config.apiKey;
    this.botId = config.botId;
    this.baseUrl = config.baseUrl || "https://api.coze.com/v1";
  }

  private async fetchWithAuth(endpoint: string, options: RequestInit = {}) {
    const url = `${this.baseUrl}${endpoint}`;
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${this.apiKey}`,
      ...options.headers,
    };

    return fetch(url, {
      ...options,
      headers,
    });
  }

  async uploadFile(file: File): Promise<string> {
    const endpoint = `/files/upload`;

    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${this.apiKey}`,
        "Content-Type": "multipart/form-data",
      },
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`Coze AI API error: ${response.statusText}`);
    }

    const data = await response.json();
    return data.data;
  }

  async sendMessage(
    message: string,
    conversationId?: string,
    fileId?: string
  ): Promise<ReadableStream<CozeMessage>> {
    const endpoint = `https://api.coze.com/v3/chat`;

    const payload = {
      bot_id: this.botId,
      user_id: "hongstudio",
      stream: true,
      additional_messages: [
        {
          role: "user",
          type: "question",
          content_type: fileId ? "object_string" : "text",
        },
      ],
      auto_save_history: true,
      conversation_id: conversationId,
    };

    const response = await this.fetchWithAuth(endpoint, {
      method: "POST",
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`Coze AI API error: ${response.statusText}`);
    }

    const data = await response.json();
    if (!response.body) {
      throw new Error("Response body is null");
    }

    // Create a transform stream to convert byte chunks to CozeMessage objects
    const transformer = new TransformStream<Uint8Array, CozeMessage>({
      transform: async (chunk, controller) => {
        const text = new TextDecoder().decode(chunk);
        try {
          const data = JSON.parse(text);
          const message: CozeMessage = {
            id: data.id || `msg-${Date.now()}`,
            role: "assistant",
            content: data.response || data.content,
            createdAt: new Date(),
          };
          controller.enqueue(message);
        } catch (e) {
          console.error("Error parsing stream chunk:", e);
        }
      },
    });

    return response.body.pipeThrough(transformer);
  }

  async createConversation(title?: string): Promise<string> {
    const endpoint = `/conversations`;

    const payload = {
      bot_id: this.botId,
      title: title || `Conversation ${new Date().toLocaleString()}`,
    };

    const response = await this.fetchWithAuth(endpoint, {
      method: "POST",
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`Coze AI API error: ${response.statusText}`);
    }

    const data = await response.json();
    return data.conversation_id;
  }

  async getConversationHistory(conversationId: string): Promise<CozeMessage[]> {
    const endpoint = `/conversations/${conversationId}/messages`;

    const response = await this.fetchWithAuth(endpoint);

    if (!response.ok) {
      throw new Error(`Coze AI API error: ${response.statusText}`);
    }

    const data = await response.json();
    return data.messages.map((msg: any) => ({
      id: msg.id,
      role: msg.role,
      content: msg.content,
      createdAt: new Date(msg.created_at),
    }));
  }
}
