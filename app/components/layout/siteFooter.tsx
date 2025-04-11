import { NavLink } from "react-router";

const SiteFooter = () => {
  return (
    <footer className="border-t bg-muted/40">
      <div className="container flex flex-col gap-6 py-8 px-4 md:px-6 lg:flex-row lg:gap-12 mx-auto">
        <div className="flex flex-col gap-3 lg:max-w-sm">
          <NavLink to="/" className="flex items-center gap-2 font-bold text-xl">
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              AI
            </span>
            <span>JobCareer</span>
          </NavLink>
          <p className="text-sm text-muted-foreground">
            Connecting talent with opportunity through AI-powered job matching.
          </p>
          <div className="flex gap-4">
            <NavLink
              to="#"
              className="text-muted-foreground hover:text-foreground"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5"
              >
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
              </svg>
              <span className="sr-only">Facebook</span>
            </NavLink>
            <NavLink
              to="#"
              className="text-muted-foreground hover:text-foreground"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5"
              >
                <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
              </svg>
              <span className="sr-only">Twitter</span>
            </NavLink>
            <NavLink
              to="#"
              className="text-muted-foreground hover:text-foreground"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5"
              >
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                <rect width="4" height="12" x="2" y="9" />
                <circle cx="4" cy="4" r="2" />
              </svg>
              <span className="sr-only">LinkedIn</span>
            </NavLink>
          </div>
        </div>
        <div className="grid flex-1 grid-cols-2 gap-8 sm:grid-cols-3">
          <div className="space-y-3">
            <h3 className="text-sm font-medium">Company</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <NavLink
                  to="/"
                  className="text-muted-foreground hover:text-foreground"
                >
                  About
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/plan"
                  className="text-muted-foreground hover:text-foreground"
                >
                  Pricing Plans
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/training"
                  className="text-muted-foreground hover:text-foreground"
                >
                  License
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/training"
                  className="text-muted-foreground hover:text-foreground"
                >
                  Organization Training
                </NavLink>
              </li>
            </ul>
          </div>
          <div className="space-y-3">
            <h3 className="text-sm font-medium">For Job Seekers</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <NavLink
                  to="/careers"
                  className="text-muted-foreground hover:text-foreground"
                >
                  Browse Jobs
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/training"
                  className="text-muted-foreground hover:text-foreground"
                >
                  Training Resources
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/profile"
                  className="text-muted-foreground hover:text-foreground"
                >
                  Your Profile
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/aichat"
                  className="text-muted-foreground hover:text-foreground"
                >
                  AI Career Advisor
                </NavLink>
              </li>
            </ul>
          </div>
          <div className="space-y-3">
            <h3 className="text-sm font-medium">For Employers</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <NavLink
                  to="/plan"
                  className="text-muted-foreground hover:text-foreground"
                >
                  Post a Job
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/plan"
                  className="text-muted-foreground hover:text-foreground"
                >
                  Talent Solutions
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/plan"
                  className="text-muted-foreground hover:text-foreground"
                >
                  Pricing
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/aichat"
                  className="text-muted-foreground hover:text-foreground"
                >
                  AI Recruiting Tools
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="border-t py-6">
        <div className="container flex flex-col items-center justify-between gap-4 px-4 md:flex-row md:px-6 mx-auto">
          <p className="text-center text-sm text-muted-foreground md:text-left">
            © {new Date().getFullYear()} AI JobCareer. All rights reserved.
          </p>
          <p className="text-center text-sm text-muted-foreground md:text-left">
            Made with ❤️ for job seekers and employers
          </p>
        </div>
      </div>
    </footer>
  );
};

export default SiteFooter;
