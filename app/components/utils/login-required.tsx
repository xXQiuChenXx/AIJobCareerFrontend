import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { LockKeyhole } from "lucide-react";
import { NavLink } from "react-router";

export default function LoginRequired() {
  return (
    <div className="flex-1 flex-col items-center justify-center bg-muted/40 p-4">
      <Card className="mx-auto max-w-md w-full mt-[10vh]">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="rounded-full bg-primary/10 p-4">
              <LockKeyhole className="h-8 w-8 text-primary" />
            </div>
          </div>
          <CardTitle className="text-2xl">Login Required</CardTitle>
          <CardDescription>
            You need to be logged in to access this page
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center">
          <p className="text-muted-foreground">
            Please sign in to your account or create a new account to continue.
          </p>
        </CardContent>
        <CardFooter className="flex flex-col sm:flex-row gap-2 sm:gap-4">
          <Button asChild className="flex flex-1 w-full">
            <NavLink to="/login">Sign In</NavLink>
          </Button>
          <Button asChild variant="outline" className="flex flex-1 w-full">
            <NavLink to="/sign-up">Create Account</NavLink>
          </Button>
        </CardFooter>
      </Card>
      <p className="mt-4 text-center text-sm text-muted-foreground">
        <NavLink
          to="/"
          className="underline underline-offset-4 hover:text-primary"
        >
          Return to Home
        </NavLink>
      </p>
    </div>
  );
}
