import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowLeft, Info, AlertCircle, CheckCircle } from "lucide-react";
import { useNotifications } from "@/components/provider/notification-provider";
import type { Route } from "../notifications/+types/notification";
import { NavLink } from "react-router";
import { getNotificationById } from "@/services/notifications";
import type { NotificationUi } from "@/types/notifications";

export default function NotificationDetailContent({
  params,
}: Route.ComponentProps) {
  const { notifications, markAsRead } = useNotifications();
  const notificationId = params.id as string;
  const [notification, setNotification] = useState<NotificationUi | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchNotificationDetail() {
      setLoading(true);
      setError(null);

      try {
        // First try to find in the existing notifications
        const cachedNotification = notifications.find(
          (n) => n.id === notificationId
        );
        if (cachedNotification) {
          setNotification(cachedNotification);
        } else {
          // If not found, fetch from the API
          const apiResponse = await getNotificationById(Number(notificationId));
          // Use the helper from notifications service to map API data to UI format
          import("@/services/notifications").then(({ mapNotificationToUi }) => {
            setNotification(mapNotificationToUi(apiResponse));
          });
        }
      } catch (err) {
        setError("Failed to load notification details");
        console.error("Error fetching notification:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchNotificationDetail();
  }, [notificationId, notifications]);

  useEffect(() => {
    if (notification && !notification.read) {
      markAsRead(notificationId);
    }
  }, [notification, notificationId, markAsRead]);

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "info":
        return <Info className="h-6 w-6 text-blue-500" />;
      case "success":
        return <CheckCircle className="h-6 w-6 text-green-500" />;
      case "warning":
        return <AlertCircle className="h-6 w-6 text-amber-500" />;
      case "error":
        return <AlertCircle className="h-6 w-6 text-red-500" />;
      default:
        return <Info className="h-6 w-6 text-blue-500" />;
    }
  };

  return (
    <main className="container mx-auto px-4 py-8">
      <NavLink to="/notifications" className="flex items-center gap-2 mb-6">
        <Button variant="ghost" className="mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
      </NavLink>

      {loading ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">Loading notification...</p>
        </div>
      ) : error ? (
        <div className="text-center py-12">
          <h2 className="text-xl font-semibold mb-2">Error</h2>
          <p className="text-muted-foreground">{error}</p>
        </div>
      ) : notification ? (
        <Card className="max-w-2xl mx-auto">
          <CardHeader className="flex flex-row items-center gap-4">
            <div className="p-2 rounded-full bg-muted">
              {notification.type && getNotificationIcon(notification.type)}
            </div>
            <div>
              <CardTitle className="text-xl">{notification.title}</CardTitle>
              <p className="text-sm text-muted-foreground">
                {notification.time}
              </p>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p className="text-base">{notification.message}</p>
              <div className="p-4 bg-muted rounded-md">
                <h3 className="font-medium mb-2">Additional Information</h3>
                <p className="text-sm text-muted-foreground">
                  {notification.type === "info" &&
                    "This notification contains important information about your account or our services."}
                  {notification.type === "success" &&
                    "This notification confirms a successful operation or transaction."}
                  {notification.type === "warning" &&
                    "This notification warns you about a potential issue that may require your attention."}
                  {notification.type === "error" &&
                    "This notification alerts you to an error or problem that requires your immediate attention."}
                </p>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-end">
            <NavLink to="/notifications">
              <Button>Go Back</Button>
            </NavLink>
          </CardFooter>
        </Card>
      ) : (
        <div className="text-center py-12">
          <h2 className="text-xl font-semibold mb-2">Notification not found</h2>
          <p className="text-muted-foreground">
            The notification you're looking for doesn't exist or has been
            removed.
          </p>
        </div>
      )}
    </main>
  );
}
