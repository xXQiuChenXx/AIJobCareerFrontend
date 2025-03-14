import { EmployerSignupForm } from "@/components/forms/employer-signup-form";
import { JobSeekerSignupForm } from "@/components/forms/job-seeker-signup-form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft } from "lucide-react";
import { NavLink } from "react-router";

export default function SignupPage() {
  return (
    <div className="flex min-h-screen flex-col md:flex-row">
      {/* Left side - Image for desktop, hidden on mobile */}
      <div className="hidden md:block md:w-1/2 bg-primary/5 relative">
        <div className="fixed w-1/2 h-screen">
          <div className="absolute inset-0 flex flex-col justify-center items-center p-12">
            <div className="max-w-md space-y-6">
              <h1 className="text-4xl font-bold tracking-tight">
                Accelerate your career in AI
              </h1>
              <p className="text-lg text-muted-foreground">
                Join thousands of professionals finding opportunities in the
                rapidly growing AI industry.
              </p>
              <div className="grid grid-cols-2 gap-4 pt-8 opacity-80">
                <div className="bg-background rounded-lg p-4 shadow-sm">
                  <div className="font-medium">10,000+</div>
                  <div className="text-sm text-muted-foreground">AI Jobs</div>
                </div>
                <div className="bg-background rounded-lg p-4 shadow-sm">
                  <div className="font-medium">5,000+</div>
                  <div className="text-sm text-muted-foreground">Companies</div>
                </div>
                <div className="bg-background rounded-lg p-4 shadow-sm">
                  <div className="font-medium">95%</div>
                  <div className="text-sm text-muted-foreground">
                    Placement Rate
                  </div>
                </div>
                <div className="bg-background rounded-lg p-4 shadow-sm">
                  <div className="font-medium">24/7</div>
                  <div className="text-sm text-muted-foreground">Support</div>
                </div>
              </div>
            </div>
          </div>
          <img
            src="/sibu.jpg"
            alt="Sibu Background Image"
            className="absolute inset-0 h-full w-full object-cover opacity-10 -z-10"
          />
        </div>
      </div>

      {/* Right side - Sign up forms */}
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

          <Tabs defaultValue="jobseeker" className="w-full">
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
    </div>
  );
}
