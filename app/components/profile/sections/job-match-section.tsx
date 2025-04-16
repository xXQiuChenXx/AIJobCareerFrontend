import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const JobMatchSection = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Job Match Score</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-center">
          <div className="relative h-32 w-32">
            <svg className="h-full w-full" viewBox="0 0 100 100">
              <circle
                className="stroke-muted-foreground/20"
                cx="50"
                cy="50"
                r="40"
                fill="transparent"
                strokeWidth="10"
              />
              <circle
                className="stroke-primary"
                cx="50"
                cy="50"
                r="40"
                fill="transparent"
                strokeWidth="10"
                strokeDasharray="251.2"
                strokeDashoffset="50.24"
                transform="rotate(-90 50 50)"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-3xl font-bold">80%</span>
            </div>
          </div>
        </div>
        <div className="mt-4 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm">Management Accountant</span>
            <span className="text-sm font-medium">92% match</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm">Accounting Supervisor</span>
            <span className="text-sm font-medium">88% match</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm">Accounting Manager</span>
            <span className="text-sm font-medium">75% match</span>
          </div>
        </div>
        {/* <Button size="sm" className="mt-4 w-full">
          View All Matches
        </Button> */}
      </CardContent>
    </Card>
  );
};

export default JobMatchSection;
