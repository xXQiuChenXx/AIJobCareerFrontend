import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ThumbsUp } from "lucide-react";
import type { CompleteProfile } from "@/types/user";

interface EndorsementsSectionProps {
  profile: CompleteProfile;
}

const EndorsementsSection = ({ profile }: EndorsementsSectionProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Endorsements</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {profile.skills?.slice(0, 5).map((skill) => (
            <div
              key={skill.skill_id}
              className="flex items-center justify-between"
            >
              <span>{skill.skill_name}</span>
              <div className="flex items-center gap-1">
                <ThumbsUp className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium">
                  {Math.floor(Math.random() * 30) + 1}
                </span>
              </div>
            </div>
          ))}

          {profile.skills?.length === 0 && (
            <div className="text-center py-6 text-muted-foreground">
              No endorsements yet.
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default EndorsementsSection;
