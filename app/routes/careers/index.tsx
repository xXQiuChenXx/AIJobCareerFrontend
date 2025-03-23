import JobListings from "@/components/jobs/job-listings";
import SearchBar from "@/components/jobs/search-bar";
import { Badge } from "@/components/ui/badge";
import {
  Briefcase,
} from "lucide-react";

const CareersPage = () => {

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section with Gradient Background */}
      <div className="relative bg-gradient-to-r from-primary to-primary/80 py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-32 h-32 rounded-full bg-white"></div>
          <div className="absolute bottom-10 right-20 w-40 h-40 rounded-full bg-white"></div>
          <div className="absolute top-1/2 left-1/3 w-20 h-20 rounded-full bg-white"></div>
        </div>

        <div className="max-w-7xl mx-auto relative">
          <div className="text-center">
            <Badge variant="secondary" className="mb-4 py-1.5">
              <Briefcase className="h-3.5 w-3.5 mr-1" />
              Over 10,000 jobs available
            </Badge>
            <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl drop-shadow-sm">
              Find Your Dream Job
            </h1>
            <p className="mt-4 max-w-md mx-auto text-base text-primary-foreground/90 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
              Browse thousands of job listings from top companies and find the
              perfect role for your career.
            </p>
            {/* <div className="mt-10 max-w-xl mx-auto">
              <SearchBar />
            </div> */}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <JobListings />
      </main>
    </div>
  );
};

export default CareersPage;
