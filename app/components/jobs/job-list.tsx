import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import JobCard from "./job-card";
import JobDialog, { type JobData } from "./job-dialog";
import type { JobFormValues } from "@/lib/schemas/company-schema";
import DeleteConfirmDialog from "./delete-confirm-dialog";
import { CompanyService } from "@/services/company-service";
import { type JobBasicDTO } from "@/types/job";

interface JobListProps {
  jobs: JobBasicDTO[];
  companyId: string;
  companyName: string;
  isAdmin: boolean;
  onJobsChange: (jobs: JobBasicDTO[]) => void;
}

const NoJobsAvailable = ({ companyName }: { companyName: string }) => (
  <div className="text-center py-12">
    <Briefcase className="h-12 w-12 mx-auto text-gray-300 mb-4" />
    <h3 className="text-lg font-medium mb-2">No Open Positions</h3>
    <p className="text-gray-500">
      {companyName} doesn't have any job openings at the moment.
    </p>
  </div>
);

import { Briefcase } from "lucide-react";
import { toast } from "sonner";

export default function JobList({
  jobs,
  companyId,
  companyName,
  isAdmin,
  onJobsChange,
}: JobListProps) {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentJob, setCurrentJob] = useState<JobBasicDTO | null>(null);
  const [jobToDelete, setJobToDelete] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleAddJob = async (data: JobFormValues) => {
    try {
      setIsLoading(true);

      // Prepare job data for API
      const newJobData = {
        job_title: data.job_title,
        job_description: data.job_description,
        job_requirement: data.job_requirement,
        job_benefit: data.job_benefit,
        job_responsible: data.job_responsible,
        job_type: data.job_type,
        job_salary_min: data.job_salary_min,
        job_salary_max: data.job_salary_max,
        job_location: data.job_location,
        job_company_id: companyId,
        job_status: "Open",
        job_deadline: data.job_deadline
          ? data.job_deadline.toISOString()
          : undefined,
      };

      // Create job via API
      const createdJob = await CompanyService.createJob(newJobData);

      // Update the jobs list with the new job
      const newJob: JobBasicDTO = {
        job_id: createdJob.job_id,
        job_title: createdJob.job_title,
        job_description: createdJob.job_description,
        job_type: createdJob.job_type,
        job_salary_min: createdJob.job_salary_min,
        job_salary_max: createdJob.job_salary_max,
        job_location: createdJob.job_location,
        job_posted_date: createdJob.posted_date,
        job_deadline: createdJob.job_deadline,
      };

      onJobsChange([...jobs, newJob]);

      return Promise.resolve();
    } catch (error) {
      console.error("Error adding job:", error);
      return Promise.reject(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditJob = async (data: JobFormValues) => {
    if (!currentJob) return Promise.reject("No job selected");

    try {
      setIsLoading(true);

      // Prepare job data for API
      const updatedJobData = {
        job_id: currentJob.job_id,
        job_title: data.job_title,
        job_description: data.job_description,
        job_requirement: data.job_requirement,
        job_benefit: data.job_benefit,
        job_responsible: data.job_responsible,
        job_type: data.job_type,  
        job_salary_min: data.job_salary_min,
        job_salary_max: data.job_salary_max,
        job_location: data.job_location,
        job_company_id: companyId,
        job_status: "Open",
        Posted_Date: currentJob.job_posted_date,
        job_deadline: data.job_deadline
          ? data.job_deadline.toISOString()
          : undefined,
      };

      // Update job via API
      await CompanyService.updateJob(currentJob.job_id, updatedJobData);

      // Update the jobs list
      const updatedJobs = jobs.map((job) =>
        job.job_id === currentJob.job_id
          ? {
              ...job,
              job_title: data.job_title,
              job_description: data.job_description,
              job_type: data.job_type,
              job_salary_min: data.job_salary_min,
              job_salary_max: data.job_salary_max,
              job_location: data.job_location,
              job_deadline: data.job_deadline
                ? data.job_deadline.toISOString()
                : undefined,
            }
          : job
      );

      onJobsChange(updatedJobs);
      setCurrentJob(null);

      return Promise.resolve();
    } catch (error) {
      console.error("Error updating job:", error);
      return Promise.reject(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteJob = async () => {
    if (jobToDelete === null) return;

    try {
      setIsLoading(true);

      // Delete job via API
      await CompanyService.deleteJob(jobToDelete);

      // Remove the job from the list
      const updatedJobs = jobs.filter((job) => job.job_id !== jobToDelete);
      onJobsChange(updatedJobs);

      toast("Job deleted successfully");
    } catch (error) {
      console.error("Error deleting job:", error);
      toast("Failed to delete job");
    } finally {
      setIsLoading(false);
      setJobToDelete(null);
      setIsDeleteDialogOpen(false);
    }
  };

  const openEditDialog = (job: JobBasicDTO) => {
    setCurrentJob(job);
    setIsEditDialogOpen(true);
  };

  const openDeleteDialog = (jobId: number) => {
    setJobToDelete(jobId);
    setIsDeleteDialogOpen(true);
  };

  // Ensure the convertToJobData function accounts for possible missing job_deadline
  const convertToJobData = (job: JobBasicDTO): JobData => ({
    job_id: job.job_id,
    job_title: job.job_title,
    job_description: job.job_description,
    job_type: job.job_type,
    job_salary_min: job.job_salary_min,
    job_salary_max: job.job_salary_max,
    job_location: job.job_location,
    job_posted_date: job.job_posted_date,
    job_deadline: job.job_deadline,
  });

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">Open Positions at {companyName}</h2>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500">
            {jobs.length} jobs available
          </span>
          {isAdmin && (
            <Button
              onClick={() => setIsAddDialogOpen(true)}
              disabled={isLoading}
            >
              <Plus className="h-4 w-4 mr-1" />
              Post Job
            </Button>
          )}
        </div>
      </div>

      {jobs.length === 0 ? (
        <NoJobsAvailable companyName={companyName} />
      ) : (
        <div className="space-y-4">
          {jobs.map((job) => (
            <JobCard
              key={job.job_id}
              job={convertToJobData(job)}
              onEdit={() => openEditDialog(job)}
              onDelete={() => openDeleteDialog(job.job_id)}
              isAdmin={isAdmin}
            />
          ))}
        </div>
      )}

      {/* Add Job Dialog */}
      <JobDialog
        open={isAddDialogOpen}
        onOpenChange={setIsAddDialogOpen}
        onSubmit={handleAddJob}
        title="Post New Job"
        description="Fill in the details for the new job posting."
        submitLabel="Post Job"
        companyId={companyId}
      />

      {/* Edit Job Dialog */}
      {currentJob && (
        <JobDialog
          open={isEditDialogOpen}
          onOpenChange={setIsEditDialogOpen}
          initialData={currentJob ? convertToJobData(currentJob) : null}
          onSubmit={handleEditJob}
          title="Edit Job"
          description="Update the job posting details."
          submitLabel="Save Changes"
          companyId={companyId}
        />
      )}

      {/* Delete Confirmation Dialog */}
      <DeleteConfirmDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        onConfirm={handleDeleteJob}
        title="Delete Job"
        description="Are you sure you want to delete this job posting? This action cannot be undone."
      />
    </div>
  );
}
