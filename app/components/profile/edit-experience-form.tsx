import { useState, forwardRef, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Briefcase, Plus, X, CalendarIcon } from "lucide-react";
import type { WorkExperience } from "@/types/work-experience";
import { WorkExperienceService } from "@/services/work-experience-service";
import { toast } from "sonner";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  workExperienceFormSchema,
  type WorkExperienceFormData,
  type WorkExperienceFormValues,
} from "@/lib/schemas/work-experience-schema";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";

interface EditExperienceFormProps {
  experiences?: WorkExperience[];
  onSave?: (experiences: WorkExperienceFormValues[]) => Promise<void>;
  onSubmitSuccess?: () => void;
}

export const EditExperienceForm = forwardRef<
  HTMLFormElement,
  EditExperienceFormProps
>(({ experiences = [], onSave, onSubmitSuccess }, ref) => {
  const [newTag, setNewTag] = useState("");
  const [loading, setLoading] = useState(false);

  // Initialize form with react-hook-form and zod
  const form = useForm<WorkExperienceFormData>({
    resolver: zodResolver(workExperienceFormSchema),
    defaultValues: {
      experiences: experiences.map((exp) => ({
        ...exp,
        // Ensure proper format for date fields
        start_date: exp.start_date,
        end_date: exp.end_date || "",
      })),
    },
  });

  // Update form values when experiences prop changes
  useEffect(() => {
    form.reset({
      experiences: experiences.map((exp) => ({
        ...exp,
        start_date: exp.start_date,
        end_date: exp.end_date || "",
      })),
    });
  }, [experiences, form]);

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "experiences",
  });

  const formatDateForInput = (dateString?: string): string => {
    if (!dateString) return "";
    // Convert API date format to YYYY-MM for input[type="month"]
    const date = new Date(dateString);
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
      2,
      "0"
    )}`;
  };

  const formatDateForDisplay = (dateString?: string): string => {
    if (!dateString) return "";
    return format(new Date(dateString), "MMM yyyy");
  };

  const addExperience = () => {
    append({
      experience_id: `temp-${Date.now()}`,
      job_title: "",
      company_name: "",
      location: "",
      start_date: "",
      end_date: "",
      is_current: false,
      description: "",
      experience_skill: "",
    });
  };

  const removeExperience = async (index: number, id?: string) => {
    try {
      // Only call API if it has an ID and not a temporary ID
      if (id && !id.startsWith("temp-")) {
        setLoading(true);
        await WorkExperienceService.deleteWorkExperience(id);
        toast.success("Work experience deleted successfully");
      }
      remove(index);
    } catch (error) {
      console.error("Failed to delete work experience:", error);
      toast.error("Failed to delete work experience");
    } finally {
      setLoading(false);
    }
  };

  const addTag = (index: number) => {
    if (newTag.trim()) {
      const currentValue = form.getValues(
        `experiences.${index}.experience_skill`
      );
      const currentSkills = currentValue ? currentValue.split(",") : [];
      const trimmedSkills = currentSkills.map((skill) => skill.trim());

      // Only add if not already in the list
      if (!trimmedSkills.includes(newTag.trim())) {
        const newSkills = [...trimmedSkills, newTag.trim()].filter(Boolean);
        form.setValue(
          `experiences.${index}.experience_skill`,
          newSkills.join(", ")
        );
      }
      setNewTag("");
    }
  };

  const removeTag = (index: number, tagToRemove: string) => {
    const currentValue = form.getValues(
      `experiences.${index}.experience_skill`
    );
    const currentSkills = currentValue ? currentValue.split(",") : [];
    const trimmedSkills = currentSkills.map((skill) => skill.trim());
    const filteredSkills = trimmedSkills.filter(
      (skill) => skill !== tagToRemove
    );
    form.setValue(
      `experiences.${index}.experience_skill`,
      filteredSkills.join(", ")
    );
  };

  // Handle form submission
  const handleSubmit = async (formData: WorkExperienceFormData) => {
    if (!onSave) return;

    try {
      setLoading(true);

      // Transform formData to WorkExperience array for saving
      const transformedExperiences: WorkExperienceFormValues[] =
        formData.experiences.map((exp) => ({
          ...exp,
        }));

      await onSave(transformedExperiences);

      // Call the onSubmitSuccess callback to close the dialog
      if (onSubmitSuccess) {
        onSubmitSuccess();
      }

      toast.success("Work experiences saved successfully");
    } catch (error) {
      console.error("Failed to save work experiences:", error);
      toast.error("Failed to save work experiences");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <Button
        onClick={addExperience}
        className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
        disabled={loading}
        type="button"
      >
        <Plus className="mr-2 h-4 w-4" />
        Add Experience
      </Button>

      <Form {...form}>
        <form
          ref={ref}
          onSubmit={form.handleSubmit(handleSubmit)}
          className="space-y-6"
        >
          {fields.map((field, index) => (
            <div key={field.id} className="rounded-lg border p-4 mb-6">
              <div className="flex flex-col sm:flex-row justify-between mb-4">
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
                    <Briefcase className="h-5 w-5 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <FormField
                      control={form.control}
                      name={`experiences.${index}.job_title`}
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              {...field}
                              placeholder="Job Title"
                              className="border-0 p-0 text-lg font-semibold h-7 focus-visible:ring-0"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div className="flex flex-wrap items-center mt-1">
                      <div className="flex items-center mr-4 mb-2">
                        <FormField
                          control={form.control}
                          name={`experiences.${index}.company_name`}
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <Input
                                  {...field}
                                  placeholder="Company"
                                  className="border-0 p-0 h-6 w-32 text-sm text-muted-foreground focus-visible:ring-0"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <div className="flex items-center mb-2">
                        <FormField
                          control={form.control}
                          name={`experiences.${index}.location`}
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <Input
                                  {...field}
                                  placeholder="Location"
                                  className="border-0 p-0 h-6 w-32 text-sm text-muted-foreground focus-visible:ring-0"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() =>
                      removeExperience(index, (field as any).experience_id)
                    }
                    className="text-rose-500 hover:text-rose-600 hover:bg-rose-50 mt-2 sm:mt-0"
                    disabled={loading}
                    type="button"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="ml-0 sm:ml-13 space-y-4">
                <div>
                  <div className="flex flex-wrap items-center mt-1">
                    <div className="flex items-center mr-4 mb-2">
                      <FormField
                        control={form.control}
                        name={`experiences.${index}.start_date`}
                        render={({ field }) => (
                          <FormItem className="flex flex-col">
                            <FormLabel className="text-xs text-muted-foreground">
                              Start Date
                            </FormLabel>
                            <Popover>
                              <PopoverTrigger asChild>
                                <FormControl>
                                  <Button
                                    variant="outline"
                                    className="w-36 pl-3 text-left font-normal"
                                  >
                                    {field.value ? (
                                      formatDateForDisplay(field.value)
                                    ) : (
                                      <span className="text-muted-foreground">Pick a date</span>
                                    )}
                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                  </Button>
                                </FormControl>
                              </PopoverTrigger>
                              <PopoverContent className="w-auto p-0" align="start">
                                <Calendar
                                  mode="single"
                                  selected={field.value ? new Date(field.value) : undefined}
                                  onSelect={(date) => field.onChange(date ? date.toISOString() : "")}
                                  disabled={(date) => date > new Date()}
                                  initialFocus
                                />
                              </PopoverContent>
                            </Popover>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    {!form.watch(`experiences.${index}.is_current`) && (
                      <div className="flex items-center mb-2 ml-2">
                        <FormField
                          control={form.control}
                          name={`experiences.${index}.end_date`}
                          render={({ field }) => (
                            <FormItem className="flex flex-col">
                              <FormLabel className="text-xs text-muted-foreground">
                                End Date
                              </FormLabel>
                              <Popover>
                                <PopoverTrigger asChild>
                                  <FormControl>
                                    <Button
                                      variant="outline"
                                      className="w-36 pl-3 text-left font-normal"
                                    >
                                      {field.value ? (
                                        formatDateForDisplay(field.value)
                                      ) : (
                                        <span className="text-muted-foreground">Pick a date</span>
                                      )}
                                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                    </Button>
                                  </FormControl>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0" align="start">
                                  <Calendar
                                    mode="single"
                                    selected={field.value ? new Date(field.value) : undefined}
                                    onSelect={(date) => field.onChange(date ? date.toISOString() : "")}
                                    disabled={(date) => date > new Date()}
                                    initialFocus
                                  />
                                </PopoverContent>
                              </Popover>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    )}
                  </div>

                  <FormField
                    control={form.control}
                    name={`experiences.${index}.is_current`}
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0 mb-2">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <FormLabel className="text-sm">
                          I currently work here
                        </FormLabel>
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name={`experiences.${index}.description`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea
                          {...field}
                          placeholder="Describe your responsibilities and achievements..."
                          className="min-h-24 resize-none"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div>
                  <Label className="text-sm font-medium">Skills Used</Label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {form
                      .watch(`experiences.${index}.experience_skill`)
                      ?.split(",")
                      .filter(Boolean)
                      .map((tag, tagIndex) => (
                        <Badge
                          key={tagIndex}
                          className="flex items-center gap-1 bg-blue-100 text-blue-700 hover:bg-blue-200"
                        >
                          {tag.trim()}
                          <button
                            onClick={() => removeTag(index, tag.trim())}
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
                            addTag(index);
                          }
                        }}
                      />
                      <Button
                        size="sm"
                        onClick={() => addTag(index)}
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
      </Form>
    </div>
  );
});

// Add display name for React DevTools
EditExperienceForm.displayName = "EditExperienceForm";
