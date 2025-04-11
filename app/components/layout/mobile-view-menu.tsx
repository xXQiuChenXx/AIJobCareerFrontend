import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { NavLink } from "react-router";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const MobileViewMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="lg:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right">
        <div className="flex flex-col gap-6 py-6 px-4">
          <NavLink to="/" className="flex items-center gap-2 font-bold text-xl">
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              AI
            </span>
            <span>JobCareer</span>
          </NavLink>
          <nav className="flex flex-col gap-4">
            <NavLink
              to="careers"
              onClick={() => setIsOpen(false)}
              className="text-sm font-medium hover:underline underline-offset-4"
            >
              Jobs in Sarawak
            </NavLink>
            <NavLink
              to="training"
              onClick={() => setIsOpen(false)}
              className="text-sm font-medium hover:underline underline-offset-4"
            >
              Courses & Training
            </NavLink>
            <NavLink
              to="aichat"
              onClick={() => setIsOpen(false)}
              className="text-sm font-medium hover:underline underline-offset-4"
            >
              AIChat
            </NavLink>
            <NavLink
              to="plan"
              onClick={() => setIsOpen(false)}
              className="text-sm font-medium hover:underline underline-offset-4"
            >
              Subscription
            </NavLink>
            <NavLink
              to="/sign-up"
              onClick={() => setIsOpen(false)}
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
