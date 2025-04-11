// Dynamic Route
import type { Route } from "../careers/+types/career-details";
import {
  Briefcase,
  Building2,
  Calendar,
  ChevronLeft,
  Clock,
  Globe,
  MapPin,
  Share2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { NavLink, useLocation } from "react-router";
import { formatSalaryRange, getJobById } from "@/services/job-service";
import { useEffect, useState } from "react";
import type { jobType } from "@/models/job";
import { jobTypeToString } from "@/types/job";
import { toast } from "sonner";

const JobDetailPage = ({ params }: Route.ComponentProps) => {
  const [jobData, setJobData] = useState<jobType | null>(null);
  const { id } = params;
  const location = useLocation();

  useEffect(() => {
    getJobById(id).then((job) => {
      setJobData(job);
    });
  }, [id]);

  if (!jobData)
    return (
      <div>
        <h1>Loading</h1>
      </div>
    );

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="mb-6">
        <NavLink
          to="/careers"
          className="flex items-center text-sm text-muted-foreground hover:text-primary transition-colors"
        >
          <ChevronLeft className="h-4 w-4 mr-1" />
          Back to all jobs
        </NavLink>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* Job Header */}
          <div className="bg-card rounded-xl p-6 shadow-sm">
            <div className="flex flex-col md:flex-row md:items-center gap-4">
              <div className="flex-shrink-0">
                <img
                  src={jobData?.company?.company_icon || "/profile/company.png"}
                  alt={jobData?.company.company_name}
                  width={80}
                  height={80}
                  className="rounded-lg bg-background p-2"
                />
              </div>
              <div className="flex-grow">
                <h1 className="text-2xl md:text-3xl font-bold">
                  {jobData?.job_title}
                </h1>
                <div className="flex flex-wrap items-center gap-2 mt-2">
                  <div className="flex items-center text-muted-foreground">
                    <Building2 className="h-4 w-4 mr-1" />
                    <span>{jobData?.company.company_name}</span>
                  </div>
                  <div className="flex items-center text-muted-foreground">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span>{jobData?.job_location}</span>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 mt-4">
                  <Badge
                    variant="secondary"
                    className="flex items-center gap-1"
                  >
                    <Briefcase className="h-3 w-3" />
                    {jobTypeToString(jobData.job_type)}
                  </Badge>
                  <Badge
                    variant="secondary"
                    className="flex items-center gap-1"
                  >
                    {formatSalaryRange(
                      jobData?.job_salary_min,
                      jobData.job_salary_max
                    )}
                  </Badge>
                  <Badge
                    variant="secondary"
                    className="flex items-center gap-1"
                  >
                    <Clock className="h-3 w-3" />
                    {/* {jobData.experience} */}
                  </Badge>
                </div>
              </div>
              <div className="flex flex-col gap-2 md:items-end mt-4 md:mt-0">
                <NavLink to={`/careers/apply/${jobData.job_id}`}>
                  <Button className="w-full md:w-auto cursor-pointer">
                    Apply Now
                  </Button>
                </NavLink>
                <Button
                  variant="outline"
                  size="icon"
                  className="hidden md:flex cursor-pointer"
                  onClick={() => {
                    navigator.clipboard.writeText(
                      window.location.origin + location.pathname
                    );
                    toast("Link copied to clipboard");
                  }}
                >
                  <Share2 className="h-4 w-4" />
                  <span className="sr-only">Share job</span>
                </Button>
              </div>
            </div>
            <div className="flex justify-between items-center mt-6 text-sm text-muted-foreground">
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-1" />
                <span>
                  Posted{" "}
                  {new Date(jobData?.posted_date as Date).toLocaleDateString(
                    "en-GB",
                    {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    }
                  )}
                </span>
              </div>
              <div>
                <span className="font-medium">Apply before:</span>{" "}
                {new Date(jobData?.job_deadline as Date).toLocaleDateString(
                  "en-GB",
                  {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  }
                )}
              </div>
            </div>
          </div>

          {/* Job Description */}
          <div className="bg-card rounded-xl p-6 shadow-sm">
            <h2 className="text-xl font-semibold mb-4">Job Description</h2>
            <p className="text-muted-foreground mb-6">
              {jobData.job_description}
            </p>

            <h3 className="text-lg font-semibold mb-3">Responsibilities</h3>
            <ul className="list-disc pl-5 space-y-2 text-muted-foreground mb-6">
              {jobData.job_responsible.split("\n").map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>

            <h3 className="text-lg font-semibold mb-3">Requirements</h3>
            <ul className="list-disc pl-5 space-y-2 text-muted-foreground mb-6">
              {jobData.job_requirement.split("\n").map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>

            <h3 className="text-lg font-semibold mb-3">Benefits</h3>
            <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
              {jobData.job_benefit.split("\n").map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>

          {/* Company Info */}
          <div className="bg-card rounded-xl p-6 shadow-sm">
            <h2 className="text-xl font-semibold mb-4">About the Company</h2>
            <div className="flex flex-col md:flex-row gap-4 items-start">
              <img
                src={jobData.company?.company_icon || "/profile/company.png"}
                alt={jobData.company.company_name}
                width={100}
                height={100}
                className="rounded-lg bg-background p-2"
              />
              <div>
                <h3 className="text-lg font-medium">
                  {jobData.company.company_name}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2 text-sm">
                  <div className="flex items-center text-muted-foreground">
                    <Briefcase className="h-4 w-4 mr-2" />
                    <span>{jobData.company.company_industry}</span>
                  </div>
                  {jobData?.company.company_website && (
                    <div className="flex items-center text-muted-foreground">
                      <Globe className="h-4 w-4 mr-2" />
                      <NavLink
                        to={jobData?.company.company_website}
                        target="_blank"
                        className="text-primary hover:underline"
                      >
                        <span>{jobData?.company.company_website}</span>
                      </NavLink>
                    </div>
                  )}
                </div>
                <p className="mt-4 text-muted-foreground">
                  {jobData.company.company_intro}
                </p>
              </div>
            </div>
          </div>

          {/* Related Jobs */}
          {/* <RelatedJobs /> */}
        </div>

        <div className="space-y-6">
          {/* Apply CTA */}
          <div className="bg-card rounded-xl p-6 shadow-sm sticky top-6">
            <h2 className="text-xl font-semibold mb-4">
              Interested in this position?
            </h2>
            <p className="text-muted-foreground mb-4">
              We're looking for talented individuals to join our team. Apply now
              to start your journey with {jobData?.company.company_name}.
            </p>
            <NavLink to={`/careers/apply/${jobData.job_id}`}>
              <Button className="w-full mb-3 cursor-pointer">Apply Now</Button>
            </NavLink>
            <Button
              variant="outline"
              className="w-full flex items-center justify-center gap-2 cursor-pointer"
              onClick={() => {
                navigator.clipboard.writeText(
                  window.location.origin + location.pathname
                );
                toast("Link copied to clipboard");
              }}
            >
              <Share2 className="h-4 w-4" />
              Share This Job
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetailPage;
