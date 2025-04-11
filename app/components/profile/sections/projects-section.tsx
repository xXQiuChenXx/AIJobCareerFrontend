import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { ExternalLinkIcon, EyeOff, FileText, Lock } from "lucide-react";
import { EditSectionDialog } from "../edit-section-dialog";
import { EditProjectsForm } from "../edit-projects-form";
import type { CompleteProfile } from "@/types/user";
import { useRef, useState, type RefObject } from "react";
import { type ProjectFormValues } from "@/lib/schemas/project-schema";
import { NavLink } from "react-router";
import { Button } from "@/components/ui/button";

interface ProjectsSectionProps {
  profile: CompleteProfile;
  isPrivate: boolean;
  isAdmin: boolean;
  handleSaveProjects: (projects: ProjectFormValues[]) => Promise<void>;
}

const ProjectsSection = ({
  profile,
  isPrivate,
  isAdmin,
  handleSaveProjects,
}: ProjectsSectionProps) => {
  const formRef = useRef<HTMLFormElement>(null);
  const [open, setOpen] = useState(false);
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between text-2xl">
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
            open={open}
            setOpen={setOpen}
            description="Update your portfolio projects"
            formRef={formRef as RefObject<HTMLFormElement>}
          >
            <EditProjectsForm
              ref={formRef}
              projects={profile.projects || []}
              onSave={handleSaveProjects}
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
              <Card key={project.project_id} className="gap-3">
                <CardHeader>
                  <CardTitle>{project.project_name}</CardTitle>
                  <CardDescription>{project.project_year}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    {project.description}
                  </p>
                  {project.project_url && (
                    <NavLink
                      to={project.project_url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button variant="outline" className="mt-3 w-full">
                        <ExternalLinkIcon className="h-2 w-2" />
                        View project
                      </Button>
                    </NavLink>
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
