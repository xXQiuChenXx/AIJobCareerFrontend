import {
  ArrowRight,
  Brain,
  Building2,
  ChevronRight,
  Cpu,
  Database,
  BotIcon as Robot,
} from "lucide-react";
import type { Route } from "./+types/home";
import { NavLink } from "react-router";
import { Button } from "@/components/ui/button";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "AI Job Web App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  return (
    <main className="flex-1">
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container grid items-center gap-6 px-4 md:px-6 lg:grid-cols-2 lg:gap-10 mx-auto">
          <div className="space-y-4">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
              Accelerate Your Career with{" "}
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                AI-Powered
              </span>{" "}
              Job Matching
            </h1>
            <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Connect with the perfect opportunities tailored to your skills and
              aspirations. Our AI-driven platform matches you with companies
              that value your unique talents.
            </p>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <NavLink
                to="/careers"
                className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              >
                Search Jobs
                <ArrowRight className="ml-2 h-4 w-4" />
              </NavLink>
              <NavLink
                to="/sign-up?type=employer"
                className="inline-flex h-10 items-center justify-center rounded-md border border-input bg-background px-8 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              >
                Post a job
              </NavLink>
            </div>
          </div>
          <div className="mx-auto w-full max-w-[500px] lg:ml-auto my-20">
            <img
              src="/hero.png"
              alt="AI Job Matching"
              className="mx-auto overflow-hidden rounded-xl object-contain"
            />
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="w-full bg-muted py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <div className="inline-block rounded-lg bg-primary px-3 py-1 text-sm text-primary-foreground">
                Why Choose Us
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                The Smarter Way to Find Your Next Role
              </h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Our AI-powered platform analyzes thousands of job listings and
                matches them with your skills, experience, and career goals.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3 lg:gap-12">
            <div className="flex flex-col items-center space-y-4 rounded-lg border bg-background p-6 shadow-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
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
                  className="h-6 w-6"
                >
                  <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                  <polyline points="14 2 14 8 20 8" />
                  <path d="M16 13H8" />
                  <path d="M16 17H8" />
                  <path d="M10 9H8" />
                </svg>
              </div>
              <h3 className="text-xl font-bold">Smart Resume Analysis</h3>
              <p className="text-center text-muted-foreground">
                Our AI analyzes your resume to identify your skills, experience,
                and potential.
              </p>
            </div>
            <div className="flex flex-col items-center space-y-4 rounded-lg border bg-background p-6 shadow-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
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
                  className="h-6 w-6"
                >
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
              </div>
              <h3 className="text-xl font-bold">Personalized Matching</h3>
              <p className="text-center text-muted-foreground">
                Get matched with jobs that align with your career goals and work
                preferences.
              </p>
            </div>
            <div className="flex flex-col items-center space-y-4 rounded-lg border bg-background p-6 shadow-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
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
                  className="h-6 w-6"
                >
                  <path d="M12 20h9" />
                  <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold">Application Insights</h3>
              <p className="text-center text-muted-foreground">
                Receive feedback and insights to improve your applications and
                interviews.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Job Categories Section */}
      <section className="w-full py-12 md:py-24 bg-muted/30">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
                Explore AI Career Paths
              </h2>
              <p className="max-w-[700px] text-muted-foreground md:text-xl">
                Discover specialized roles across the artificial intelligence
                landscape
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
            <div className="flex flex-col items-center p-6 bg-background rounded-lg shadow-sm border hover:shadow-md transition-shadow">
              <div className="p-2 bg-primary/10 rounded-full mb-4">
                <Brain className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold">Machine Learning</h3>
              <p className="text-sm text-muted-foreground text-center mt-2">
                Build models that learn from data and make predictions
              </p>
              <Button variant="link" className="mt-4">
                View Jobs <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
            </div>
            <div className="flex flex-col items-center p-6 bg-background rounded-lg shadow-sm border hover:shadow-md transition-shadow">
              <div className="p-2 bg-primary/10 rounded-full mb-4">
                <Database className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold">Data Science</h3>
              <p className="text-sm text-muted-foreground text-center mt-2">
                Extract insights and knowledge from structured and unstructured
                data
              </p>
              <Button variant="link" className="mt-4">
                View Jobs <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
            </div>
            <div className="flex flex-col items-center p-6 bg-background rounded-lg shadow-sm border hover:shadow-md transition-shadow">
              <div className="p-2 bg-primary/10 rounded-full mb-4">
                <Cpu className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold">MLOps</h3>
              <p className="text-sm text-muted-foreground text-center mt-2">
                Deploy and maintain machine learning models in production
              </p>
              <Button variant="link" className="mt-4">
                View Jobs <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
            </div>
            <div className="flex flex-col items-center p-6 bg-background rounded-lg shadow-sm border hover:shadow-md transition-shadow">
              <div className="p-2 bg-primary/10 rounded-full mb-4">
                <Robot className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold">AI Research</h3>
              <p className="text-sm text-muted-foreground text-center mt-2">
                Push the boundaries of what's possible with artificial
                intelligence
              </p>
              <Button variant="link" className="mt-4">
                View Jobs <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Jobs Section */}
      <section className="w-full py-12 md:py-24">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
            <div>
              <h2 className="text-3xl font-bold tracking-tighter">
                Featured AI Jobs
              </h2>
              <p className="text-muted-foreground mt-1">
                Handpicked opportunities from top companies
              </p>
            </div>
            <Button variant="outline">
              View All Jobs <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
          </div>
          <div className="grid gap-6">
            {/* Job Card 1 */}
            <div className="group relative rounded-lg border p-6 hover:shadow-md transition-shadow">
              <div className="flex flex-col sm:flex-row justify-between gap-4">
                <div className="flex gap-4">
                  <div className="h-12 w-12 rounded-md border flex items-center justify-center bg-muted">
                    <Building2 className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">
                      Senior Machine Learning Engineer
                    </h3>
                    <div className="flex flex-wrap gap-2 mt-1">
                      <span className="text-sm text-muted-foreground">
                        TechCorp AI
                      </span>
                      <span className="text-sm text-muted-foreground">•</span>
                      <span className="text-sm text-muted-foreground">
                        San Francisco, CA (Remote)
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col sm:items-end gap-2">
                  <span className="text-sm font-medium">$150K - $200K</span>
                  <span className="text-xs text-muted-foreground">
                    Posted 2 days ago
                  </span>
                </div>
              </div>
              <div className="mt-4">
                <p className="text-sm text-muted-foreground line-clamp-2">
                  Design and implement machine learning models to solve complex
                  problems. Work with large datasets and deploy models to
                  production.
                </p>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold">
                  Python
                </span>
                <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold">
                  TensorFlow
                </span>
                <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold">
                  PyTorch
                </span>
                <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold">
                  MLOps
                </span>
              </div>
              <NavLink
                to="#"
                className="absolute inset-0"
                aria-label="View job details"
              >
                <span className="sr-only">View job details</span>
              </NavLink>
            </div>
            {/* Job Card 2 */}
            <div className="group relative rounded-lg border p-6 hover:shadow-md transition-shadow">
              <div className="flex flex-col sm:flex-row justify-between gap-4">
                <div className="flex gap-4">
                  <div className="h-12 w-12 rounded-md border flex items-center justify-center bg-muted">
                    <Building2 className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">
                      AI Research Scientist
                    </h3>
                    <div className="flex flex-wrap gap-2 mt-1">
                      <span className="text-sm text-muted-foreground">
                        InnovateAI Labs
                      </span>
                      <span className="text-sm text-muted-foreground">•</span>
                      <span className="text-sm text-muted-foreground">
                        Boston, MA (Hybrid)
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col sm:items-end gap-2">
                  <span className="text-sm font-medium">$180K - $220K</span>
                  <span className="text-xs text-muted-foreground">
                    Posted 1 week ago
                  </span>
                </div>
              </div>
              <div className="mt-4">
                <p className="text-sm text-muted-foreground line-clamp-2">
                  Conduct cutting-edge research in natural language processing
                  and develop novel algorithms to advance the state of the art
                  in AI.
                </p>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold">
                  NLP
                </span>
                <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold">
                  Deep Learning
                </span>
                <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold">
                  Research
                </span>
                <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold">
                  PhD
                </span>
              </div>
              <NavLink
                to="#"
                className="absolute inset-0"
                aria-label="View job details"
              >
                <span className="sr-only">View job details</span>
              </NavLink>
            </div>

            {/* Job Card 3 */}
            <div className="group relative rounded-lg border p-6 hover:shadow-md transition-shadow">
              <div className="flex flex-col sm:flex-row justify-between gap-4">
                <div className="flex gap-4">
                  <div className="h-12 w-12 rounded-md border flex items-center justify-center bg-muted">
                    <Building2 className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">
                      Computer Vision Engineer
                    </h3>
                    <div className="flex flex-wrap gap-2 mt-1">
                      <span className="text-sm text-muted-foreground">
                        VisionTech AI
                      </span>
                      <span className="text-sm text-muted-foreground">•</span>
                      <span className="text-sm text-muted-foreground">
                        Remote (US)
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col sm:items-end gap-2">
                  <span className="text-sm font-medium">$130K - $170K</span>
                  <span className="text-xs text-muted-foreground">
                    Posted 3 days ago
                  </span>
                </div>
              </div>
              <div className="mt-4">
                <p className="text-sm text-muted-foreground line-clamp-2">
                  Develop computer vision algorithms for object detection, image
                  segmentation, and visual understanding in autonomous systems.
                </p>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold">
                  Computer Vision
                </span>
                <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold">
                  OpenCV
                </span>
                <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold">
                  CUDA
                </span>
                <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold">
                  C++
                </span>
              </div>
              <NavLink
                to="#"
                className="absolute inset-0"
                aria-label="View job details"
              >
                <span className="sr-only">View job details</span>
              </NavLink>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
