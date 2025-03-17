import JobListings from "@/components/jobs/job-listings";
import SearchBar from "@/components/jobs/search-bar";

const CareersPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative bg-primary py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl">
              Find Your Dream Job
            </h1>
            <p className="mt-3 max-w-md mx-auto text-base text-primary-foreground sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
              Browse thousands of job listings from top companies and find the
              perfect role for your career.
            </p>
            <div className="mt-10 max-w-xl mx-auto">
              <SearchBar />
            </div>
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
