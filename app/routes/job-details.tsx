import { jobData } from "@/sample-data/job-details";
import type { Route } from "./+types/job-details";

const JobDetailPage = ({ params }: Route.ComponentProps) => {
  const { id } = params;

  return <div>JobDetailPage for {id}</div>;
};

export default JobDetailPage;
