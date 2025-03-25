import { useState, forwardRef } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Plus, Trash2, X } from "lucide-react"
import type { Project } from "@/types/project"
import { ProjectService } from "@/services/project-service"
import { toast } from "sonner"

interface EditProjectsFormProps {
  projects?: Project[];
  onSave?: (projects: Project[]) => Promise<void>;
  onSubmitSuccess?: () => void;
}

export const EditProjectsForm = forwardRef<HTMLFormElement, EditProjectsFormProps>(
  ({ projects = [], onSave, onSubmitSuccess }, ref) => {
    const [projectsList, setProjectsList] = useState<Project[]>(projects);
    const [loading, setLoading] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [tags, setTags] = useState<Record<string, string[]>>({});
    const [newTag, setNewTag] = useState("");

    const addProject = () => {
      const newProj: Project = {
        project_id: `temp-${Date.now()}`,
        user_id: projects[0]?.user_id || '',
        project_name: "",
        project_year: new Date().getFullYear(),
        description: "",
        project_url: "",
      };
      setProjectsList([newProj, ...projectsList]);
    };

    const removeProject = async (id: string) => {
      try {
        // Only call API if it's not a temporary ID
        if (!id.startsWith('temp-')) {
          setLoading(true);
          await ProjectService.deleteProject(id);
          toast.success("Project deleted successfully");
        }
        setProjectsList(projectsList.filter((proj) => proj.project_id !== id));
        
        // Also clean up tags
        const newTags = { ...tags };
        delete newTags[id];
        setTags(newTags);
      } catch (error) {
        console.error("Failed to delete project:", error);
        toast.error("Failed to delete project");
      } finally {
        setLoading(false);
      }
    };

    const addTag = (projectId: string) => {
      if (newTag.trim()) {
        const currentTags = tags[projectId] || [];
        if (!currentTags.includes(newTag.trim())) {
          setTags({
            ...tags,
            [projectId]: [...currentTags, newTag.trim()]
          });
        }
        setNewTag("");
      }
    };

    const removeTag = (projectId: string, tag: string) => {
      const currentTags = tags[projectId] || [];
      setTags({
        ...tags,
        [projectId]: currentTags.filter(t => t !== tag)
      });
    };

    // Handle form submission
    const handleSubmit = async (e?: React.FormEvent) => {
      if (e) e.preventDefault();
      
      try {
        setSubmitting(true);
        
        // If custom onSave is provided, use that
        if (onSave) {
          await onSave(projectsList);
        } 
        // Otherwise save directly to API
        else {
          for (const project of projectsList) {
            if (project.project_id.startsWith('temp-')) {
              // Create new project
              const { project_id, ...newProject } = project;
              await ProjectService.createProject(newProject);
            } else {
              // Update existing project
              await ProjectService.updateProject(project.project_id, project);
            }
          }
        }
        
        // Call the onSubmitSuccess callback to close the dialog
        if (onSubmitSuccess) {
          onSubmitSuccess();
        }
      } catch (error) {
        console.error("Failed to save projects:", error);
        toast.error("Failed to save projects");
      } finally {
        setSubmitting(false);
      }
    };

    return (
      <div className="space-y-4">
        <Button
          onClick={addProject}
          className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
          disabled={loading || submitting}
          type="button"
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Project
        </Button>

        <form ref={ref} onSubmit={handleSubmit}>
          <div className="grid gap-4 sm:grid-cols-2">
            {projectsList.map((project) => (
              <div key={project.project_id} className="rounded-lg border p-4">
                <div className="flex justify-between mb-2">
                  <div className="flex-1">
                    <Input
                      value={project.project_name}
                      onChange={(e) => {
                        const updated = projectsList.map((item) =>
                          item.project_id === project.project_id ? { ...item, project_name: e.target.value } : item,
                        );
                        setProjectsList(updated);
                      }}
                      placeholder="Project Name"
                      className="border-0 p-0 text-lg font-semibold h-7 focus-visible:ring-0"
                    />
                    <div className="flex items-center mt-1">
                      <Input
                        value={project.project_year.toString()}
                        onChange={(e) => {
                          const updated = projectsList.map((item) =>
                            item.project_id === project.project_id ? 
                              { ...item, project_year: parseInt(e.target.value) || new Date().getFullYear() } : item,
                          );
                          setProjectsList(updated);
                        }}
                        placeholder="Year"
                        className="border-0 p-0 h-6 w-16 text-sm text-muted-foreground focus-visible:ring-0"
                      />
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeProject(project.project_id)}
                    className="text-rose-500 hover:text-rose-600 hover:bg-rose-50"
                    disabled={loading}
                    type="button"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
                <Textarea
                  value={project.description}
                  onChange={(e) => {
                    const updated = projectsList.map((item) =>
                      item.project_id === project.project_id ? { ...item, description: e.target.value } : item,
                    );
                    setProjectsList(updated);
                  }}
                  placeholder="Describe your project, its purpose, and your role..."
                  className="min-h-20 resize-none mt-2"
                />
                <div className="mt-3">
                  <label className="text-sm font-medium">Project URL</label>
                  <Input
                    value={project.project_url}
                    onChange={(e) => {
                      const updated = projectsList.map((item) =>
                        item.project_id === project.project_id ? { ...item, project_url: e.target.value } : item,
                      );
                      setProjectsList(updated);
                    }}
                    placeholder="https://example.com/project"
                    className="mt-1"
                  />
                </div>
                <div className="mt-4">
                  <label className="text-sm font-medium">Technologies Used</label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {(tags[project.project_id] || []).map((tag, index) => (
                      <Badge key={index} className="flex items-center gap-1 bg-green-100 text-green-700 hover:bg-green-200">
                        {tag}
                        <button 
                          onClick={() => removeTag(project.project_id, tag)} 
                          className="ml-1 rounded-full hover:bg-green-200"
                          type="button"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    ))}
                    <div className="flex gap-2">
                      <Input
                        placeholder="Add technology"
                        className="h-7 w-32"
                        value={newTag}
                        onChange={(e) => setNewTag(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" && newTag.trim()) {
                            e.preventDefault();
                            addTag(project.project_id);
                          }
                        }}
                      />
                      <Button 
                        size="sm" 
                        onClick={() => addTag(project.project_id)} 
                        className="h-7"
                        type="button"
                      >
                        Add
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            
            {projectsList.length === 0 && (
              <div className="col-span-2 text-center py-6 text-muted-foreground border rounded-lg">
                No projects yet. Add your first project to showcase your work!
              </div>
            )}
          </div>
          
          {/* Hidden submit button that will be triggered by the dialog's save button */}
          <button type="submit" hidden></button>
        </form>
      </div>
    )
  }
)

// Add display name for React DevTools
EditProjectsForm.displayName = "EditProjectsForm";

