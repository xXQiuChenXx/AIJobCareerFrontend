import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { 
  getNotifications, 
  markAsRead as apiMarkAsRead, 
  markAllAsRead as apiMarkAllAsRead,
  getUnreadCount,
  mapNotificationToUi
} from "../../services/notifications"
import type { NotificationUi } from "../../types/notifications"

type NotificationContextType = {
  notifications: NotificationUi[]
  hasUnread: boolean
  markAsRead: (id: string) => void
  markAllAsRead: () => void
  addNotification: (notification: Omit<NotificationUi, "id" | "read">) => void
  loading: boolean
  error: string | null
  refreshNotifications: () => Promise<void>
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined)

export function NotificationProvider({ children }: { children: ReactNode }) {
  const [notifications, setNotifications] = useState<NotificationUi[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [hasUnread, setHasUnread] = useState(false)

  // Function to fetch notifications
  const fetchNotifications = async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await getNotifications()
      console.log(response);
      const uiNotifications = response.notifications.map(mapNotificationToUi)
      setNotifications(uiNotifications)
      
      // Check for unread notifications
      const unreadCountResponse = await getUnreadCount()
      setHasUnread(unreadCountResponse.unreadCount > 0)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch notifications')
      // Fallback to mock data if API fails
      setNotifications(getMockNotifications())
      setHasUnread(true)
    } finally {
      setLoading(false)
    }
  }

  // Initial fetch
  useEffect(() => {
    fetchNotifications()
  }, [])

  const markAsRead = async (id: string) => {
    try {
      await apiMarkAsRead(Number(id))
      setNotifications((prev) =>
        prev.map((notification) => (notification.id === id ? { ...notification, read: true } : notification)),
      )
      
      // Update unread status
      const hasAnyUnread = notifications.some(n => n.id !== id && !n.read)
      setHasUnread(hasAnyUnread)
    } catch (err) {
      // Optimistically update UI even if API fails
      setNotifications((prev) =>
        prev.map((notification) => (notification.id === id ? { ...notification, read: true } : notification)),
      )
      console.error("Failed to mark notification as read:", err)
    }
  }

  const markAllAsRead = async () => {
    try {
      await apiMarkAllAsRead()
      setNotifications((prev) => prev.map((notification) => ({ ...notification, read: true })))
      setHasUnread(false)
    } catch (err) {
      // Optimistically update UI even if API fails
      setNotifications((prev) => prev.map((notification) => ({ ...notification, read: true })))
      setHasUnread(false)
      console.error("Failed to mark all notifications as read:", err)
    }
  }

  const addNotification = (notification: Omit<NotificationUi, "id" | "read">) => {
    const newNotification: NotificationUi = {
      ...notification,
      id: Date.now().toString(),
      read: false,
    }

    setNotifications((prev) => [newNotification, ...prev])
    setHasUnread(true)
  }

  const refreshNotifications = () => fetchNotifications()

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        hasUnread,
        markAsRead,
        markAllAsRead,
        addNotification,
        loading,
        error,
        refreshNotifications
      }}
    >
      {children}
    </NotificationContext.Provider>
  )
}

export function useNotifications() {
  const context = useContext(NotificationContext)
  if (context === undefined) {
    throw new Error("useNotifications must be used within a NotificationProvider")
  }
  return context
}

// Fallback mock notifications in case API fails
function getMockNotifications(): NotificationUi[] {
  return [
    {
      id: "1",
      title: "New Feature Available",
      message: "We've just launched a new feature that helps you track your progress. Check it out in your dashboard!",
      time: "5 min ago",
      read: false,
      type: "info",
    },
    {
      id: "2",
      title: "Payment Successful",
      message:
        "Your payment of $49.99 for the premium plan was successful. Your subscription is now active until April 21, 2024.",
      time: "1 hour ago",
      read: false,
      type: "success",
    },
    {
      id: "3",
      title: "Account Security Alert",
      message:
        "We noticed a login from a new device in San Francisco, CA. If this wasn't you, please secure your account immediately.",
      time: "2 hours ago",
      read: true,
      type: "warning",
    },
    {
      id: "4",
      title: "System Maintenance",
      message:
        "Scheduled maintenance will occur on Sunday at 2 AM UTC. The service may be unavailable for approximately 30 minutes.",
      time: "1 day ago",
      read: true,
      type: "info",
    },
  ]
}

// For backward compatibility
export type NotificationType = NotificationUi;

