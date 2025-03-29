import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { Route } from "../applications/+types/application";
import {
  Briefcase,
  Building2,
  ChevronLeft,
  Clock,
  MapPin,
  Upload,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";

// Import the schema and service for job applications
import {
  jobApplicationSchema,
  type JobApplicationFormValues,
} from "@/lib/schemas/application-schema";
import { jobApplicationService } from "@/services/job-application-service";
import { useAuth } from "@/components/provider/auth-provider";
import { type JobDto, JobType } from "@/lib/types/job-application";
import { NavLink } from "react-router";

export default function JobApplicationForm({ params }: Route.ComponentProps) {
  const { id } = params; // Job ID that user is applying for
  const { user } = useAuth();

  // All state hooks
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [resumeError, setResumeError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [jobData, setJobData] = useState<JobDto | null>(null);
  console.log(jobData);

  // Form hook
  const form = useForm<JobApplicationFormValues>({
    resolver: zodResolver(jobApplicationSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      linkedIn: "",
      portfolio: "",
      experience: "",
      education: "",
      skills: "",
      availability: "",
      relocate: false,
      salary: "",
      coverLetter: "",
      termsAccepted: undefined,
    },
  });

  // useEffect hook
  useEffect(() => {
    const fetchJobDetails = async () => {
      if (!id) {
        setError("No job ID provided");
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        const jobDetails = await jobApplicationService.getJobDetails(
          parseInt(id)
        );
        setJobData(jobDetails);
      } catch (error) {
        console.error("Error fetching job details:", error);
        setError("Failed to load job details. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchJobDetails();
  }, [id]);

  // Now we can safely have conditional returns
  if (!user) {
    return <div>Not Found</div>;
  }

  // Format employment type for display
  const formatEmploymentType = (type: JobType | undefined) => {
    if (!type) return "Full-time";

    return type
      .toString()
      .replace(/([A-Z])/g, " $1")
      .trim()
      .toLowerCase()
      .replace(/^./, (str) => str.toUpperCase());
  };

  // Format date for display
  const formatDate = (dateString?: string) => {
    if (!dateString) return "Recently";

    const postedDate = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - postedDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "Yesterday";
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    return `${Math.floor(diffDays / 30)} months ago`;
  };

  // Handle file input change
  const handleResumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setResumeError(null);
    const file = e.target.files?.[0];

    if (!file) {
      setResumeFile(null);
      return;
    }

    // Validate file type
    const allowedExtensions = [".pdf", ".docx", ".doc", ".txt"];
    const fileExtension = file.name
      .substring(file.name.lastIndexOf("."))
      .toLowerCase();

    if (!allowedExtensions.includes(fileExtension)) {
      setResumeError("Invalid file type. Allowed types: PDF, DOCX, DOC, TXT");
      return;
    }

    // Validate file size (5MB max)
    if (file.size > 5 * 1024 * 1024) {
      setResumeError("File size exceeds the 5MB limit");
      return;
    }

    setResumeFile(file);
  };

  async function onSubmit(data: JobApplicationFormValues) {
    setIsSubmitting(true);

    try {
      // Get the current user ID (in a real app, this would come from auth context)
      const userId = user?.userId as string;

      // Create submission DTO
      const submission = {
        ...data,
        userId, // Add the user ID
        jobId: parseInt(id), // Convert string ID to number
        resume: resumeFile || undefined, // Add the resume file if present
      };

      // Submit the application using our service
      const response = await jobApplicationService.submitApplication(
        submission
      );

      console.log("Application submitted successfully:", response);
      setIsSubmitted(true);
      toast("Application Submitted.", {
        description:
          "Thank you for your application. We will be in touch soon.",
      });
    } catch (error) {
      console.error("Failed to submit application:", error);
      toast.error("Submission Failed", {
        description: "You have already applied for this position",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  if (isSubmitted) {
    return (
      <div className="container max-w-4xl py-10 mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="text-center text-2xl">
              Application Submitted
            </CardTitle>
            <CardDescription className="text-center">
              Thank you for applying to the {jobData?.title || "Job Position"}{" "}
              at {jobData?.company?.company_name || "the company"}.
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <p>
              Your application has been received and is being reviewed by our
              hiring team.
            </p>
            <p>We will contact you soon regarding the next steps.</p>
            <NavLink to="/careers">
              <Button className="mt-4">Go back to job listing</Button>
            </NavLink>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container max-w-4xl py-10">
        <Card>
          <CardHeader>
            <CardTitle className="text-center text-2xl text-red-500">
              Error Loading Job
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <p>{error}</p>
            <Button
              onClick={() => (window.location.href = "/careers")}
              className="mt-4"
            >
              Return to Job Listings
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container max-w-4xl py-10 mx-auto">
      <div className="mb-3">
        <NavLink
          to={`/careers/details/${id}`}
          className="flex items-center text-muted-foreground hover:text-primary transition-colors"
        >
          <ChevronLeft className="h-4 w-4 mr-1" />
          Back to job details
        </NavLink>
      </div>
      <Card>
        <CardHeader className="space-y-1">
          {isLoading ? (
            <>
              <Skeleton className="h-8 w-3/4" />
              <div className="flex flex-wrap gap-4 mt-2">
                <Skeleton className="h-5 w-36" />
                <Skeleton className="h-5 w-56" />
                <Skeleton className="h-5 w-28" />
                <Skeleton className="h-5 w-36" />
              </div>
            </>
          ) : (
            <>
              <CardTitle className="text-2xl">Job Application</CardTitle>
              <CardDescription>
                <div className="flex flex-wrap gap-4 mt-2">
                  <div className="flex items-center text-sm">
                    <Building2 className="mr-1 h-4 w-4" />
                    <span>
                      {jobData?.company?.company_name || "Company Name"}
                    </span>
                  </div>
                  <div className="flex items-center text-sm">
                    <MapPin className="mr-1 h-4 w-4" />
                    <span>{jobData?.job_location || "Location"}</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <Briefcase className="mr-1 h-4 w-4" />
                    <span>{formatEmploymentType(jobData?.employmentType)}</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <Clock className="mr-1 h-4 w-4" />
                    <span>Posted {formatDate(jobData?.posted_date)}</span>
                  </div>
                </div>
              </CardDescription>
            </>
          )}
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="mb-6 p-4 bg-muted rounded-lg">
              <Skeleton className="h-6 w-40 mb-2" />
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-5/6 mb-2" />
              <Skeleton className="h-4 w-4/6" />
            </div>
          ) : (
            <div className="mb-6 p-4 bg-muted rounded-lg">
              <h3 className="font-medium mb-2">Job Description</h3>
              <p className="text-sm text-muted-foreground">
                {jobData?.job_description ||
                  "We are looking for an experienced professional to join our team. You will be responsible for key tasks and projects, ensuring high quality deliverables and excellent outcomes."}
              </p>

              {jobData?.requirements && jobData.requirements.length > 0 && (
                <>
                  <h4 className="font-medium mt-4 mb-2">Requirements</h4>
                  <ul className="list-disc pl-5 text-sm text-muted-foreground">
                    {jobData.requirements.map((req, index) => (
                      <li key={index}>{req}</li>
                    ))}
                  </ul>
                </>
              )}

              {jobData?.responsibilities &&
                jobData.responsibilities.length > 0 && (
                  <>
                    <h4 className="font-medium mt-4 mb-2">Responsibilities</h4>
                    <ul className="list-disc pl-5 text-sm text-muted-foreground">
                      {jobData.responsibilities.map((resp, index) => (
                        <li key={index}>{resp}</li>
                      ))}
                    </ul>
                  </>
                )}

              {jobData?.salary && (
                <p className="text-sm font-medium mt-4">
                  Salary Range: {jobData.salary}
                </p>
              )}
            </div>
          )}

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Personal Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>First Name</FormLabel>
                        <FormControl>
                          <Input placeholder="John" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Last Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Doe" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            placeholder="john.doe@example.com"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone Number</FormLabel>
                        <FormControl>
                          <Input placeholder="0123456789" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">
                  Professional Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="linkedIn"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>LinkedIn Profile</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="https://linkedin.com/in/johndoe"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>Optional</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="portfolio"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Portfolio/Website</FormLabel>
                        <FormControl>
                          <Input placeholder="https://johndoe.com" {...field} />
                        </FormControl>
                        <FormDescription>Optional</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="border border-dashed border-muted-foreground/50 rounded-lg p-4 flex flex-col items-center justify-center">
                  <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                  <p className="text-sm font-medium mb-1">Upload your resume</p>
                  <p className="text-xs text-muted-foreground mb-2">
                    PDF, DOCX or TXT (Max 5MB)
                  </p>
                  <input
                    type="file"
                    accept=".pdf,.docx,.doc,.txt"
                    onChange={handleResumeChange}
                    className="hidden"
                    id="resume-upload"
                  />
                  <label htmlFor="resume-upload">
                    <Button type="button" variant="outline" size="sm">
                      Select File
                    </Button>
                  </label>
                  {resumeError && (
                    <p className="text-xs text-red-500 mt-2">{resumeError}</p>
                  )}
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Experience & Education</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="experience"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Years of Experience</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select experience level" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="0-1">0-1 years</SelectItem>
                            <SelectItem value="1-3">1-3 years</SelectItem>
                            <SelectItem value="3-5">3-5 years</SelectItem>
                            <SelectItem value="5-10">5-10 years</SelectItem>
                            <SelectItem value="10+">10+ years</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="education"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Highest Education</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select education level" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="high-school">
                              High School
                            </SelectItem>
                            <SelectItem value="associate">
                              Associate Degree
                            </SelectItem>
                            <SelectItem value="bachelor">
                              Bachelor's Degree
                            </SelectItem>
                            <SelectItem value="master">
                              Master's Degree
                            </SelectItem>
                            <SelectItem value="phd">
                              PhD or Doctorate
                            </SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="skills"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Skills</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="List your relevant skills (e.g., React, TypeScript, CSS, etc.)"
                          className="min-h-[80px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Additional Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="availability"
                    render={({ field }) => (
                      <FormItem className="space-y-3">
                        <FormLabel>When can you start?</FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="flex flex-col space-y-1"
                          >
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="immediately" />
                              </FormControl>
                              <FormLabel className="font-normal">
                                Immediately
                              </FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="2-weeks" />
                              </FormControl>
                              <FormLabel className="font-normal">
                                2 weeks notice
                              </FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="1-month" />
                              </FormControl>
                              <FormLabel className="font-normal">
                                1 month notice
                              </FormLabel>
                            </FormItem>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="salary"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Salary Expectation</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select salary range" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="RM 1.5k - 2k">
                              RM 1,500 - RM 2,000
                            </SelectItem>
                            <SelectItem value="RM 2k - 3k">
                              RM 2,000 - RM 3,000
                            </SelectItem>
                            <SelectItem value="RM 3k - 4k">
                              RM 3,000 - RM 4,000
                            </SelectItem>
                            <SelectItem value="RM 4k - 8k">
                              RM 4,000 - RM 8,000
                            </SelectItem>
                            <SelectItem value="RM 8k+">RM 8,000+</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="relocate"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>Are you willing to relocate?</FormLabel>
                        <FormDescription>
                          This position offers remote work, but occasional
                          on-site meetings may be required.
                        </FormDescription>
                      </div>
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="coverLetter"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Cover Letter</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Tell us why you're interested in this position and why you'd be a good fit."
                        className="min-h-[150px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="termsAccepted"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>I agree to the terms and conditions</FormLabel>
                      <FormDescription>
                        By submitting this application, you agree to our{" "}
                        <a href="#" className="text-primary underline">
                          privacy policy
                        </a>{" "}
                        and{" "}
                        <a href="#" className="text-primary underline">
                          terms of service
                        </a>
                        .
                      </FormDescription>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </form>
          </Form>
        </CardContent>
        <CardFooter>
          <Button
            onClick={form.handleSubmit(onSubmit)}
            className="w-full"
            disabled={isSubmitting || isLoading}
          >
            {isSubmitting ? "Submitting..." : "Submit Application"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
