import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GraduationCap, EyeOff, FileText, Lock } from "lucide-react";
import { EditSectionDialog } from "../edit-section-dialog";
import { EditEducationForm } from "../edit-education-form";
import type { CompleteProfile } from "@/types/user";
import { useRef, useState, type RefObject } from "react";
import type { EducationFormValues } from "@/lib/schemas/education-schema";

interface EducationSectionProps {
  profile: CompleteProfile;
  isPrivate: boolean;
  isAdmin: boolean;
  handleSaveEducation: (education: EducationFormValues[]) => Promise<void>;
}

const EducationSection = ({
  profile,
  isPrivate,
  isAdmin,
  handleSaveEducation,
}: EducationSectionProps) => {
  const formRef = useRef<HTMLFormElement>(null);
  const [open, setOpen] = useState(false);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between text-2xl">
          <div className="flex items-center">
            <span>Education</span>
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
            open={open}
            setOpen={setOpen}
            title="Education"
            description="Update your educational background"
            formRef={formRef as RefObject<HTMLFormElement>}
          >
            <EditEducationForm
              ref={formRef}
              educations={profile.education || []}
              onSaveEducation={handleSaveEducation}
              onSubmitSuccess={() => setOpen(false)}
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
            <h3 className="text-lg font-medium">Education is private</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              The account owner has set this profile to private.
            </p>
          </div>
        ) : profile.education?.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-6 text-center">
            <div className="mb-4 rounded-full bg-blue-100 p-3">
              <FileText className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="text-lg font-medium">Add your education</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Click the edit button to add your educational background.
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {profile.education.map((edu) => (
              <div key={edu.education_id} className="flex gap-4">
                <div className="mt-1 flex-shrink-0">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-100">
                    <GraduationCap className="h-5 w-5 text-purple-600" />
                  </div>
                </div>
                <div className="space-y-1">
                  <h3 className="font-semibold">{edu.degree_name}</h3>
                  <div className="text-sm text-muted-foreground">
                    {edu.institution_name}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {edu.start_year} - {edu.end_year || "Present"}
                  </div>
                  <p className="mt-2 text-sm">{edu.description}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default EducationSection;
