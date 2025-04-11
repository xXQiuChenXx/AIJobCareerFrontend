import { Bell, LogOut, Settings, User, UserCircle } from "lucide-react";
import { NavLink } from "react-router";
import { Button } from "@/components/ui/button";
import { CustomNavLink } from "./customNavLink";
import MobileViewMenu from "./mobile-view-menu";
import { useAuth } from "@/components/provider/auth-provider";
import { useState } from "react";
import { useNotifications } from "@/components/provider/notification-provider";
import NotificationDropdown from "../notifications/dropdown";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export const SiteHeader = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const { notifications, hasUnread } = useNotifications();

  const toggleNotifications = () => {
    setIsOpen(!isOpen);
  };
  return (
    <header className="sticky top-0 z-50 w-full border-b shadow bg-white">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6 mx-auto">
        <NavLink to="/" className="flex items-center gap-2 font-bold text-xl">
          <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            AI
          </span>
          <span>JobCareer</span>
        </NavLink>
        <nav className="hidden lg:flex gap-6">
          <CustomNavLink
            to="careers"
            className="font-medium text-slate-700 hover:text-slate-900"
          >
            Jobs in Sarawak
          </CustomNavLink>
          <CustomNavLink
            to="training"
            className="font-medium text-slate-700 hover:text-slate-900"
          >
            Courses & Training
          </CustomNavLink>
          <CustomNavLink
            to="aichat"
            className="font-medium text-slate-700 hover:text-slate-900"
          >
            AIChat
          </CustomNavLink>
          <CustomNavLink
            to="plan"
            className="font-medium text-slate-700 hover:text-slate-900"
          >
            Subscription
          </CustomNavLink>
        </nav>
        <div className="flex items-center gap-4">
          {!isAuthenticated && (
            <div className="items-center space-x-2 bg-[#FCD106] px-3 py-1.5 rounded-full hidden lg:flex">
              <UserCircle className="text-gray-800 w-4 h-4" />
              <span className="text-gray-800 font-semibold text-sm">
                SarawakID
              </span>
            </div>
          )}
          {isAuthenticated && (
            <div className="relative">
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleNotifications}
                aria-label={
                  hasUnread ? "You have unread notifications" : "Notifications"
                }
                className="relative cursor-pointer"
              >
                <Bell className="h-5 w-5" />
                {hasUnread && (
                  <span className="absolute top-1 right-1 h-2.5 w-2.5 rounded-full bg-destructive" />
                )}
              </Button>

              {isOpen && (
                <NotificationDropdown
                  notifications={notifications}
                  onClose={() => setIsOpen(false)}
                />
              )}
            </div>
          )}
          {isAuthenticated ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar className="h-8 w-8 cursor-pointer">
                  <AvatarImage
                    src="/placeholder.svg?height=32&width=32"
                    alt="User avatar"
                  />
                  <AvatarFallback>
                    <User className="h-4 w-4" />
                  </AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-fit">
                <div className="flex items-center justify-start gap-2 p-2">
                  <div className="flex flex-col space-y-1 leading-none">
                    <p className="font-medium">{user?.user_name}</p>
                    <p className="text-sm text-muted-foreground">
                      {user?.email}
                    </p>
                  </div>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <NavLink
                    to="/profile"
                    className="flex w-full cursor-pointer items-center"
                  >
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </NavLink>
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="flex cursor-pointer items-center"
                  onClick={logout}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <NavLink
                to="/sign-up"
                className="text-sm font-medium inline-flex hover:cursor-pointer"
              >
                <Button className="cursor-pointer" variant="outline">
                  Sign Up
                </Button>
              </NavLink>
              <NavLink
                to="/sign-up?type=employer"
                className="hidden sm:inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              >
                Post a job
              </NavLink>
            </>
          )}
          <MobileViewMenu />
        </div>
      </div>
    </header>
  );
};
