import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { EyeOff, FileText, Lock } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { EditSectionDialog } from "../edit-section-dialog";
import { EditSkillsForm } from "../edit-skills-form";
import type { CompleteProfile } from "@/types/user";
import type { Skill } from "@/types/skill";
import { useRef, useState, type RefObject } from "react";

interface SkillsSectionProps {
  profile: CompleteProfile;
  isAdmin: boolean;
  isPrivate: boolean;
  handleSaveSkills?: (skills: Skill[]) => Promise<void>;
}

// Helper function to get percentage equivalent for progress bars
const getLevelPercentage = (level: string): number => {
  const percentages: Record<string, number> = {
    beginner: 20,
    intermediate: 40,
    proficient: 60,
    advanced: 80,
    expert: 100,
  };
  return percentages[level.toLowerCase()] || 50;
};

const SkillsSection = ({
  profile,
  isPrivate,
  isAdmin,
  handleSaveSkills,
}: SkillsSectionProps) => {
  const formRef = useRef<HTMLFormElement>(null);
  const [open, setOpen] = useState(false);
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between text-2xl">
          <div className="flex items-center">
            <span>Skills</span>
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
            title="Skills"
            description="Update your skills and expertise"
            formRef={formRef as RefObject<HTMLFormElement>}
          >
            <EditSkillsForm
              skills={profile.skills || []}
              onSave={handleSaveSkills}
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
            <h3 className="text-lg font-medium">Skills are private</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              The account owner has set this profile to private.
            </p>
          </div>
        ) : profile.skills?.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-6 text-center">
            <div className="mb-4 rounded-full bg-blue-100 p-3">
              <FileText className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="text-lg font-medium">Add your skills</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Click the edit button to add your skills and expertise.
            </p>
          </div>
        ) : (
          <>
            <div className="space-y-4">
              {profile.skills.map((skill) => (
                <div key={skill.skill_id} className="mb-4">
                  <div className="flex justify-between mb-1">
                    <span className="font-medium">{skill.skill_name}</span>
                    <span className="text-sm text-muted-foreground">
                      {skill.skill_level}
                    </span>
                  </div>
                  <Progress
                    value={getLevelPercentage(skill.skill_level.toLowerCase())}
                    className="h-2 bg-blue-100"
                  />
                </div>
              ))}
            </div>
            <div className="mt-6 flex flex-wrap gap-2">
              {profile.workExperiences
                ?.flatMap((exp) =>
                  exp.experience_skill?.split(",").map((skill) => skill.trim())
                )
                .filter(
                  (value, index, self) => self.indexOf(value) === index && value
                )
                .map((skill, index) => (
                  <Badge key={index} className="bg-blue-500 hover:bg-blue-600">
                    {skill}
                  </Badge>
                ))}
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default SkillsSection;
