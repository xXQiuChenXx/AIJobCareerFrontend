import { Outlet } from "react-router";

const AuthPageLayout = () => {
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

      {/* Right side - Forms */}
      <Outlet />

    </div>
  );
};

export default AuthPageLayout;
