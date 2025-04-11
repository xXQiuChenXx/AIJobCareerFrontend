import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Eye } from "lucide-react";
import type { CompleteProfile } from "@/types/user";
import { useRef } from "react";

interface ProfileCompletionSectionProps {
  profile: CompleteProfile;
  isPrivate: boolean;
  profileCompletion: number;
}

const ProfileCompletionSection = ({
  profile,
  isPrivate,
  profileCompletion,
}: ProfileCompletionSectionProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Profile Completion</span>
          {isPrivate && (
            <Badge
              variant="outline"
              className="gap-1 text-amber-600 border-amber-200 bg-amber-50"
            >
              <Eye className="h-3 w-3" />
              Only You
            </Badge>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm">{profileCompletion}% Complete</span>
              <span className="text-sm text-muted-foreground">
                {profileCompletion}/100
              </span>
            </div>
            <Progress value={profileCompletion} className="h-2" />
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div
                  className={`h-2 w-2 rounded-full ${
                    !!profile.basicInfo ? "bg-emerald-500" : "bg-amber-500"
                  }`}
                ></div>
                <span className="text-sm">Basic Info</span>
              </div>
              <span className="text-xs text-muted-foreground">
                {!!profile.basicInfo ? "Complete" : "Incomplete"}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div
                  className={`h-2 w-2 rounded-full ${
                    profile.workExperiences?.length > 0
                      ? "bg-emerald-500"
                      : "bg-amber-500"
                  }`}
                ></div>
                <span className="text-sm">Work Experience</span>
              </div>
              <span className="text-xs text-muted-foreground">
                {profile.workExperiences?.length > 0
                  ? "Complete"
                  : "Incomplete"}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div
                  className={`h-2 w-2 rounded-full ${
                    profile.education?.length > 0
                      ? "bg-emerald-500"
                      : "bg-amber-500"
                  }`}
                ></div>
                <span className="text-sm">Education</span>
              </div>
              <span className="text-xs text-muted-foreground">
                {profile.education?.length > 0 ? "Complete" : "Incomplete"}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div
                  className={`h-2 w-2 rounded-full ${
                    profile.skills?.length > 0
                      ? "bg-emerald-500"
                      : "bg-amber-500"
                  }`}
                ></div>
                <span className="text-sm">Skills</span>
              </div>
              <span className="text-xs text-muted-foreground">
                {profile.skills?.length > 0 ? "Complete" : "Incomplete"}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div
                  className={`h-2 w-2 rounded-full ${
                    profile.projects?.length > 0
                      ? "bg-emerald-500"
                      : "bg-amber-500"
                  }`}
                ></div>
                <span className="text-sm">Portfolio</span>
              </div>
              <span className="text-xs text-muted-foreground">
                {profile.projects?.length > 0 ? "Complete" : "Incomplete"}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-rose-500"></div>
                <span className="text-sm">Recommendations</span>
              </div>
              <span className="text-xs text-muted-foreground">Missing</span>
            </div>
          </div>
          <Button size="sm" className="w-full">
            Complete Your Profile
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfileCompletionSection;
