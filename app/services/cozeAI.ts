import { CozeAPI, RoleType, type StreamChatData } from "@coze/api";

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
  user: {
    userId: string;
    email: string;
    username: string;
  };
}

export class CozeAIService {
  private apiKey: string;
  private botId: string;
  private baseUrl: string;
  private user: {
    userId: string;
    email: string;
    username: string;
  };
  private apiClient: CozeAPI;

  constructor(config: CozeAIConfig) {
    this.apiKey = config.apiKey;
    this.botId = config.botId;
    this.baseUrl = config.baseUrl || "https://api.coze.com/v1";
    this.user = config.user;
    this.apiClient = new CozeAPI({
      token: config.apiKey,
      baseURL: "https://api.coze.com",
      allowPersonalAccessTokenInBrowser: true
    });
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
    conversationId: string,
    fileId?: string
  ): Promise<AsyncIterable<StreamChatData>> {
    // const endpoint = `https://api.coze.com/v3/chat?conversation_id=${conversationId}`;

    return await this.apiClient.chat.stream({
      bot_id: this.botId,
      conversation_id: conversationId,
      user_id: this.user.userId,
      additional_messages: [
        {
          content: fileId
            ? JSON.stringify([
                { type: "text", text: message },
                { type: "file", file_id: fileId },
              ])
            : message,
          content_type: fileId ? "object_string" : "text",
          role: RoleType.User,
          type: "question",
        },
      ],
      auto_save_history: true,
    });

    // const payload = {
    //   bot_id: this.botId,
    //   user_id: this.user.userId,
    //   stream: true,
    //   additional_messages: [
    //     {
    //       role: "user",
    //       type: "question",
    //       content_type: fileId ? "object_string" : "text",
    //       content: fileId
    //         ? JSON.stringify([
    //             { type: "text", text: message },
    //             { type: "file", file_id: fileId },
    //           ])
    //         : message,
    //     },
    //   ],
    //   auto_save_history: true,
    // };

    // const response = await fetch(endpoint, {
    //   method: "POST",
    //   body: JSON.stringify(payload),
    //   headers: {
    //     "Content-Type": "application/json",
    //     Authorization: `Bearer ${this.apiKey}`,
    //   },
    // });

    // if (!response.ok) {
    //   throw new Error(`Coze AI API error: ${response.statusText}`);
    // }

    // if (!response.body) {
    //   throw new Error("Response body is null");
    // }

    // // Create a transform stream to convert byte chunks to CozeMessage objects
    // const transformer = new TransformStream<Uint8Array, CozeMessage>({
    //   transform: async (chunk, controller) => {
    //     const text = new TextDecoder().decode(chunk);
    //     try {
    //       const data = JSON.parse(text);
    //       const message: CozeMessage = {
    //         id: data.id || `msg-${Date.now()}`,
    //         role: "assistant",
    //         content: data.response || data.content,
    //         createdAt: new Date(),
    //       };
    //       controller.enqueue(message);
    //     } catch (e) {
    //       console.error("Error parsing stream chunk:", e);
    //     }
    //   },
    // });

    // return response.body.pipeThrough(transformer);
  }

  async createConversation(): Promise<string> {
    const endpoint = `/conversation/create`;

    const response = await this.fetchWithAuth(endpoint, {
      method: "POST",
      body: JSON.stringify({
        bot_id: this.botId,
      }),
    });

    if (!response.ok) {
      throw new Error(`Coze AI API error: ${response.statusText}`);
    }

    const responseData = await response.json();
    return responseData?.data?.id;
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
