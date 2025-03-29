import { useState, forwardRef } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { X } from "lucide-react"
import type { Skill, CreateSkillDTO } from "@/types/skill"
import { SkillService } from "@/services/skill-service"
import { toast } from "sonner"

// Define the skill proficiency levels
type ProficiencyLevel = "beginner" | "intermediate" | "proficient" | "advanced" | "expert"

// Helper function to get a human-readable label for the level
const getLevelLabel = (level: string): string => {
  return level.charAt(0).toUpperCase() + level.slice(1);
}

interface EditSkillsFormProps {
  skills?: Skill[];
  onSave?: (skills: Skill[]) => Promise<void>;
  onSubmitSuccess?: () => void;
}

export const EditSkillsForm = forwardRef<HTMLFormElement, EditSkillsFormProps>(
  ({ skills = [], onSave, onSubmitSuccess }, ref) => {
    const [skillsList, setSkillsList] = useState<Skill[]>(skills);
    const [skillTags, setSkillTags] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);
    const [submitting, setSubmitting] = useState(false);

    const [newSkill, setNewSkill] = useState("");
    const [newSkillLevel, setNewSkillLevel] = useState<ProficiencyLevel>("intermediate");
    const [newSkillType, setNewSkillType] = useState("");
    const [newSkillInfo, setNewSkillInfo] = useState("");
    const [newTag, setNewTag] = useState("");

    const addSkill = () => {
      if (newSkill.trim()) {
        // Create a new skill with a temporary ID
        const newSkillItem: Skill = {
          skill_id: -Date.now(), // Temporary ID until saved to API (negative to distinguish from real IDs)
          skill_name: newSkill,
          skill_level: newSkillLevel,
        };
        setSkillsList([...skillsList, newSkillItem]);
        setNewSkill("");
        setNewSkillLevel("intermediate");
        setNewSkillType("");
        setNewSkillInfo("");
      }
    };

    const removeSkill = async (id: number) => {
      try {
        // Only call API if it's a real ID (not a temporary one)
        if (id > 0) {
          setLoading(true);
          await SkillService.deleteSkill(id);
          toast.success("Skill removed");
        }
        setSkillsList(skillsList.filter((skill) => skill.skill_id !== id));
      } catch (error) {
        console.error("Failed to delete skill:", error);
        toast.error("Failed to delete skill");
      } finally {
        setLoading(false);
      }
    };

    const addTag = () => {
      if (newTag.trim() && !skillTags.includes(newTag)) {
        setSkillTags([...skillTags, newTag]);
        setNewTag("");
      }
    };

    const removeTag = (tag: string) => {
      setSkillTags(skillTags.filter((t) => t !== tag));
    };

    // Handle form submission
    const handleSubmit = async (e?: React.FormEvent) => {
      if (e) e.preventDefault();
      
      try {
        setSubmitting(true);
        
        // If custom onSave is provided, use that
        if (onSave) {
          await onSave(skillsList);
        } 
        // Otherwise save directly to API
        else {
          for (const skill of skillsList) {
            if (skill.skill_id < 0) {
              // This is a temporary ID, create a new skill
              const skillData: CreateSkillDTO = {
                skill_name: skill.skill_name,
                skill_level: skill.skill_level,
              };
              await SkillService.createSkill(skillData);
            } else {
              // Update existing skill
              const skillData: CreateSkillDTO = {
                skill_name: skill.skill_name,
                skill_level: skill.skill_level,
              };
              await SkillService.updateSkill(skill.skill_id, skillData);
            }
          }
        }
        
        // Call the onSubmitSuccess callback to close the dialog
        if (onSubmitSuccess) {
          onSubmitSuccess();
        }
        
        toast.success("Skills saved successfully");
      } catch (error) {
        console.error("Failed to save skills:", error);
        toast.error("Failed to save skills");
      } finally {
        setSubmitting(false);
      }
    };

    return (
      <div className="space-y-6">
        <form ref={ref} onSubmit={handleSubmit}>
          <div>
            <h3 className="text-lg font-medium mb-4">Skill Proficiency</h3>
            <div className="space-y-4">
              {skillsList.map((skill) => (
                <div key={skill.skill_id} className="flex items-center gap-4">
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{skill.skill_name}</span>
                      <span className="text-sm text-muted-foreground">{getLevelLabel(skill.skill_level)}</span>
                    </div>
                    <Select
                      defaultValue={skill.skill_level.toLowerCase()}
                      onValueChange={(value: string) => {
                        const updated = skillsList.map((s) =>
                          s.skill_id === skill.skill_id ? { ...s, skill_level: value } : s,
                        );
                        setSkillsList(updated);
                      }}
                    >
                      <SelectTrigger className="h-8">
                        <SelectValue placeholder="Select level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="beginner">Beginner</SelectItem>
                        <SelectItem value="intermediate">Intermediate</SelectItem>
                        <SelectItem value="proficient">Proficient</SelectItem>
                        <SelectItem value="advanced">Advanced</SelectItem>
                        <SelectItem value="expert">Expert</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeSkill(skill.skill_id)}
                    className="text-rose-500 hover:text-rose-600 hover:bg-rose-50"
                    disabled={loading || submitting}
                    type="button"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>

            <div className="mt-4 flex flex-col gap-2">
              <Input
                placeholder="Add a new skill"
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
              />
              <div className="flex flex-col sm:flex-row gap-2">
                <Select 
                  defaultValue={newSkillLevel} 
                  onValueChange={(value) => setNewSkillLevel(value as ProficiencyLevel)}
                >
                  <SelectTrigger className="w-full sm:w-[140px]">
                    <SelectValue placeholder="Select level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="beginner">Beginner</SelectItem>
                    <SelectItem value="intermediate">Intermediate</SelectItem>
                    <SelectItem value="proficient">Proficient</SelectItem>
                    <SelectItem value="advanced">Advanced</SelectItem>
                    <SelectItem value="expert">Expert</SelectItem>
                  </SelectContent>
                </Select>
                <Input
                  placeholder="Skill type (optional)"
                  value={newSkillType}
                  onChange={(e) => setNewSkillType(e.target.value)}
                />
              </div>
              <Textarea
                placeholder="Skill information (optional)"
                value={newSkillInfo}
                onChange={(e) => setNewSkillInfo(e.target.value)}
                rows={3}
              />
              <Button
                type="button"
                onClick={addSkill}
                className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 mt-2"
                disabled={loading || submitting}
              >
                Add Skill
              </Button>
            </div>
          </div>

          <div className="border-t pt-4 mt-6">
            <h3 className="text-lg font-medium mb-4">Skill Tags</h3>
            <div className="flex flex-wrap gap-2 mb-4">
              {skillTags.map((tag) => (
                <Badge
                  key={tag}
                  className="flex items-center gap-1 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700"
                >
                  {tag}
                  <button 
                    onClick={() => removeTag(tag)} 
                    className="ml-1 rounded-full hover:bg-white/20"
                    type="button"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
            </div>
            <div className="flex flex-col sm:flex-row gap-2">
              <Input
                placeholder="Add a new tag"
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                className="flex-1"
              />
              <Button
                type="button"
                onClick={addTag}
                className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                disabled={loading || submitting}
              >
                Add Tag
              </Button>
            </div>
          </div>
          
          {/* Hidden submit button that will be triggered by the dialog's save button */}
          <button type="submit" hidden></button>
        </form>
      </div>
    )
  }
)

// Add display name for React DevTools
EditSkillsForm.displayName = "EditSkillsForm";

