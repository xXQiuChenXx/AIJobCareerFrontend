import { useState, forwardRef } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Briefcase, Plus, X } from "lucide-react"
import type { WorkExperience } from "@/types/work-experience"
import { WorkExperienceService } from "@/services/work-experience-service"
import { toast } from "sonner"

interface EditExperienceFormProps {
  experiences?: WorkExperience[];
  onSave?: (experiences: WorkExperience[]) => Promise<void>;
  onSubmitSuccess?: () => void;
}

export const EditExperienceForm = forwardRef<HTMLFormElement, EditExperienceFormProps>(
  ({ experiences = [], onSave, onSubmitSuccess }, ref) => {
    const [workExperiences, setWorkExperiences] = useState<WorkExperience[]>(experiences);
    const [newTag, setNewTag] = useState("");
    const [loading, setLoading] = useState(false);
    const [submitting, setSubmitting] = useState(false);

    const formatDateForInput = (dateString?: string): string => {
      if (!dateString) return '';
      // Convert API date format to YYYY-MM for input[type="month"]
      const date = new Date(dateString);
      return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
    };

    const addExperience = () => {
      const newExp: WorkExperience = {
        experience_id: `temp-${Date.now()}`,
        user_id: experiences[0]?.user_id || '',
        job_title: "",
        company_name: "",
        location: "",
        start_date: "",
        end_date: "",
        is_current: false,
        description: "",
        experience_skill: "",
      };
      setWorkExperiences([newExp, ...workExperiences]);
    };

    const removeExperience = async (id: string) => {
      try {
        // Only call API if it's not a temporary ID
        if (!id.startsWith('temp-')) {
          setLoading(true);
          await WorkExperienceService.deleteWorkExperience(id);
          toast.success("Work experience deleted successfully");
        }
        setWorkExperiences(workExperiences.filter((exp) => exp.experience_id !== id));
      } catch (error) {
        console.error("Failed to delete work experience:", error);
        toast.error("Failed to delete work experience");
      } finally {
        setLoading(false);
      }
    };

    const addTag = (experienceId: string) => {
      if (newTag.trim()) {
        const updated = workExperiences.map((exp) => {
          if (exp.experience_id === experienceId) {
            const currentSkills = exp.experience_skill ? exp.experience_skill.split(',') : [];
            const trimmedSkills = currentSkills.map(skill => skill.trim());
            
            // Only add if not already in the list
            if (!trimmedSkills.includes(newTag.trim())) {
              const newSkills = [...trimmedSkills, newTag.trim()].filter(Boolean);
              return { ...exp, experience_skill: newSkills.join(', ') };
            }
          }
          return exp;
        });
        setWorkExperiences(updated);
        setNewTag("");
      }
    };

    const removeTag = (experienceId: string, tagToRemove: string) => {
      const updated = workExperiences.map((exp) => {
        if (exp.experience_id === experienceId) {
          const currentSkills = exp.experience_skill ? exp.experience_skill.split(',') : [];
          const trimmedSkills = currentSkills.map(skill => skill.trim());
          const filteredSkills = trimmedSkills.filter(skill => skill !== tagToRemove);
          return { ...exp, experience_skill: filteredSkills.join(', ') };
        }
        return exp;
      });
      setWorkExperiences(updated);
    };

    // Handle form submission
    const handleSubmit = async (e?: React.FormEvent) => {
      if (e) e.preventDefault();
      
      if (!onSave) return;
      
      try {
        setSubmitting(true);
        await onSave(workExperiences);
        
        // Call the onSubmitSuccess callback to close the dialog
        if (onSubmitSuccess) {
          onSubmitSuccess();
        }
      } catch (error) {
        console.error("Failed to save work experiences:", error);
        toast.error("Failed to save work experiences");
      } finally {
        setSubmitting(false);
      }
    };

    return (
      <div className="space-y-6">
        <Button
          onClick={addExperience}
          className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
          disabled={loading || submitting}
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Experience
        </Button>

        <form ref={ref} onSubmit={handleSubmit}>
          {workExperiences.map((exp) => (
            <div key={exp.experience_id} className="rounded-lg border p-4 mb-6">
              <div className="flex flex-col sm:flex-row justify-between mb-4">
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
                    <Briefcase className="h-5 w-5 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <Input
                      value={exp.job_title}
                      onChange={(e) => {
                        const updated = workExperiences.map((item) =>
                          item.experience_id === exp.experience_id ? { ...item, job_title: e.target.value } : item,
                        );
                        setWorkExperiences(updated);
                      }}
                      placeholder="Job Title"
                      className="border-0 p-0 text-lg font-semibold h-7 focus-visible:ring-0"
                    />
                    <div className="flex flex-wrap items-center mt-1">
                      <div className="flex items-center mr-4 mb-2">
                        <Input
                          value={exp.company_name}
                          onChange={(e) => {
                            const updated = workExperiences.map((item) =>
                              item.experience_id === exp.experience_id ? { ...item, company_name: e.target.value } : item,
                            );
                            setWorkExperiences(updated);
                          }}
                          placeholder="Company"
                          className="border-0 p-0 h-6 w-32 text-sm text-muted-foreground focus-visible:ring-0"
                        />
                      </div>
                      <div className="flex items-center mb-2">
                        <Input
                          value={exp.location}
                          onChange={(e) => {
                            const updated = workExperiences.map((item) =>
                              item.experience_id === exp.experience_id ? { ...item, location: e.target.value } : item,
                            );
                            setWorkExperiences(updated);
                          }}
                          placeholder="Location"
                          className="border-0 p-0 h-6 w-32 text-sm text-muted-foreground focus-visible:ring-0"
                        />
                      </div>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeExperience(exp.experience_id)}
                    className="text-rose-500 hover:text-rose-600 hover:bg-rose-50 mt-2 sm:mt-0"
                    disabled={loading}
                    type="button"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="ml-0 sm:ml-13 space-y-4">
                <div className="flex flex-wrap items-center mt-1">
                  <div className="flex items-center mr-4 mb-2">
                    <Input
                      type="month"
                      value={formatDateForInput(exp.start_date)}
                      onChange={(e) => {
                        const updated = workExperiences.map((item) =>
                          item.experience_id === exp.experience_id 
                            ? { ...item, start_date: new Date(e.target.value).toISOString() } 
                            : item,
                        );
                        setWorkExperiences(updated);
                      }}
                      placeholder="Start Date"
                      className="w-32 text-sm"
                    />
                  </div>
                  {!exp.is_current && (
                    <div className="flex items-center mb-2">
                      <span className="mx-1 text-muted-foreground">-</span>
                      <Input
                        type="month"
                        value={formatDateForInput(exp.end_date)}
                        onChange={(e) => {
                          const updated = workExperiences.map((item) =>
                            item.experience_id === exp.experience_id 
                              ? { ...item, end_date: new Date(e.target.value).toISOString() } 
                              : item,
                          );
                          setWorkExperiences(updated);
                        }}
                        placeholder="End Date"
                        className="w-32 text-sm"
                      />
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <Checkbox
                    id={`current-${exp.experience_id}`}
                    checked={exp.is_current}
                    onCheckedChange={(checked) => {
                      const updated = workExperiences.map((item) =>
                        item.experience_id === exp.experience_id
                          ? { ...item, is_current: checked as boolean, end_date: checked ? undefined : item.end_date }
                          : item,
                      );
                      setWorkExperiences(updated);
                    }}
                  />
                  <Label htmlFor={`current-${exp.experience_id}`} className="text-sm">
                    I currently work here
                  </Label>
                </div>

                <Textarea
                  value={exp.description}
                  onChange={(e) => {
                    const updated = workExperiences.map((item) =>
                      item.experience_id === exp.experience_id ? { ...item, description: e.target.value } : item,
                    );
                    setWorkExperiences(updated);
                  }}
                  placeholder="Describe your responsibilities and achievements..."
                  className="min-h-24 resize-none"
                />

                <div>
                  <Label className="text-sm font-medium">Skills Used</Label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {exp.experience_skill.split(',').filter(Boolean).map((tag, index) => (
                      <Badge key={index} className="flex items-center gap-1 bg-blue-100 text-blue-700 hover:bg-blue-200">
                        {tag.trim()}
                        <button 
                          onClick={() => removeTag(exp.experience_id, tag.trim())} 
                          className="ml-1 rounded-full hover:bg-blue-200"
                          type="button"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    ))}
                    <div className="flex gap-2">
                      <Input
                        placeholder="Add skill"
                        className="h-7 w-32"
                        value={newTag}
                        onChange={(e) => setNewTag(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" && newTag.trim()) {
                            e.preventDefault();
                            addTag(exp.experience_id);
                          }
                        }}
                      />
                      <Button 
                        size="sm" 
                        onClick={() => addTag(exp.experience_id)} 
                        className="h-7"
                        type="button"
                      >
                        Add
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
          
          {/* Hidden submit button that will be triggered by the dialog's save button */}
          <button type="submit" hidden></button>
        </form>
      </div>
    )
  }
)

// Add display name for React DevTools
EditExperienceForm.displayName = "EditExperienceForm";

