import { UserCircle } from "lucide-react";
import { NavLink } from "react-router";
import { Button } from "@/components/ui/button";
import { CustomNavLink } from "./customNavLink";
import MobileViewMenu from "./mobile-view-menu";
import { useAuth } from "@/components/provider/auth-provider";

export const SiteHeader = () => {
  const { user, isAuthenticated, logout } = useAuth();
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
            to="companies"
            className="font-medium text-slate-700 hover:text-slate-900"
          >
            Companies
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
          <div className="items-center space-x-2 bg-[#FCD106] px-3 py-1.5 rounded-full hidden lg:flex">
            <UserCircle className="text-gray-800 w-4 h-4" />
            <span className="text-gray-800 font-semibold text-sm">
              SarawakID
            </span>
          </div>
          {isAuthenticated ? (
            <Button
              className="ext-sm font-medium inline-flex cursor-pointer"
              variant="outline"
              onClick={logout}
            >
              Log out
            </Button>
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
                to="#sign-up"
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
