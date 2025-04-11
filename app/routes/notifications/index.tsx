import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  useNotifications,
} from "@/components/provider/notification-provider";
import { CheckCheck, Info, AlertCircle, CheckCircle, Bell, Loader2 } from "lucide-react";
import { NavLink } from "react-router";
import type { NotificationUi } from "@/types/notifications";
import type { Route } from "./+types/notification";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "AI Job Career | Notifications" },
    { name: "description", content: "Welcome to AI Job Career!" },
  ];
}


export default function NotificationsPage() {
  const { notifications, markAllAsRead, loading, error, refreshNotifications } = useNotifications();

  const unreadNotifications = notifications.filter((n) => !n.read);
  const readNotifications = notifications.filter((n) => n.read);

  const getNotificationIcon = (type: NotificationUi["type"]) => {
    switch (type) {
      case "info":
        return <Info className="h-5 w-5 text-blue-500" />;
      case "success":
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case "warning":
        return <AlertCircle className="h-5 w-5 text-amber-500" />;
      case "error":
        return <AlertCircle className="h-5 w-5 text-red-500" />;
    }
  };

  const renderNotificationList = (notificationList: NotificationUi[]) => {
    if (loading) {
      return (
        <div className="text-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-primary mx-auto mb-4" />
          <p className="text-muted-foreground">Loading notifications...</p>
        </div>
      );
    }

    if (error) {
      return (
        <div className="text-center py-12">
          <AlertCircle className="h-12 w-12 text-destructive mx-auto mb-4" />
          <h3 className="text-lg font-medium mb-2">Error loading notifications</h3>
          <p className="text-muted-foreground mb-4">{error}</p>
          <Button onClick={() => refreshNotifications()}>Try Again</Button>
        </div>
      );
    }

    if (notificationList.length === 0) {
      return (
        <div className="text-center py-12">
          <Bell className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium mb-2">No notifications</h3>
          <p className="text-muted-foreground">
            You don't have any notifications in this category.
          </p>
        </div>
      );
    }

    return (
      <div className="divide-y">
        {notificationList.map((notification) => (
          <NavLink
            to={`/notifications/${notification.id}`}
            className="w-full"
            key={`notification-${notification.id}`}
          >
            <div
              className="py-4 cursor-pointer transition-colors hover:bg-muted/50 flex items-start gap-4 px-6"
            >
              <div className="mt-1 p-2 rounded-full bg-muted/50">
                {getNotificationIcon(notification.type)}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="text-base font-medium">
                    {notification.title}
                  </h4>
                  <span className="text-sm text-muted-foreground">
                    {notification.time}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  {notification.message}
                </p>
              </div>
              {!notification.read && (
                <div className="h-2.5 w-2.5 rounded-full bg-blue-500 mt-2" />
              )}
            </div>
          </NavLink>
        ))}
      </div>
    );
  };

  return (
    <main className="container mx-auto px-4 py-8 min-h-[calc(100vh-350px)]">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Notifications</h1>
        {unreadNotifications.length > 0 && (
          <Button variant="outline" size="sm" onClick={markAllAsRead}>
            <CheckCheck className="mr-2 h-4 w-4" />
            Mark all as read
          </Button>
        )}
      </div>

      <Card className="xl:max-w-11/12 mx-auto">
        <CardHeader className="pb-3">
          <CardTitle>All Notifications</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="w-full grid grid-cols-3 mb-4 mx-4 max-w-md">
              <TabsTrigger value="all" >All</TabsTrigger>
              <TabsTrigger value="unread">
                Unread
                {unreadNotifications.length > 0 && (
                  <span className="ml-2 bg-primary text-primary-foreground text-xs rounded-full px-2 py-0.5">
                    {unreadNotifications.length}
                  </span>
                )}
              </TabsTrigger>
              <TabsTrigger value="read">Read</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="mt-0">
              {renderNotificationList(notifications)}
            </TabsContent>

            <TabsContent value="unread" className="mt-0">
              {renderNotificationList(unreadNotifications)}
            </TabsContent>

            <TabsContent value="read" className="mt-0">
              {renderNotificationList(readNotifications)}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </main>
  );
}
