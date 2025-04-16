import Cookies from "js-cookie";
import type {
  NotificationsResponse,
  NotificationResponse,
  UnreadCountResponse,
  MarkAsReadResponse,
  MarkAllAsReadResponse,
  DeleteNotificationResponse,
} from "../types/notifications";

const API_BASE_URL = "/api/Notifications";

// Helper function to get the auth token
const getAuthToken = (): string => {
  // This should be replaced with your actual auth token retrieval logic
  const token = Cookies.get("token");
  if (!token) {
    throw new Error("Authentication token not found");
  }
  return token;
};

// Helper function for API requests with authorization
async function fetchWithAuth<T>(
  url: string,
  options: RequestInit = {}
): Promise<T> {
  const token = getAuthToken();

  const headers = {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
    ...options.headers,
  };

  try {
    const response = await fetch(url, { ...options, headers });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "API request failed");
    }

    return (await response.json()) as T;
  } catch (error) {
    console.error("API request error:", error);
    throw error;
  }
}

// Get list of notifications with optional filters
export async function getNotifications(
  status?: "read" | "unread",
  limit = 10,
  offset = 0
): Promise<NotificationsResponse> {
  const params = new URLSearchParams();
  if (status) params.append("status", status);
  params.append("limit", limit.toString());
  params.append("offset", offset.toString());

  return fetchWithAuth<NotificationsResponse>(
    `${API_BASE_URL}?${params.toString()}`
  );
}

// Get a specific notification by ID
export async function getNotificationById(
  id: number
): Promise<NotificationResponse> {
  return fetchWithAuth<NotificationResponse>(`${API_BASE_URL}/${id}`);
}

// Get count of unread notifications
export async function getUnreadCount(): Promise<UnreadCountResponse> {
  return fetchWithAuth<UnreadCountResponse>(`${API_BASE_URL}/Unread/Count`);
}

// Mark a notification as read
export async function markAsRead(id: number): Promise<MarkAsReadResponse> {
  return fetchWithAuth<MarkAsReadResponse>(`${API_BASE_URL}/${id}/MarkAsRead`, {
    method: "PUT",
  });
}

// Mark all notifications as read
export async function markAllAsRead(): Promise<MarkAllAsReadResponse> {
  return fetchWithAuth<MarkAllAsReadResponse>(`${API_BASE_URL}/MarkAllAsRead`, {
    method: "PUT",
  });
}

// Delete a notification
export async function deleteNotification(
  id: number
): Promise<DeleteNotificationResponse> {
  return fetchWithAuth<DeleteNotificationResponse>(`${API_BASE_URL}/${id}`, {
    method: "DELETE",
  });
}

// Helper function to convert API notification to UI format
export function mapNotificationToUi(
  notification: NotificationResponse
): NotificationUi {
  const {
    notification_id,
    notification_text,
    notification_timestamp,
    notification_status,
  } = notification;

  // Determine notification type based on content
  // This is an example - you may want to adjust this logic based on your needs
  let type: "info" | "success" | "warning" | "error" = "info";
  if (notification_text.includes("viewed your profile")) {
    type = "info";
  } else if (
    notification_text.includes("approved") ||
    notification_text.includes("accepted")
  ) {
    type = "success";
  } else if (
    notification_text.includes("rejected") ||
    notification_text.includes("declined")
  ) {
    type = "error";
  } else if (
    notification_text.includes("reminder") ||
    notification_text.includes("expiring")
  ) {
    type = "warning";
  }

  // Format the timestamp to a more readable format
  const date = new Date(notification_timestamp);
  const timeAgo = formatTimeAgo(date);

  return {
    id: notification_id.toString(),
    title: extractTitle(notification_text),
    message: notification_text,
    time: timeAgo,
    read: notification_status === "read",
    type,
  };
}

// Helper function to extract a title from notification text
function extractTitle(text: string): string {
  // Simple example - take first few words or first sentence
  const firstSentence = text.split(".")[0];
  if (firstSentence.length < 40) return firstSentence;
  return `${firstSentence.substring(0, 40)}...`;
}

// Helper function to format time ago
function formatTimeAgo(date: Date): string {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffSec = Math.round(diffMs / 1000);
  const diffMin = Math.round(diffSec / 60);
  const diffHour = Math.round(diffMin / 60);
  const diffDay = Math.round(diffHour / 24);

  if (diffSec < 60) return `${diffSec} sec ago`;
  if (diffMin < 60) return `${diffMin} min ago`;
  if (diffHour < 24) return `${diffHour} hours ago`;
  if (diffDay < 30) return `${diffDay} days ago`;

  return date.toLocaleDateString();
}

import type { NotificationUi } from "../types/notifications";import { toast } from "sonner";

