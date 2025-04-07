import { useState, useEffect } from "react";
import { CompanyService } from "@/services/company-service";
import { type CompanyWithJobsDTO } from "@/types/job";
import JobList from "@/components/jobs/job-list";
import EditProfileDialog from "@/components/profile/edit-profile-dialog";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import { format } from "date-fns";
import { Skeleton } from "@/components/ui/skeleton";

interface CompanyProfileProps {
  companyId: string;
  isAdmin: boolean;
}

export default function CompanyProfile({
  companyId,
  isAdmin,
}: CompanyProfileProps) {
  const [company, setCompany] = useState<CompanyWithJobsDTO | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState<boolean>(false);

  useEffect(() => {
    const fetchCompanyData = async () => {
      try {
        setIsLoading(true);
        const data = await CompanyService.getCompanyWithJobs(companyId);
        setCompany(data);
        setIsError(false);
      } catch (error) {
        console.error("Error fetching company data:", error);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    if (companyId) {
      fetchCompanyData();
    }
  }, [companyId]);

  const handleProfileUpdate = (updatedData: any) => {
    if (company) {
      setCompany({
        ...company,
        ...updatedData,
      });
    }
  };

  const handleJobsUpdate = (updatedJobs: any[]) => {
    if (company) {
      setCompany({
        ...company,
        Jobs: updatedJobs,
      });
    }
  };

  if (isLoading) {
    return <CompanyProfileSkeleton />;
  }

  if (isError || !company) {
    return (
      <div className="text-center py-12">Failed to load company profile</div>
    );
  }

  return (
    <div className="container mx-auto py-8 space-y-8">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex justify-between items-start">
          <div className="flex items-center space-x-4">
            <div className="relative w-24 h-24 rounded-full overflow-hidden border-2 border-gray-200">
              {company.company_icon ? (
                <img
                  src={CompanyService.getCompanyLogoUrl(company.company_icon)}
                  alt={company.company_name}
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                  <span className="text-gray-400">
                    {company.company_name.substring(0, 2).toUpperCase()}
                  </span>
                </div>
              )}
            </div>
            <div>
              <h1 className="text-2xl font-bold">{company.company_name}</h1>
              <p className="text-gray-500">{company.company_industry}</p>
            </div>
          </div>

          {isAdmin && (
            <Button
              onClick={() => setIsEditDialogOpen(true)}
              variant="outline"
              size="sm"
            >
              <Pencil className="h-4 w-4 mr-1" />
              Edit Profile
            </Button>
          )}
        </div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h2 className="text-lg font-semibold mb-3">About</h2>
            <p className="text-gray-700">{company.company_intro}</p>
          </div>

          <div className="space-y-2">
            <div className="flex">
              <span className="text-gray-500 w-24">Website:</span>
              <a
                href={company.company_website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                {company.company_website}
              </a>
            </div>
            {company.company_founded && (
              <div className="flex">
                <span className="text-gray-500 w-24">Founded:</span>
                <span>
                  {format(new Date(company.company_founded), "MMMM yyyy")}
                </span>
              </div>
            )}
            {company.company_area_name && (
              <div className="flex">
                <span className="text-gray-500 w-24">Location:</span>
                <span>{company.company_area_name}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      <JobList
        jobs={company.Jobs || []}
        companyId={company.company_id}
        companyName={company.company_name}
        isAdmin={isAdmin}
        onJobsChange={handleJobsUpdate}
      />

      <EditProfileDialog
        open={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
        // @ts-ignore
        companyData={company}
        onUpdate={handleProfileUpdate}
      />
    </div>
  );
}

function CompanyProfileSkeleton() {
  return (
    <div className="container mx-auto py-8 space-y-8">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex justify-between items-start">
          <div className="flex items-center space-x-4">
            <Skeleton className="w-24 h-24 rounded-full" />
            <div>
              <Skeleton className="h-8 w-48" />
              <Skeleton className="h-4 w-32 mt-2" />
            </div>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Skeleton className="h-6 w-24 mb-3" />
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-3/4" />
          </div>

          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-2/3" />
            <Skeleton className="h-4 w-1/2" />
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm">
        <div className="flex justify-between items-center mb-6">
          <Skeleton className="h-6 w-48" />
          <Skeleton className="h-4 w-24" />
        </div>

        <div className="space-y-4">
          <Skeleton className="h-32 w-full" />
          <Skeleton className="h-32 w-full" />
        </div>
      </div>
    </div>
  );
}
