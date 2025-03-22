import { useState } from "react";
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
import { MapPin, DollarSign, Clock, Building, Filter } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useMediaQuery } from "@/hooks/use-media-query";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { jobListings } from "@/sample-data/jobs";

export default function JobListings() {
  const [filters, setFilters] = useState({
    jobType: [] as string[],
    location: "",
    salary: "",
  });

  const isDesktop = useMediaQuery("(min-width: 768px)");

  const handleFilterChange = (key: string, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
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
                onCheckedChange={() =>
                  handleFilterChange(
                    "jobType",
                    filters.jobType.includes(type) ? "" : type
                  )
                }
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
            <SelectItem value="remote">Remote</SelectItem>
            <SelectItem value="san-francisco">San Francisco, CA</SelectItem>
            <SelectItem value="new-york">New York, NY</SelectItem>
            <SelectItem value="austin">Austin, TX</SelectItem>
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

      <Button
        className="w-full"
        variant="outline"
        onClick={() => setFilters({ jobType: [], location: "", salary: "" })}
      >
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
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Job Listings</h2>
          <Select defaultValue="newest">
            <SelectTrigger className="w-[180px]">
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

        {jobListings.map((job) => (
          <Card key={job.id} className="overflow-hidden">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-xl">{job.title}</CardTitle>
                  <div className="flex items-center mt-1 text-muted-foreground">
                    <Building className="h-4 w-4 mr-1" />
                    <span className="text-sm">{job.company}</span>
                  </div>
                </div>
                <Badge
                  variant={job.type === "Full-time" ? "default" : "outline"}
                >
                  {job.type}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="pb-2">
              <p className="text-sm text-muted-foreground mb-4">
                {job.description}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mb-4">
                <div className="flex items-center text-sm">
                  <MapPin className="h-4 w-4 mr-1 text-muted-foreground" />
                  <span>{job.location}</span>
                </div>
                <div className="flex items-center text-sm">
                  <DollarSign className="h-4 w-4 mr-1 text-muted-foreground" />
                  <span>{job.salary}</span>
                </div>
                <div className="flex items-center text-sm">
                  <Clock className="h-4 w-4 mr-1 text-muted-foreground" />
                  <span>Posted {job.posted}</span>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {job.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="font-normal">
                    {tag}
                  </Badge>
                ))}
              </div>
            </CardContent>
            <CardFooter className="pt-2">
              <Button className="w-full sm:w-auto">Apply Now</Button>
            </CardFooter>
          </Card>
        ))}

        <div className="flex justify-center mt-8">
          <Button variant="outline" className="mx-1">
            Previous
          </Button>
          <Button variant="outline" className="mx-1">
            1
          </Button>
          <Button className="mx-1">2</Button>
          <Button variant="outline" className="mx-1">
            3
          </Button>
          <Button variant="outline" className="mx-1">
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
