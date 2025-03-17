// Dynamic Route

import { jobData } from "@/sample-data/job-details";
import type { Route } from "../careers/+types/career-details";
import {
  Briefcase,
  Building2,
  Calendar,
  ChevronLeft,
  Clock,
  DollarSign,
  Globe,
  MapPin,
  Share2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { NavLink } from "react-router";

const JobDetailPage = ({ params }: Route.ComponentProps) => {
  const { id } = params;

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
                  src={jobData.companyInfo.logo || "/placeholder.svg"}
                  alt={jobData.companyInfo.name}
                  width={80}
                  height={80}
                  className="rounded-lg bg-background p-2"
                />
              </div>
              <div className="flex-grow">
                <h1 className="text-2xl md:text-3xl font-bold">
                  {jobData.title} {id}
                </h1>
                <div className="flex flex-wrap items-center gap-2 mt-2">
                  <div className="flex items-center text-muted-foreground">
                    <Building2 className="h-4 w-4 mr-1" />
                    <span>{jobData.company}</span>
                  </div>
                  <div className="flex items-center text-muted-foreground">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span>{jobData.location}</span>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 mt-4">
                  <Badge
                    variant="secondary"
                    className="flex items-center gap-1"
                  >
                    <Briefcase className="h-3 w-3" />
                    {jobData.type}
                  </Badge>
                  <Badge
                    variant="secondary"
                    className="flex items-center gap-1"
                  >
                    <DollarSign className="h-3 w-3" />
                    {jobData.salary}
                  </Badge>
                  <Badge
                    variant="secondary"
                    className="flex items-center gap-1"
                  >
                    <Clock className="h-3 w-3" />
                    {jobData.experience}
                  </Badge>
                </div>
              </div>
              <div className="flex flex-col gap-2 md:items-end mt-4 md:mt-0">
                <Button className="w-full md:w-auto">Apply Now</Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="hidden md:flex"
                >
                  <Share2 className="h-4 w-4" />
                  <span className="sr-only">Share job</span>
                </Button>
              </div>
            </div>
            <div className="flex justify-between items-center mt-6 text-sm text-muted-foreground">
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-1" />
                <span>Posted {jobData.posted}</span>
              </div>
              <div>
                <span className="font-medium">Apply before:</span>{" "}
                {jobData.deadline}
              </div>
            </div>
          </div>

          {/* Job Description */}
          <div className="bg-card rounded-xl p-6 shadow-sm">
            <h2 className="text-xl font-semibold mb-4">Job Description</h2>
            <p className="text-muted-foreground mb-6">{jobData.description}</p>

            <h3 className="text-lg font-semibold mb-3">Responsibilities</h3>
            <ul className="list-disc pl-5 space-y-2 text-muted-foreground mb-6">
              {jobData.responsibilities.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>

            <h3 className="text-lg font-semibold mb-3">Requirements</h3>
            <ul className="list-disc pl-5 space-y-2 text-muted-foreground mb-6">
              {jobData.requirements.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>

            <h3 className="text-lg font-semibold mb-3">Benefits</h3>
            <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
              {jobData.benefits.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>

          {/* Company Info */}
          <div className="bg-card rounded-xl p-6 shadow-sm">
            <h2 className="text-xl font-semibold mb-4">About the Company</h2>
            <div className="flex flex-col md:flex-row gap-4 items-start">
              <img
                src={jobData.companyInfo.logo || "/placeholder.svg"}
                alt={jobData.companyInfo.name}
                width={100}
                height={100}
                className="rounded-lg bg-background p-2"
              />
              <div>
                <h3 className="text-lg font-medium">
                  {jobData.companyInfo.name}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2 text-sm">
                  <div className="flex items-center text-muted-foreground">
                    <Building2 className="h-4 w-4 mr-2" />
                    <span>{jobData.companyInfo.employees} employees</span>
                  </div>
                  <div className="flex items-center text-muted-foreground">
                    <Briefcase className="h-4 w-4 mr-2" />
                    <span>{jobData.companyInfo.industry}</span>
                  </div>
                  <div className="flex items-center text-muted-foreground">
                    <Globe className="h-4 w-4 mr-2" />
                    <span>{jobData.companyInfo.website}</span>
                  </div>
                </div>
                <p className="mt-4 text-muted-foreground">
                  {jobData.companyInfo.about}
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
              to start your journey with {jobData.companyInfo.name}.
            </p>
            <Button className="w-full mb-3">Apply Now</Button>
            <Button
              variant="outline"
              className="w-full flex items-center justify-center gap-2"
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
