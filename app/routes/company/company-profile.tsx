import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Calendar, ExternalLink, Factory, MapPin, Settings } from 'lucide-react';
import EditProfileDialog from "@/components/profile/edit-profile-dialog";
import JobList from "@/components/jobs/job-list";
import type { JobBasicDTO, CompanyWithJobsDTO } from "@/types/job";
import { useAuth } from "@/components/provider/auth-provider";
import type { Route } from "../company/+types/company-profile";
import { CompanyService } from "@/services/company-service";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";
import { format } from "date-fns";

export default function CompanyProfile({ params }: Route.ComponentProps) {
  const { id: companyId } = params;
  const { user } = useAuth();
  const [companyInfo, setCompanyInfo] = useState<CompanyWithJobsDTO | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("about");
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const isAdmin = companyId === user?.user_company_id;

  // Fetch company data on mount
  useEffect(() => {
    const fetchCompanyData = async () => {
      try {
        setLoading(true);
        const data = await CompanyService.getCompanyWithJobs(companyId);
        setCompanyInfo(data);
        setError(null);
      } catch (err) {
        console.error("Failed to fetch company data:", err);
        setError("Failed to load company information");
        toast("Failed to load company information");
      } finally {
        setLoading(false);
      }
    };

    fetchCompanyData();
  }, [companyId]);

  const handleUpdateCompany = async (updatedData: CompanyWithJobsDTO) => {
    try {
      await CompanyService.updateCompany(companyId, {
        company_name: updatedData.company_name,
        company_icon: updatedData.company_icon,
        company_intro: updatedData.company_intro,
        company_website: updatedData.company_website,
        company_founded: updatedData.company_founded,
        company_industry: updatedData.company_industry,
        company_area_name: updatedData.company_area_name,
      });
      setCompanyInfo(updatedData);
      toast("Company profile updated successfully");
    } catch (err) {
      console.error("Failed to update company data:", err);
      toast("Failed to update company profile");
    } finally {
      setIsEditDialogOpen(false);
    }
  };

  const handleUpdateJobs = (updatedJobs: JobBasicDTO[]) => {
    if (companyInfo) {
      setCompanyInfo({
        ...companyInfo,
        jobs: updatedJobs,
      });
    }
  };

  // Display loading state
  if (loading) {
    return <CompanyProfileSkeleton />;
  }

  // Display error state
  if (error || !companyInfo) {
    return (
      <div className="container mx-auto py-12 text-center">
        <h2 className="text-2xl font-bold text-red-500 mb-2">Error</h2>
        <p className="mb-4">{error || "Company information not available"}</p>
        <Button variant="outline" onClick={() => window.location.reload()}>
          Try Again
        </Button>
      </div>
    );
  }

  const companyLogoUrl = companyInfo.company_icon
    ? companyInfo.company_icon
    : "/profile/company.png";

  return (
    <div className="bg-gray-50">
      <div className="container mx-auto py-4 sm:py-6 px-2 sm:px-4 md:px-6 mb-8 sm:mb-12">
        <div className="w-full bg-white p-4 rounded-lg shadow-sm">
          <div className="w-full bg-gradient-to-r from-blue-500 to-pink-500 p-6 relative rounded-lg h-40 sm:h-52">
            {isAdmin && (
              <div className="absolute top-4 right-4">
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => setIsEditDialogOpen(true)}
                >
                  <Settings className="h-4 w-4 sm:mr-2" />
                  <span className="hidden sm:inline">Settings</span>
                </Button>
              </div>
            )}
            <div className="absolute bottom-6 left-24 sm:left-48 text-white">
              <h1 className="text-xl sm:text-4xl font-bold text-ellipsis">{companyInfo.company_name}</h1>
            </div>
            <div className="absolute bottom-0 left-4 sm:left-10 transform translate-y-1/4">
              <div className="w-20 h-20 sm:w-32 sm:h-32 rounded-full bg-white p-1 border-2 border-white shadow-lg">
                <div className="w-full h-full rounded-full bg-gray-100 flex items-center justify-center overflow-hidden">
                  <img
                    src={companyLogoUrl || "/placeholder.svg"}
                    alt={`${companyInfo.company_name} Logo`}
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
              <TabsTrigger value="about" className="text-sm sm:text-base">About</TabsTrigger>
              <TabsTrigger value="jobs" className="text-sm sm:text-base">Job Openings</TabsTrigger>
            </TabsList>
            <TabsContent value="about" className="mt-4">
              <div className="bg-white p-4 sm:p-6 rounded-lg shadow-sm">
                <h2 className="text-lg sm:text-xl font-bold mb-4">About</h2>
                <p className="text-sm sm:text-base text-gray-700 mb-6">
                  {companyInfo.company_intro}
                </p>
                <div className="flex flex-wrap gap-4 mb-6">
                  <Button
                    variant="outline"
                    className="gap-2 text-xs sm:text-sm"
                    onClick={() =>
                      window.open(companyInfo.company_website, "_blank")
                    }
                    disabled={!companyInfo.company_website}
                  >
                    <ExternalLink className="h-3 w-3 sm:h-4 sm:w-4" />
                    Visit Website
                  </Button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mt-6 sm:mt-8">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <Calendar className="h-4 w-4 sm:h-5 sm:w-5 text-gray-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <h3 className="text-sm sm:text-base font-medium">Founded</h3>
                      <p className="text-xs sm:text-sm">
                        {format(
                          new Date(companyInfo.company_founded),
                          "d MMMM yyyy"
                        )}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 sm:gap-3">
                    <Factory className="h-4 w-4 sm:h-5 sm:w-5 text-gray-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <h3 className="text-sm sm:text-base font-medium">Industry</h3>
                      <p className="text-xs sm:text-sm">{companyInfo.company_industry || "Not specified"}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 sm:gap-3">
                    <MapPin className="h-4 w-4 sm:h-5 sm:w-5 text-gray-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <h3 className="text-sm sm:text-base font-medium">Location</h3>
                      <p className="text-xs sm:text-sm">{companyInfo.company_area_name || "Not specified"}</p>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="jobs" className="mt-4">
              <JobList
                jobs={companyInfo.jobs || []}
                companyId={companyId}
                companyName={companyInfo.company_name}
                isAdmin={isAdmin}
                onJobsChange={handleUpdateJobs}
              />
            </TabsContent>
          </Tabs>
        </div>
      </div>

      <EditProfileDialog
        open={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
        companyData={companyInfo}
        onUpdate={handleUpdateCompany}
      />
    </div>
  );
}

// Skeleton loader component for loading state
function CompanyProfileSkeleton() {
  return (
    <div className="bg-gray-50">
      <div className="container mx-auto py-4 sm:py-6 px-2 sm:px-4 md:px-6 mb-8 sm:mb-12">
        <div className="w-full bg-white p-4 rounded-lg shadow-sm">
          <div className="w-full bg-gradient-to-r from-blue-500 to-pink-500 p-6 relative rounded-lg h-40 sm:h-52">
            <div className="absolute bottom-0 left-4 sm:left-10 transform translate-y-1/4">
              <div className="w-20 h-20 sm:w-32 sm:h-32 rounded-full bg-white p-1">
                <Skeleton className="w-full h-full rounded-full" />
              </div>
            </div>
          </div>
        </div>
        <div className="w-full px-2 sm:px-4 mt-8 sm:mt-12">
          <Skeleton className="h-8 sm:h-10 w-full mb-4" />
          <div className="bg-white p-4 sm:p-6 rounded-lg shadow-sm">
            <Skeleton className="h-6 sm:h-8 w-36 mb-4" />
            <Skeleton className="h-3 sm:h-4 w-full mb-2" />
            <Skeleton className="h-3 sm:h-4 w-full mb-2" />
            <Skeleton className="h-3 sm:h-4 w-3/4 mb-6" />

            <Skeleton className="h-8 sm:h-10 w-32 mb-6" />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mt-6 sm:mt-8">
              <div className="flex items-center gap-2 sm:gap-3">
                <Skeleton className="h-4 sm:h-5 w-4 sm:w-5" />
                <div>
                  <Skeleton className="h-3 sm:h-4 w-20 mb-1" />
                  <Skeleton className="h-2 sm:h-3 w-32" />
                </div>
              </div>
              <div className="flex items-center gap-2 sm:gap-3">
                <Skeleton className="h-4 sm:h-5 w-4 sm:w-5" />
                <div>
                  <Skeleton className="h-3 sm:h-4 w-20 mb-1" />
                  <Skeleton className="h-2 sm:h-3 w-32" />
                </div>
              </div>
              <div className="flex items-center gap-2 sm:gap-3">
                <Skeleton className="h-4 sm:h-5 w-4 sm:w-5" />
                <div>
                  <Skeleton className="h-3 sm:h-4 w-20 mb-1" />
                  <Skeleton className="h-2 sm:h-3 w-32" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
