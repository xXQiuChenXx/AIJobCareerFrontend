import { EmployerSignupForm } from "@/components/forms/employer-signup-form";
import { JobSeekerSignupForm } from "@/components/forms/job-seeker-signup-form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft } from "lucide-react";
import { NavLink, useSearchParams } from "react-router";

export default function SignupPage() {
  const [searchParams] = useSearchParams();
  const type = searchParams.get("type") || "jobseeker";

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
          <h2 className="text-3xl font-bold tracking-tight">
            Create an account
          </h2>
          <p className="text-muted-foreground">
            Choose the account type that best fits your needs
          </p>
        </div>

        <Tabs defaultValue={type} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="jobseeker">Job Seeker</TabsTrigger>
            <TabsTrigger value="employer">Employer</TabsTrigger>
          </TabsList>
          <TabsContent value="jobseeker">
            <JobSeekerSignupForm />
          </TabsContent>
          <TabsContent value="employer">
            <EmployerSignupForm />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
