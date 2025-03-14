import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { NavLink } from "react-router";
import { Button } from "@/components/ui/button";

const MobileViewMenu = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="lg:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right">
        <div className="flex flex-col gap-6 py-6">
          <NavLink to="/" className="flex items-center gap-2 font-bold text-xl">
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              AI
            </span>
            <span>JobCareer</span>
          </NavLink>
          <nav className="flex flex-col gap-4">
            <NavLink
              to="#"
              className="text-sm font-medium hover:underline underline-offset-4"
            >
              Features
            </NavLink>
            <NavLink
              to="#"
              className="text-sm font-medium hover:underline underline-offset-4"
            >
              Pricing
            </NavLink>
            <NavLink
              to="#"
              className="text-sm font-medium hover:underline underline-offset-4"
            >
              About
            </NavLink>
            <NavLink
              to="#"
              className="text-sm font-medium hover:underline underline-offset-4"
            >
              Contact
            </NavLink>
            <NavLink
              to="#sign-up"
              className="inline-flex h-9 w-full items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            >
              Sign Up
            </NavLink>
          </nav>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileViewMenu;
