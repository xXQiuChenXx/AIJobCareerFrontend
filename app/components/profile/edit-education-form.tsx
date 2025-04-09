import { useState, forwardRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { GraduationCap, Plus, Trash2 } from "lucide-react";
import type { Education } from "@/types/education";
import { EducationService } from "@/services/education-service";
import { toast } from "sonner";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  educationSchema,
  type EducationFormValues,
} from "@/lib/schemas/education-schema";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

interface EditEducationFormProps {
  educations?: Education[];
  onSaveEducation: (educations: EducationFormValues[]) => Promise<void>;
  onSubmitSuccess: () => void;
}

// Create a wrapper schema for an array of education items
const educationsArraySchema = z.object({
  educations: z.array(educationSchema),
});

type FormValues = z.infer<typeof educationsArraySchema>;

export const EditEducationForm = forwardRef<
  HTMLFormElement,
  EditEducationFormProps
>(({ educations = [], onSaveEducation, onSubmitSuccess }, ref) => {
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Setup education form with properly structured defaultValues
  const form = useForm<FormValues>({
    resolver: zodResolver(educationsArraySchema),
    defaultValues: {
      educations: educations.length > 0 ? educations : [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "educations",
  });

  const addEducation = () => {
    const newEdu = {
      education_id: `temp-${Date.now()}`,
      user_id: educations[0]?.user_id || "",
      degree_name: "",
      institution_name: "",
      start_year: new Date().getFullYear(),
      end_year: undefined,
      description: "",
    };
    append(newEdu);
  };

  const removeEducation = async (index: number, id: string) => {
    try {
      // Only call API if it's not a temporary ID
      if (!id.startsWith("temp-")) {
        setLoading(true);
        await EducationService.deleteEducation(id);
        toast.success("Education deleted successfully");
      }
      remove(index);
    } catch (error) {
      console.error("Failed to delete education:", error);
      toast.error("Failed to delete education");
    } finally {
      setLoading(false);
    }
  };

  // Handle form submission
  const onSubmit = async (data: FormValues) => {
    try {
      setSubmitting(true);

      await onSaveEducation(data.educations);

      toast.success("Education updated successfully");

      // Call the onSubmitSuccess callback to close the dialog

      onSubmitSuccess();
    } catch (error) {
      console.error("Failed to save education:", error);
      toast.error("Failed to save education");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form ref={ref} onSubmit={form.handleSubmit(onSubmit)}>
        <div className="space-y-4 pt-4">
          <Button
            onClick={addEducation}
            className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
            disabled={loading || submitting}
            type="button"
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Education
          </Button>

          {fields.map((field, index) => (
            <div key={field.id} className="rounded-lg border p-4">
              <div className="flex flex-col sm:flex-row justify-between mb-4 gap-4">
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-100">
                    <GraduationCap className="h-5 w-5 text-purple-600" />
                  </div>
                  <div className="flex-1">
                    <FormField
                      control={form.control}
                      name={`educations.${index}.degree_name`}
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              {...field}
                              placeholder="Degree"
                              className="border-0 text-lg font-semibold h-7 focus-visible:ring-0"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div className="flex flex-wrap gap-2 mt-1">
                      <div className="flex items-center">
                        <FormField
                          control={form.control}
                          name={`educations.${index}.institution_name`}
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <Input
                                  {...field}
                                  placeholder="School/University"
                                  className="border-0 h-6 w-40 text-sm text-muted-foreground focus-visible:ring-0"
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
                      removeEducation(
                        index,
                        form.getValues(`educations.${index}.education_id`) || ""
                      )
                    }
                    className="text-rose-500 hover:text-rose-600 hover:bg-rose-50 ml-auto"
                    disabled={loading || submitting}
                    type="button"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="ml-0 sm:ml-13 space-y-4">
                <div className="flex items-center gap-2">
                  <FormField
                    control={form.control}
                    name={`educations.${index}.start_year`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Start Year</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            {...field}
                            onChange={(e) =>
                              field.onChange(
                                parseInt(e.target.value) ||
                                  new Date().getFullYear()
                              )
                            }
                            placeholder="Start Year"
                            className="w-20 text-sm"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <span className="mx-1 text-muted-foreground">-</span>
                  <FormField
                    control={form.control}
                    name={`educations.${index}.end_year`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>End Year</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            value={field.value || ""}
                            onChange={(e) => {
                              const value = e.target.value;
                              field.onChange(
                                value ? parseInt(value) : undefined
                              );
                            }}
                            placeholder="End Year"
                            className="w-20 text-sm"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name={`educations.${index}.description`}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Textarea
                          {...field}
                          placeholder="Describe your studies, achievements, thesis, etc."
                          className="min-h-20 resize-none"
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
            <div className="text-center py-6 text-muted-foreground border rounded-lg">
              No education records yet. Add your educational history!
            </div>
          )}
        </div>

        {/* Hidden submit button that will be triggered by the dialog's save button */}
        <button type="submit" hidden></button>
      </form>
    </Form>
  );
});

// Add display name for React DevTools
EditEducationForm.displayName = "EditEducationForm";
