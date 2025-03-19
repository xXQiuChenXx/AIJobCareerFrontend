import { NavLink } from "react-router";
import { ArrowLeft } from "lucide-react";
import { SignInForm } from "@/components/forms/sign-in-form";

const LoginPage = () => {
  return (
    <div className="flex-1 flex flex-col p-6 md:p-10 lg:p-16">
      <div className="mb-8">
        <NavLink
          to="/"
          className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to home
        </NavLink>
      </div>

      <div className="max-w-md mx-auto w-full">
        <div className="space-y-2 mb-8">
          <h2 className="text-3xl font-bold tracking-tight">Sign in</h2>
          <p className="text-muted-foreground">
            Enter your credentials to access your account
          </p>
        </div>

        <SignInForm />
      </div>
    </div>
  );
};

export default LoginPage;
