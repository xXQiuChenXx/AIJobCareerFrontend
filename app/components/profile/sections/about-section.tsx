import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Building2,
  Calendar,
  EyeOff,
  FileText,
  Lock,
  MapPin,
} from "lucide-react";
import { EditSectionDialog } from "../edit-section-dialog";
import { EditAboutForm } from "../edit-about-form";
import type { BasicInfo, CompleteProfile } from "@/types/user";
import { useRef, useState, type RefObject } from "react";

interface AboutSectionProps {
  profile: CompleteProfile;
  isPrivate: boolean;
  isAdmin: boolean;
  handleSaveBasicInfo: (data: Partial<BasicInfo>) => Promise<void>;
  userInitials: string;
}

const AboutSection = ({
  isPrivate,
  profile,
  isAdmin,
  handleSaveBasicInfo,
  userInitials,
}: AboutSectionProps) => {
  const formRef = useRef<HTMLFormElement>(null);
  const [open, setOpen] = useState(false);
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between text-2xl">
          <div className="flex items-center">
            <span>About Me</span>
            {isPrivate && (
              <Badge
                variant="outline"
                className="ml-2 gap-1 text-amber-600 border-amber-200 bg-amber-50"
              >
                <EyeOff className="h-3 w-3" />
                Private
              </Badge>
            )}
          </div>
          <EditSectionDialog
            title="About Me"
            open={open}
            setOpen={setOpen}
            description="Update your personal information"
            formRef={formRef as RefObject<HTMLFormElement>}
          >
            <EditAboutForm
              userInitials={userInitials}
              profile={profile.basicInfo}
              onSave={handleSaveBasicInfo}
              onSubmitSuccess={() => setOpen(false)}
              ref={formRef}
            />
          </EditSectionDialog>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {isPrivate && !isAdmin ? (
          <div className="flex flex-col items-center justify-center py-6 text-center">
            <div className="mb-4 rounded-full bg-amber-100 p-3">
              <Lock className="h-6 w-6 text-amber-600" />
            </div>
            <h3 className="text-lg font-medium">This information is private</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              The account owner has set this profile to private.
            </p>
          </div>
        ) : !profile.basicInfo ? (
          <div className="flex flex-col items-center justify-center py-6 text-center">
            <div className="mb-4 rounded-full bg-blue-100 p-3">
              <FileText className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="text-lg font-medium">
              Add information about yourself
            </h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Click the edit button to add your personal information.
            </p>
          </div>
        ) : (
          <>
            <p className="text-muted-foreground">
              {profile.basicInfo.intro || "No introduction added yet."}
            </p>
            <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span>
                  {profile.basicInfo.location || "Location not specified"}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Building2 className="h-4 w-4 text-muted-foreground" />
                <span>
                  {(profile.workExperiences &&
                    profile.workExperiences.find((exp) => exp.is_current)
                      ?.company_name) ||
                    "Not specified"}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span>
                  {profile.basicInfo.account_created_time
                    ? `Joined ${new Date(
                        profile.basicInfo.account_created_time
                      ).toLocaleDateString("en-US", {
                        month: "long",
                        year: "numeric",
                      })}`
                    : "Join date unknown"}
                </span>
              </div>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default AboutSection;
