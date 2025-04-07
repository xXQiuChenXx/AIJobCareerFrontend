import { Button } from "@/components/ui/button";
import { Briefcase, Clock, MapPin, Pencil, Trash2 } from "lucide-react";
import type { JobData } from "@/components/jobs/job-dialog";
import { jobTypeMap } from "@/lib/schemas/company-schema";

interface JobCardProps {
  job: JobData;
  onEdit: (job: JobData) => void;
  onDelete: (jobId: number) => void;
  isAdmin: boolean;
}

// Helper function to format the date
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

export default function JobCard({
  job,
  onEdit,
  onDelete,
  isAdmin,
}: JobCardProps) {
  return (
    <div className="border rounded-lg p-6">
      <div className="flex justify-between items-start">
        <h3 className="text-xl font-bold">{job.job_title}</h3>
        <div className="text-lg font-semibold">{`RM ${job.job_salary_min} - RM ${job.job_salary_max}`}</div>
      </div>
      <div className="flex flex-wrap gap-x-6 gap-y-2 mt-3 text-gray-600">
        <div className="flex items-center gap-1.5">
          <Briefcase className="h-4 w-4 text-gray-500" />
          <span>{jobTypeMap[job.job_type as keyof typeof jobTypeMap]}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <MapPin className="h-4 w-4 text-gray-500" />
          <span>{job.job_location}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Clock className="h-4 w-4 text-gray-500" />
          <span>{formatDate(job.job_posted_date)}</span>
        </div>
      </div>
      <p className="mt-4 mb-6 text-gray-700">{job.job_description}</p>
      {isAdmin && (
        <div className="flex justify-end gap-2">
          <Button
            variant="destructive"
            size="sm"
            onClick={() => onDelete(job.job_id)}
          >
            <Trash2 className="h-4 w-4 mr-1" />
            Delete
          </Button>
          <Button variant="outline" size="sm" onClick={() => onEdit(job)}>
            <Pencil className="h-4 w-4 mr-1" />
            Edit
          </Button>
        </div>
      )}
    </div>
  );
}
