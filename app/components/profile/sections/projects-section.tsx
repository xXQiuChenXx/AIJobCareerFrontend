import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { EyeOff, FileText, Lock } from "lucide-react";
import { EditSectionDialog } from "../edit-section-dialog";
import { EditPortfolioForm } from "../edit-portfolio-form";
import type { CompleteProfile } from "@/types/user";
import type { Project } from "@/types/project";
import { useRef, type RefObject } from "react";

interface ProjectsSectionProps {
  profile: CompleteProfile;
  isPrivate: boolean;
  handleSaveProjects?: (projects: Project[]) => Promise<void>;
}

const ProjectsSection = ({
  profile,
  isPrivate,
  handleSaveProjects,
}: ProjectsSectionProps) => {
  const formRef = useRef<HTMLFormElement>(null);
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center">
            <span>Projects</span>
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
            title="Projects"
            description="Update your portfolio projects"
            formRef={formRef as RefObject<HTMLFormElement>}
          >
            <EditPortfolioForm
              ref={formRef}
              projects={profile.projects || []}
              publications={profile.publications || []}
              onSaveProjects={handleSaveProjects}
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
            <h3 className="text-lg font-medium">Projects are private</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              The account owner has set this profile to private.
            </p>
          </div>
        ) : profile.projects?.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-6 text-center">
            <div className="mb-4 rounded-full bg-blue-100 p-3">
              <FileText className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="text-lg font-medium">Add your projects</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Click the edit button to add your portfolio projects.
            </p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2">
            {profile.projects.map((project) => (
              <Card key={project.project_id}>
                <CardHeader className="p-4">
                  <CardTitle className="text-base">
                    {project.project_name}
                  </CardTitle>
                  <CardDescription>{project.project_year}</CardDescription>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <p className="text-sm text-muted-foreground">
                    {project.description}
                  </p>
                  {project.project_url && (
                    <a
                      href={project.project_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-2 inline-block text-sm text-primary hover:underline"
                    >
                      View project
                    </a>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ProjectsSection;
