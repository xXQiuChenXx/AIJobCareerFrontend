import { useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  CheckCheck,
  Info,
  AlertCircle,
  CheckCircle,
  Loader2,
} from "lucide-react";
import { useNotifications } from "@/components/provider/notification-provider";
import { NavLink } from "react-router";
import type { NotificationUi } from "@/types/notifications";

interface NotificationDropdownProps {
  notifications: NotificationUi[];
  onClose: () => void;
}
export default function NotificationDropdown({
  onClose,
}: NotificationDropdownProps) {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const {
    notifications,
    markAsRead,
    markAllAsRead,
    loading,
    error,
    refreshNotifications,
  } = useNotifications();

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  const handleNotificationClick = (id: string) => {
    markAsRead(id);
    onClose();
  };

  const getNotificationIcon = (type: NotificationUi["type"]) => {
    switch (type) {
      case "info":
        return <Info className="h-4 w-4 text-blue-500" />;
      case "success":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "warning":
        return <AlertCircle className="h-4 w-4 text-amber-500" />;
      case "error":
        return <AlertCircle className="h-4 w-4 text-red-500" />;
    }
  };

  const renderContent = () => {
    if (loading) {
      return (
        <div className="py-8 text-center">
          <Loader2 className="h-6 w-6 animate-spin mx-auto mb-2" />
          <p className="text-sm text-muted-foreground">
            Loading notifications...
          </p>
        </div>
      );
    }

    if (error) {
      return (
        <div className="py-6 text-center px-4">
          <AlertCircle className="h-6 w-6 text-destructive mx-auto mb-2" />
          <p className="text-sm mb-3">Failed to load notifications</p>
          <Button size="sm" onClick={refreshNotifications}>
            Retry
          </Button>
        </div>
      );
    }

    if (notifications.length === 0) {
      return (
        <div className="p-4 text-center text-muted-foreground">
          No notifications
        </div>
      );
    }

    return (
      <>
        <div className="divide-y">
          {notifications.map((notification) => (
            <div
              key={notification.id}
              className={`p-4 px-6 cursor-pointer transition-colors hover:bg-muted/50 ${
                !notification.read ? "bg-muted/20" : ""
              }`}
              onClick={() => handleNotificationClick(notification.id)}
            >
              <div className="flex items-start gap-3">
                <div className="mt-0.5">
                  {getNotificationIcon(notification.type)}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-medium">
                      {notification.title}
                    </h4>
                    <span className="text-xs text-muted-foreground">
                      {notification.time}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    {notification.message}
                  </p>
                </div>
                {!notification.read && (
                  <div className="h-2 w-2 rounded-full bg-blue-500 mt-1.5" />
                )}
              </div>
            </div>
          ))}
        </div>
        <div className="p-3 border-t">
          <NavLink to="/notifications">
            <Button variant="outline" className="w-full text-sm cursor-pointer">
              View all notifications
            </Button>
          </NavLink>
        </div>
      </>
    );
  };

  return (
    <div
      ref={dropdownRef}
      className="absolute right-0 mt-2 w-80 sm:w-96 z-50 animate-in fade-in-0 zoom-in-95"
    >
      <Card className="py-3 gap-2">
        <CardHeader className="p-4 pb-2 flex flex-row items-center justify-between">
          <CardTitle className="text-lg">Notifications</CardTitle>
          <Button
            variant="ghost"
            size="sm"
            className="h-8 text-xs"
            onClick={markAllAsRead}
            disabled={loading || !!error}
          >
            <CheckCheck className="mr-1 h-4 w-4" />
            Mark all as read
          </Button>
        </CardHeader>
        <CardContent className="p-0 max-h-[60vh] overflow-y-auto">
          {renderContent()}
        </CardContent>
      </Card>
    </div>
  );
}
