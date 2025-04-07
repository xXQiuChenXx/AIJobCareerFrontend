import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
  Settings,
  ExternalLink,
  Calendar,
  MapPin,
  Clock,
  Briefcase,
  FileText,
  Factory,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import LocationAutocomplete from "../../components/company/location-autocomplete";
import AvatarUpload from "@/components/company/avatar-upload";
import SalaryRangeInput from "../../components/company/salary-range-input";
import { CompanyService } from "@/services/company-service";
import { useAuth } from "@/components/provider/auth-provider";
import { toast } from "sonner";
import { FileService } from "@/services/file-service";
import type { Route } from "../company/+types/company-profile";

const LOCATIONS = [
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
];

export const loader = async ({ params }: { params: { id?: string } }) => {
  try {
    const companyId = params.id || null;
    return { companyId };
  } catch (error) {
    console.error("Error loading company data:", error);
    return { companyId: null, error: "Failed to load company data" };
  }
};

export default function CompanyProfile({ params }: Route.ComponentProps) {
  const { id: companyId } = params;

  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("about");
  const [isEditingAbout, setIsEditingAbout] = useState(false);
  const [isAddingJob, setIsAddingJob] = useState(false);
  const [isEditingJob, setIsEditingJob] = useState(false);
  const [editingJobId, setEditingJobId] = useState<number | null>(null);
  const [avatarUrl, setAvatarUrl] = useState(
    "/placeholder.svg?height=80&width=80"
  );
  const [avatarFileKey, setAvatarFileKey] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const isAdmin = true;

  const [companyInfo, setCompanyInfo] = useState({
    company_id: "",
    company_name: "",
    company_intro: "",
    company_founded: "",
    company_industry: "",
    company_website: "",
    company_icon: "",
    company_area_id: null as number | null,
    area: {
      area_id: 0,
      area_name: "",
    },
  });

  const [jobs, setJobs] = useState([
    {
      id: 1,
      title: "Senior AI Engineer",
      department: "Engineering",
      location: "Kuching",
      posted: "Posted 2 days ago",
      salary: "$120,000 - $180,000",
      description:
        "We're looking for a Senior AI Engineer to join our team and help develop our next generation of AI products.",
      jobType: "Full-time",
      remote: true,
    },
  ]);

  const [newJob, setNewJob] = useState({
    title: "",
    department: "",
    location: "Kuching",
    salary: "",
    description: "",
    jobType: "Full-time",
    remote: false,
  });

  const [editedCompanyInfo, setEditedCompanyInfo] = useState({
    ...companyInfo,
  });
  const [editedJob, setEditedJob] = useState({
    id: 0,
    title: "",
    department: "",
    location: "Kuching",
    salary: "",
    description: "",
    jobType: "Full-time",
    remote: false,
  });

  const [isConfirmingDelete, setIsConfirmingDelete] = useState(false);
  const [jobToDelete, setJobToDelete] = useState<number | null>(null);

  useEffect(() => {
    async function fetchCompanyData() {
      try {
        setIsLoading(true);

        if (!companyId) {
          setError("No company ID available");
          setIsLoading(false);
          return;
        }

        const company = await CompanyService.getCompanyById(companyId);

        setCompanyInfo({
          company_id: company.company_id,
          company_name: company.company_name,
          company_intro: company.company_intro || "",
          company_founded: company.company_founded || "",
          company_industry: company.company_industry || "",
          company_website: company.company_website || "",
          company_icon: company.company_icon || "",
          company_area_id: company.company_area_id,
          area: company.area || { area_id: 0, area_name: "" },
        });

        if (company.company_icon) {
          const iconUrl = FileService.getFileUrl(company.company_icon);
          setAvatarUrl(iconUrl);
          setAvatarFileKey(company.company_icon);
        }

        try {
          const companyWithJobs = await CompanyService.getCompanyJobsById(
            companyId
          );
          if (companyWithJobs.jobs && companyWithJobs.jobs.length > 0) {
            const formattedJobs = companyWithJobs.jobs.map((job) => ({
              id: parseInt(job.job_id),
              title: job.job_title,
              department: "",
              location: "",
              posted: "Posted recently",
              salary:
                job.job_salary_min && job.job_salary_max
                  ? `$${job.job_salary_min} - $${job.job_salary_max}`
                  : "",
              description: job.job_description || "",
              jobType: job.job_type || "Full-time",
              remote: false,
            }));
            setJobs(formattedJobs);
          }
        } catch (jobError) {
          console.error("Error fetching company jobs:", jobError);
        }

        setIsLoading(false);
      } catch (err) {
        console.error("Error fetching company data:", err);
        setError("Failed to load company data");
        setIsLoading(false);
      }
    }

    fetchCompanyData();
  }, [companyId, user]);

  const formatFoundedDate = (dateString: string | undefined) => {
    if (!dateString) return "Not specified";
    
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return dateString; // If not a valid date, return the original string
      
      return new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }).format(date);
    } catch (error) {
      console.error("Error formatting date:", error);
      return dateString; // If any error occurs, return the original string
    }
  };

  const handleEditDialogOpenChange = (open: boolean) => {
    setIsEditingAbout(open);
    if (open) {
      // Initialize the edit form with current company data
      setEditedCompanyInfo({
        ...companyInfo
      });
    }
  };

  const handleSaveCompanyInfo = async () => {
    if (!companyId) {
      toast.error("No company ID available");
      return;
    }

    try {
      // Prepare the update data
      const updatedCompany = {
        company_id: companyId,
        company_name: editedCompanyInfo.company_name,
        company_intro: editedCompanyInfo.company_intro,
        company_website: editedCompanyInfo.company_website,
        company_icon: avatarFileKey, // Use the fileKey from avatar upload
        company_industry: editedCompanyInfo.company_industry,
        company_founded: editedCompanyInfo.company_founded,
        company_area_id: editedCompanyInfo.company_area_id,
      };

      await CompanyService.updateCompany(updatedCompany);
      
      // Update the local state with the new company info
      setCompanyInfo({ ...editedCompanyInfo });
      setIsEditingAbout(false);
      toast.success("Company information updated successfully");
    } catch (err) {
      console.error("Error updating company:", err);
      toast.error("Failed to update company information");
    }
  };

  const handleAvatarChange = async (file: File) => {
    try {
      const response = await FileService.uploadFile(file, "company-icons");
      setAvatarFileKey(response.fileKey);
      const fileUrl = FileService.getFileUrl(response.fileKey);
      setAvatarUrl(fileUrl);
      toast.success("Company logo uploaded successfully");
    } catch (err) {
      console.error("Error uploading avatar:", err);
      toast.error("Failed to upload company logo");
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-red-500 text-xl">{error}</div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50">
      <div className="container mx-auto py-6 px-4 md:px-6 mb-12">
        <div className="w-full bg-white p-4">
          <div className="w-full bg-gradient-to-r from-blue-500 to-pink-500 p-6 relative rounded-lg h-52">
            {isAdmin && (
              <div className="absolute top-4 right-4">
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => setIsEditingAbout(true)}
                >
                  <Settings className="h-4 w-4 mr-2" />
                  Settings
                </Button>
              </div>
            )}
            <div className="absolute bottom-6 left-48 text-white">
              <h1 className="text-4xl font-bold">{companyInfo.company_name}</h1>
            </div>
            <div className="absolute bottom-0 left-10 transform translate-y-1/4">
              <div className="w-32 h-32 rounded-full bg-white p-1 border-2 border-white shadow-lg">
                <div className="w-full h-full rounded-full bg-gray-100 flex items-center justify-center overflow-hidden">
                  <img
                    src={avatarUrl}
                    alt="Company Logo"
                    width={128}
                    height={128}
                    className="object-cover w-full h-full"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full px-4 mt-12">
          <Tabs
            defaultValue="about"
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="about">About</TabsTrigger>
              <TabsTrigger value="jobs">Job Openings</TabsTrigger>
            </TabsList>
            <TabsContent value="about" className="mt-4">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h2 className="text-xl font-bold mb-4">About</h2>
                <p className="text-gray-700 mb-6">
                  {companyInfo.company_intro}
                </p>
                <div className="flex flex-wrap gap-4 mb-6">
                  <Button
                    variant="outline"
                    className="gap-2"
                    onClick={() =>
                      window.open(companyInfo.company_website, "_blank")
                    }
                    disabled={!companyInfo.company_website}
                  >
                    <ExternalLink className="h-4 w-4" />
                    Visit Website
                  </Button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                  <div className="flex items-center gap-3">
                    <Calendar className="h-5 w-5 text-gray-500 mt-0.5" />
                    <div>
                      <h3 className="font-medium">Founded</h3>
                      <p>{formatFoundedDate(companyInfo.company_founded)}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Factory className="h-5 w-5 text-gray-500 mt-0.5" />
                    <div>
                      <h3 className="font-medium">Industry</h3>
                      <p>{companyInfo.company_industry || "Not specified"}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin className="h-5 w-5 text-gray-500 mt-0.5" />
                    <div>
                      <h3 className="font-medium">Location</h3>
                      <p>{companyInfo.area?.area_name || "Not specified"}</p>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="jobs" className="mt-4">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold">
                    Open Positions at {companyInfo.company_name}
                  </h2>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-500">
                      {jobs.length} jobs available
                    </span>
                    {isAdmin && (
                      <Button onClick={() => setIsAddingJob(true)}>Post</Button>
                    )}
                  </div>
                </div>
                <div className="space-y-4">
                  {jobs.map((job) => (
                    <div key={job.id} className="border rounded-lg p-6">
                      <div className="flex justify-between items-start">
                        <h3 className="text-xl font-bold">{job.title}</h3>
                        <div className="text-lg font-semibold">
                          {job.salary}
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-x-6 gap-y-2 mt-3 text-gray-600">
                        <div className="flex items-center gap-1.5">
                          <FileText className="h-4 w-4 text-gray-500" />
                          <span>{job.department}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Briefcase className="h-4 w-4 text-gray-500" />
                          <span>{job.jobType}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <MapPin className="h-4 w-4 text-gray-500" />
                          <span>{job.location}</span>
                        </div>
                        {job.remote && (
                          <div className="bg-gray-100 text-gray-800 px-2 py-0.5 rounded text-sm">
                            Remote
                          </div>
                        )}
                        <div className="flex items-center gap-1.5">
                          <Clock className="h-4 w-4 text-gray-500" />
                          <span>{job.posted}</span>
                        </div>
                      </div>
                      <p className="mt-4 mb-6 text-gray-700">
                        {job.description}
                      </p>
                      {isAdmin && (
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="destructive"
                            size="sm"
                            // onClick={() => handleDeleteJob(job.id)}
                          >
                            Delete Post
                          </Button>
                          <Button
                            variant="outline"
                            // onClick={() => handleEditJob(job.id)}
                          >
                            Edit
                          </Button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
        <Dialog open={isEditingAbout} onOpenChange={handleEditDialogOpenChange}>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Edit Company Information</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <AvatarUpload
                currentAvatar={avatarUrl}
                onAvatarChange={handleAvatarChange}
              />
              <div className="grid gap-2">
                <Label htmlFor="company-name">Company Name</Label>
                <Input
                  id="company-name"
                  value={editedCompanyInfo.company_name}
                  onChange={(e) =>
                    setEditedCompanyInfo({
                      ...editedCompanyInfo,
                      company_name: e.target.value,
                    })
                  }
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="website">Website URL</Label>
                <Input
                  id="website"
                  value={editedCompanyInfo.company_website || ""}
                  onChange={(e) =>
                    setEditedCompanyInfo({
                      ...editedCompanyInfo,
                      company_website: e.target.value,
                    })
                  }
                  placeholder="https://example.com"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={editedCompanyInfo.company_intro || ""}
                  onChange={(e) =>
                    setEditedCompanyInfo({
                      ...editedCompanyInfo,
                      company_intro: e.target.value,
                    })
                  }
                  rows={4}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="founded">Founded</Label>
                  <Input
                    id="founded"
                    value={editedCompanyInfo.company_founded || ""}
                    onChange={(e) =>
                      setEditedCompanyInfo({
                        ...editedCompanyInfo,
                        company_founded: e.target.value,
                      })
                    }
                    placeholder="YYYY-MM-DD"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="industry">Industry</Label>
                  <Input
                    id="industry"
                    value={editedCompanyInfo.company_industry || ""}
                    onChange={(e) =>
                      setEditedCompanyInfo({
                        ...editedCompanyInfo,
                        company_industry: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
              <LocationAutocomplete
                id="company-location"
                label="Location"
                value={editedCompanyInfo.area?.area_name || ""}
                onChange={(value) =>
                  setEditedCompanyInfo({
                    ...editedCompanyInfo,
                    area: { ...editedCompanyInfo.area, area_name: value },
                  })
                }
                locations={LOCATIONS}
              />
            </div>
            <div className="flex justify-end gap-2">
              <Button
                variant="outline"
                onClick={() => setIsEditingAbout(false)}
              >
                Cancel
              </Button>
              <Button onClick={handleSaveCompanyInfo}>Save Changes</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
