import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MapPin, Clock, Building, Filter, Search } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useMediaQuery } from "@/hooks/use-media-query";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import {
  type JobFilterParams,
  JobType,
  type PaginatedResponse,
  jobTypeToString,
  stringToJobType,
} from "@/types/job";
import {
  formatSalaryRange,
  getJobs,
  parseSalaryRange,
} from "@/services/job-service";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";
import type { jobType } from "@/models/job";
import { IconCash } from "@tabler/icons-react";
import { NavLink } from "react-router";

export default function JobListings() {
  const [filters, setFilters] = useState<{
    jobType: string[];
    location: string;
    salary: string;
    searchTerm: string;
    sortBy: string;
  }>({
    jobType: [],
    location: "",
    salary: "",
    searchTerm: "",
    sortBy: "newest",
  });

  const [jobsData, setJobsData] = useState<PaginatedResponse<jobType> | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  const isDesktop = useMediaQuery("(min-width: 768px)");

  useEffect(() => {
    fetchJobs();
  }, [filters, currentPage]);

  const fetchJobs = async () => {
    setLoading(true);
    try {
      // Convert UI filters to API parameters
      const apiFilters: JobFilterParams = {
        pageIndex: currentPage,
        pageSize: 10,
        searchTerm: filters.searchTerm || undefined,
        location: filters.location || undefined,
      };

      // Handle job type filters
      if (filters.jobType.length > 0) {
        apiFilters.jobType = filters.jobType.map(
          (type) => stringToJobType(type)!
        );
      }

      // Handle salary filter
      if (filters.salary) {
        const salaryRange = parseSalaryRange(filters.salary);
        apiFilters.minSalary = salaryRange.min;
        apiFilters.maxSalary = salaryRange.max;
      }

      // Handle sorting
      switch (filters.sortBy) {
        case "newest":
          apiFilters.sortBy = "PostedDate";
          apiFilters.sortDescending = true;
          break;
        case "oldest":
          apiFilters.sortBy = "PostedDate";
          apiFilters.sortDescending = false;
          break;
        case "salary-high":
          apiFilters.sortBy = "Salary";
          apiFilters.sortDescending = true;
          break;
        case "salary-low":
          apiFilters.sortBy = "Salary";
          apiFilters.sortDescending = false;
          break;
      }

      const data = await getJobs(apiFilters);
      setJobsData(data);
    } catch (error: any) {
      toast(error.message || "Failed to fetch job listings");
      console.error("Error fetching jobs:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (key: string, value: string | string[]) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
    setCurrentPage(1); // Reset to first page when filters change
  };

  const handleJobTypeChange = (type: string) => {
    setFilters((prev) => {
      const updatedTypes = prev.jobType.includes(type)
        ? prev.jobType.filter((t) => t !== type)
        : [...prev.jobType, type];
      return { ...prev, jobType: updatedTypes };
    });
    setCurrentPage(1);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchJobs();
  };

  const clearFilters = () => {
    setFilters({
      jobType: [],
      location: "",
      salary: "",
      searchTerm: "",
      sortBy: "newest",
    });
    setCurrentPage(1);
  };

  const FilterContent = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium mb-4">Job Type</h3>
        <div className="space-y-2">
          {["Full-time", "Part-time", "Contract", "Internship"].map((type) => (
            <div key={type} className="flex items-center space-x-2">
              <Checkbox
                id={`type-${type}`}
                checked={filters.jobType.includes(type)}
                onCheckedChange={() => handleJobTypeChange(type)}
              />
              <label
                htmlFor={`type-${type}`}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {type}
              </label>
            </div>
          ))}
        </div>
      </div>

      <Separator />

      <div>
        <h3 className="text-lg font-medium mb-4">Location</h3>
        <Select
          value={filters.location}
          onValueChange={(value) => handleFilterChange("location", value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select location" />
          </SelectTrigger>
          <SelectContent>
            {[
              "Kuching",
              "Miri",
              "Sibu",
              "Bintulu",
              "Samarahan",
              "Sri Aman",
              "Kapit",
              "Limbang",
              "Sarikei",
              "Betong",
            ].map((location) => (
              <SelectItem key={location} value={location}>
                {location}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Separator />

      <div>
        <h3 className="text-lg font-medium mb-4">Salary Range</h3>
        <Select
          value={filters.salary}
          onValueChange={(value) => handleFilterChange("salary", value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select salary range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="0-50k">$0 - $50,000</SelectItem>
            <SelectItem value="50k-100k">$50,000 - $100,000</SelectItem>
            <SelectItem value="100k-150k">$100,000 - $150,000</SelectItem>
            <SelectItem value="150k+">$150,000+</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Button className="w-full" variant="outline" onClick={clearFilters}>
        Clear Filters
      </Button>
    </div>
  );

  return (
    <div className="grid md:grid-cols-[250px_1fr] gap-6">
      {/* Filters - Desktop */}
      {isDesktop ? (
        <div className="bg-white p-6 rounded-lg shadow-sm h-fit">
          <h2 className="text-xl font-bold mb-6 flex items-center">
            <Filter className="h-5 w-5 mr-2" />
            Filters
          </h2>
          <FilterContent />
        </div>
      ) : (
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" className="mb-4 w-full">
              Filters
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <h2 className="text-xl font-bold mb-6">Filters</h2>
            <FilterContent />
          </SheetContent>
        </Sheet>
      )}

      {/* Job Listings */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <h2 className="text-2xl font-bold">Job Listings</h2>

          <div className="flex flex-col sm:flex-row w-full sm:w-auto gap-3">
            <form
              onSubmit={handleSearchSubmit}
              className="flex w-full sm:w-auto"
            >
              <Input
                placeholder="Search jobs..."
                value={filters.searchTerm}
                onChange={(e) =>
                  handleFilterChange("searchTerm", e.target.value)
                }
                className="rounded-r-none"
              />
              <Button type="submit" className="rounded-l-none">
                <Search className="h-4 w-4" />
              </Button>
            </form>

            <Select
              value={filters.sortBy}
              onValueChange={(value) => handleFilterChange("sortBy", value)}
            >
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest</SelectItem>
                <SelectItem value="oldest">Oldest</SelectItem>
                <SelectItem value="salary-high">Highest Salary</SelectItem>
                <SelectItem value="salary-low">Lowest Salary</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {loading ? (
          // Loading skeletons
          Array.from({ length: 3 }).map((_, i) => (
            <Card key={i} className="overflow-hidden">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div>
                    <Skeleton className="h-6 w-64 mb-2" />
                    <Skeleton className="h-4 w-32" />
                  </div>
                  <Skeleton className="h-6 w-24" />
                </div>
              </CardHeader>
              <CardContent className="pb-2">
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-full mb-4" />
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mb-4">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-4 w-32" />
                </div>
                <div className="flex flex-wrap gap-2">
                  <Skeleton className="h-6 w-20" />
                  <Skeleton className="h-6 w-20" />
                  <Skeleton className="h-6 w-20" />
                </div>
              </CardContent>
              <CardFooter className="pt-2">
                <Skeleton className="h-10 w-32" />
              </CardFooter>
            </Card>
          ))
        ) : jobsData?.items && jobsData.items.length > 0 ? (
          jobsData.items.map((job) => (
            <Card key={job.job_id} className="overflow-hidden">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-xl">{job.job_title}</CardTitle>
                    <div className="flex items-center mt-1 text-muted-foreground">
                      <Building className="h-4 w-4 mr-1" />
                      <span className="text-sm">
                        {job.company.company_name}
                      </span>
                    </div>
                  </div>
                  <Badge
                    variant={
                      job.job_type === JobType.Full_Time ? "default" : "outline"
                    }
                  >
                    {jobTypeToString(job.job_type)}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="pb-2">
                <p className="text-sm text-muted-foreground mb-4">
                  {job.job_responsible}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mb-4">
                  <div className="flex items-center text-sm">
                    <MapPin className="h-4 w-4 mr-1 text-muted-foreground" />
                    <span>{job.job_location}</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <IconCash className="h-5 w-5 mr-1 text-muted-foreground" />
                    <span>
                      {formatSalaryRange(
                        job.job_salary_min,
                        job.job_salary_max
                      )}
                    </span>
                  </div>
                  <div className="flex items-center text-sm">
                    <Clock className="h-4 w-4 mr-1 text-muted-foreground" />
                    <span>
                      Posted{" "}
                      {new Date(job.posted_date).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </span>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  {job.requiredSkills?.length &&
                    job.requiredSkills.map((skill) => (
                      <Badge
                        key={skill}
                        variant="secondary"
                        className="font-normal"
                      >
                        {skill}
                      </Badge>
                    ))}
                </div>
              </CardContent>
              <CardFooter className="pt-2 gap-2">
                <NavLink to={`./apply/${job.job_id}`}>
                  <Button className="w-full sm:w-auto cursor-pointer">
                    Apply Now
                  </Button>
                </NavLink>
                <NavLink to={`./details/${job.job_id}`}>
                  <Button
                    className="w-full sm:w-auto cursor-pointer"
                    variant="outline"
                  >
                    More Details
                  </Button>
                </NavLink>
              </CardFooter>
            </Card>
          ))
        ) : (
          <div className="text-center py-10">
            <p className="text-lg text-muted-foreground">
              No job listings found matching your criteria
            </p>
            <Button variant="outline" className="mt-4" onClick={clearFilters}>
              Clear Filters
            </Button>
          </div>
        )}

        {/* Pagination */}
        {jobsData && jobsData.items.length > 0 && (
          <div className="flex justify-center mt-8">
            <Button
              variant="outline"
              className="mx-1"
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={!jobsData.hasPreviousPage}
            >
              Previous
            </Button>
            {Array.from({ length: jobsData.totalPages }).map((_, i) => (
              <Button
                key={i}
                variant={currentPage === i + 1 ? "default" : "outline"}
                className="mx-1"
                onClick={() => setCurrentPage(i + 1)}
              >
                {i + 1}
              </Button>
            ))}
            <Button
              variant="outline"
              className="mx-1"
              onClick={() => setCurrentPage((prev) => prev + 1)}
              disabled={!jobsData.hasNextPage}
            >
              Next
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
