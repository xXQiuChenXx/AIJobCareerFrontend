import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Briefcase, EyeOff, FileText, Lock } from "lucide-react";
import { EditSectionDialog } from "../edit-section-dialog";
import { EditExperienceForm } from "../edit-experience-form";
import type { CompleteProfile } from "@/types/user";
import type { WorkExperience } from "@/types/work-experience";
import { useRef, useState, type RefObject } from "react";

interface ExperienceSectionProps {
  profile: CompleteProfile;
  isPrivate: boolean;
  handleSaveWorkExperiences: (experiences: WorkExperience[]) => Promise<void>;
}

// Helper function to format dates
const formatDate = (dateString?: string): string => {
  if (!dateString) return "";
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", { year: "numeric", month: "short" });
};

const ExperienceSection = ({
  profile,
  isPrivate,
  handleSaveWorkExperiences,
}: ExperienceSectionProps) => {
  const formRef = useRef<HTMLFormElement>(null);
  const [open, setOpen] = useState(false);
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between text-2xl">
          <div className="flex items-center">
            <span>Work Experience</span>
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
            title="Work Experience"
            description="Update your professional experience"
            formRef={formRef as RefObject<HTMLFormElement>}
          >
            <EditExperienceForm
              ref={formRef}
              experiences={profile.workExperiences || []}
              onSave={handleSaveWorkExperiences}
            />
          </EditSectionDialog>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {isPrivate ? (
          <div className="flex flex-col items-center justify-center py-6 text-center">
            <div className="mb-4 rounded-full bg-amber-100 p-3">
              <Lock className="h-6 w-6 text-amber-600" />
            </div>
            <h3 className="text-lg font-medium">Work history is private</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              The account owner has set this profile to private.
            </p>
          </div>
        ) : profile.workExperiences?.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-6 text-center">
            <div className="mb-4 rounded-full bg-blue-100 p-3">
              <FileText className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="text-lg font-medium">Add your work experience</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Click the edit button to add your professional experience.
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {profile.workExperiences.map((exp) => (
              <div key={exp.experience_id} className="flex gap-4">
                <div className="mt-1 flex-shrink-0">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
                    <Briefcase className="h-5 w-5 text-blue-600" />
                  </div>
                </div>
                <div className="space-y-1">
                  <h3 className="font-semibold">{exp.job_title}</h3>
                  <div className="text-sm text-muted-foreground">
                    {exp.company_name}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {formatDate(exp.start_date)} -{" "}
                    {exp.is_current ? "Present" : formatDate(exp.end_date)} ·{" "}
                    {exp.location}
                  </div>
                  <p className="mt-2 text-sm">{exp.description}</p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {exp.experience_skill.split(",").map((skill, idx) => (
                      <Badge key={idx} variant="outline">
                        {skill.trim()}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ExperienceSection;
