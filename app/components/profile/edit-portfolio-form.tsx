import { forwardRef, useRef } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { EditProjectsForm } from "@/components/profile/edit-projects-form"
import { EditPublicationsForm } from "@/components/profile/edit-publications-form"
import type { Project } from "@/types/project"
import type { Publication } from "@/types/publication"

interface EditPortfolioFormProps {
  projects?: Project[];
  publications?: Publication[];
  onSaveProjects?: (projects: Project[]) => Promise<void>;
  onSavePublications?: (publications: Publication[]) => Promise<void>;
  onSubmitSuccess?: () => void;
}

export const EditPortfolioForm = forwardRef<HTMLFormElement, EditPortfolioFormProps>(
  ({ 
    projects = [], 
    publications = [], 
    onSaveProjects, 
    onSavePublications, 
    onSubmitSuccess 
  }, ref) => {
    // Create refs for the nested forms
    const projectsFormRef = useRef<HTMLFormElement>(null);
    const publicationsFormRef = useRef<HTMLFormElement>(null);
    
    // Track which tab is currently active
    const activeTabRef = useRef<string>("projects");

    const handleTabChange = (value: string) => {
      activeTabRef.current = value;
    };

    // When the parent dialog triggers save, submit the appropriate form
    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      
      if (activeTabRef.current === "projects" && projectsFormRef.current) {
        const event = new Event('submit', { bubbles: true, cancelable: true });
        projectsFormRef.current.dispatchEvent(event);
      } else if (activeTabRef.current === "publications" && publicationsFormRef.current) {
        const event = new Event('submit', { bubbles: true, cancelable: true });
        publicationsFormRef.current.dispatchEvent(event);
      }
    };

    return (
      <form ref={ref} onSubmit={handleSubmit}>
        <Tabs defaultValue="projects" className="w-full" onValueChange={handleTabChange}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="projects">Projects</TabsTrigger>
            <TabsTrigger value="publications">Publications</TabsTrigger>
          </TabsList>

          <TabsContent value="projects" className="pt-4">
            <EditProjectsForm 
              ref={projectsFormRef}
              projects={projects} 
              onSave={onSaveProjects}
              onSubmitSuccess={onSubmitSuccess}
            />
          </TabsContent>

          <TabsContent value="publications" className="pt-4">
            <EditPublicationsForm 
              ref={publicationsFormRef}
              publications={publications} 
              onSave={onSavePublications}
              onSubmitSuccess={onSubmitSuccess}
            />
          </TabsContent>
        </Tabs>
        
        {/* Hidden submit button that will be triggered by the dialog's save button */}
        <button type="submit" hidden></button>
      </form>
    )
  }
);

// Add display name for React DevTools
EditPortfolioForm.displayName = "EditPortfolioForm";
