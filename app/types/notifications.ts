export interface Company {
  // Add company details as needed
  id: number;
  name: string;
  // Other company properties
}

export interface Notification {
  notification_id: number;
  notification_user_id: string;
  notification_company_id?: number;
  notification_text: string;
  notification_timestamp: string;
  notification_status: "read" | "unread";
  company?: Company;
}

export interface PaginationInfo {
  total: number;
  limit: number;
  offset: number;
  hasMore: boolean;
}

export interface NotificationsResponse {
  notifications: Notification[];
  pagination: PaginationInfo;
}

export interface UnreadCountResponse {
  unreadCount: number;
}

export interface NotificationResponse {
  notification_id: number;
  notification_user_id: string;
  notification_company_id?: number;
  notification_text: string;
  notification_timestamp: string;
  notification_status: "read" | "unread";
  company?: Company;
}

export interface MarkAsReadResponse {
  message: string;
  notification: Notification;
}

export interface MarkAllAsReadResponse {
  message: string;
}

export interface DeleteNotificationResponse {
  message: string;
}

// Type to map API notifications to frontend format
export interface NotificationUi {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
  type: "info" | "success" | "warning" | "error";
}
