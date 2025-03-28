import { useState, useEffect, forwardRef } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Trash2, X } from "lucide-react";
import type { Project } from "@/types/project";
import { ProjectService } from "@/services/project-service";
import { toast } from "sonner";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  projectsFormSchema,
  type ProjectFormValues,
  type ProjectsFormValues,
} from "@/lib/schemas/project-schema";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

interface EditProjectsFormProps {
  projects?: Project[];
  onSave: (projects: ProjectFormValues[]) => Promise<void>;
  onSubmitSuccess?: () => void;
}

export const EditProjectsForm = forwardRef<
  HTMLFormElement,
  EditProjectsFormProps
>(({ projects = [], onSave, onSubmitSuccess }, ref) => {
  const [loading, setLoading] = useState(false);
  const [newTag, setNewTag] = useState("");

  // Initialize form with React Hook Form
  const form = useForm<ProjectsFormValues>({
    resolver: zodResolver(projectsFormSchema),
    defaultValues: {
      projects: projects.map((project) => ({
        project_id: project.project_id,
        user_id: project.user_id,
        project_name: project.project_name,
        project_year: project.project_year,
        description: project.description || "",
        project_url: project.project_url || "",
      })),
    },
  });

  // Use field array to manage dynamic projects list
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "projects",
  });

  const addProject = () => {
    append({
      project_id: `temp-${Date.now()}`,
      user_id: projects[0]?.user_id || "",
      project_name: "",
      project_year: new Date().getFullYear(),
      description: "",
      project_url: "",
    });
  };

  const removeProject = async (index: number, id: string) => {
    try {
      // Only call API if it's not a temporary ID
      if (!id.startsWith("temp-")) {
        setLoading(true);
        await ProjectService.deleteProject(id);
        toast.success("Project deleted successfully");
      }

      // Remove from form field array
      remove(index);
    } catch (error) {
      console.error("Failed to delete project:", error);
      toast.error("Failed to delete project");
    } finally {
      setLoading(false);
    }
  };
  // Handle form submission
  const onSubmit = async (data: ProjectsFormValues) => {
    try {
      setLoading(true);

      // Add tags to each project before saving
      const projectsWithTags = data.projects.map((project) => ({
        ...project,
      }));

      await onSave(projectsWithTags);
      toast.success("Projects saved successfully");

      // Call the onSubmitSuccess callback to close the dialog
      if (onSubmitSuccess) {
        onSubmitSuccess();
      }
    } catch (error) {
      console.error("Failed to save projects:", error);
      toast.error("Failed to save projects");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <Button
        onClick={addProject}
        className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
        disabled={loading}
        type="button"
      >
        <Plus className="mr-2 h-4 w-4" />
        Add Project
      </Button>

      <Form {...form}>
        <form ref={ref} onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid gap-4">
            {fields.map((field, index) => (
              <div key={field.id} className="rounded-lg border p-4">
                <div className="flex justify-between mb-2">
                  <div className="flex-1">
                    <FormField
                      control={form.control}
                      name={`projects.${index}.project_name`}
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              {...field}
                              placeholder="Project Name"
                              className="border-0 p-0 text-lg font-semibold h-7 focus-visible:ring-0"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div className="flex items-center mt-1">
                      <FormField
                        control={form.control}
                        name={`projects.${index}.project_year`}
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input
                                {...field}
                                type="number"
                                placeholder="Year"
                                className="border-0 p-0 h-6 w-16 text-sm text-muted-foreground focus-visible:ring-0"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeProject(index, field.project_id)}
                    className="text-rose-500 hover:text-rose-600 hover:bg-rose-50"
                    disabled={loading}
                    type="button"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>

                <FormField
                  control={form.control}
                  name={`projects.${index}.description`}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Textarea
                          {...field}
                          placeholder="Describe your project, its purpose, and your role..."
                          className="min-h-20 resize-none mt-2"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="mt-3">
                  <label className="text-sm font-medium">Project URL</label>
                  <FormField
                    control={form.control}
                    name={`projects.${index}.project_url`}
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="https://example.com/project"
                            className="mt-1"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            ))}

            {fields.length === 0 && (
              <div className="col-span-2 text-center py-6 text-muted-foreground border rounded-lg">
                No projects yet. Add your first project to showcase your work!
              </div>
            )}
          </div>
        </form>
      </Form>
    </div>
  );
});

// Add display name for React DevTools
EditProjectsForm.displayName = "EditProjectsForm";
