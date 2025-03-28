import { forwardRef, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FileText, Plus, Trash2, Loader2 } from "lucide-react";
import type { Publication } from "@/types/publication";
import { PublicationService } from "@/services/publication-service";
import { toast } from "sonner";
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { publicationsFormSchema, type PublicationFormValues } from "@/lib/schemas/publication-schema";
import { 
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage 
} from "@/components/ui/form";

interface EditPublicationsFormProps {
  publications?: Publication[];
  onSave: (publications: Publication[]) => Promise<void>;
  onSubmitSuccess: () => void;
}

export const EditPublicationsForm = forwardRef<
  HTMLFormElement,
  EditPublicationsFormProps
>(({ publications = [], onSave, onSubmitSuccess }, ref) => {
  const [isDeleting, setIsDeleting] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Initialize form with Zod resolver
  const form = useForm<PublicationFormValues>({
    resolver: zodResolver(publicationsFormSchema),
    defaultValues: {
      publications: publications.length > 0 ? publications : [],
    },
    mode: "onBlur",
  });

  // Extract form methods
  const { control, setValue, handleSubmit, formState } = form;

  const { fields, append, remove } = useFieldArray({
    control,
    name: "publications",
  });

  // Update form data when external publications prop changes
  useEffect(() => {
    if (publications && publications.length > 0) {
      setValue("publications", publications);
    }
  }, [publications, setValue]);

  const addPublication = () => {
    // Create a placeholder publication with a temporary ID
    append({
      publication_id: `temp-${Date.now()}`,
      user_id: publications[0]?.user_id || null,
      publication_title: "",
      publisher: "",
      publication_year: new Date().getFullYear(),
      publication_url: "",
      description: "",
    });
  };

  const removePublication = async (index: number, id: string) => {
    try {
      setIsDeleting(id);

      // Only call API if it's not a temporary ID
      if (!id.startsWith("temp-")) {
        try {
          await PublicationService.deletePublication(id);
          toast.success("Publication deleted successfully");
        } catch (error: any) {
          // If we get a permission error, inform the user but still remove from UI
          if (error.message.includes("permission")) {
            toast.error(error.message);
            // Continue with UI removal even if API deletion failed due to permissions
          } else {
            // For other errors, re-throw to be caught by the outer catch
            throw error;
          }
        }
      }
      remove(index);
    } catch (error) {
      console.error("Failed to delete publication:", error);
      toast.error(
        typeof error === "object" && error !== null && "message" in error
          ? String(error.message)
          : "Failed to delete publication"
      );
    } finally {
      setIsDeleting(null);
    }
  };

  // Handle form submission
  const onSubmit = async (data: PublicationFormValues) => {
    try {
      setIsSubmitting(true);
      await onSave(data.publications);

      // Call the onSubmitSuccess callback to close the dialog
      onSubmitSuccess();
      toast.success("Publications saved successfully");
    } catch (error) {
      console.error("Failed to save publications:", error);
      toast.error(
        typeof error === "object" && error !== null && "message" in error
          ? String(error.message)
          : "Failed to save publications"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-4">
      <Button
        onClick={addPublication}
        className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700"
        type="button"
        disabled={isSubmitting}
      >
        <Plus className="mr-2 h-4 w-4" />
        Add Publication
      </Button>

      <Form {...form}>
        <form ref={ref} onSubmit={handleSubmit(onSubmit)}>
          {fields.length === 0 && (
            <div className="text-center py-4 text-muted-foreground">
              No publications added yet. Click "Add Publication" to get started.
            </div>
          )}

          {fields.map((field, index) => (
            <div key={field.id} className="rounded-lg border p-4 mb-4">
              <div className="flex flex-col sm:flex-row justify-between mb-4 gap-4">
                <div className="flex items-start gap-3 w-full">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-100 shrink-0">
                    <FileText className="h-4 w-4 text-emerald-600" />
                  </div>
                  <div className="flex-1 overflow-hidden">
                    <FormField
                      control={control}
                      name={`publications.${index}.publication_title`}
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              {...field}
                              placeholder="Publication Title"
                              className="border-0 p-0 text-lg font-semibold h-7 focus-visible:ring-0"
                            />
                          </FormControl>
                          <FormMessage className="text-xs mt-1" />
                        </FormItem>
                      )}
                    />
                    <div className="flex flex-wrap gap-2 mt-1">
                      <div className="flex items-center">
                        <FormField
                          control={control}
                          name={`publications.${index}.publisher`}
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <Input
                                  {...field}
                                  placeholder="Publisher/Journal"
                                  className="border-0 p-0 h-6 w-40 text-sm text-muted-foreground focus-visible:ring-0"
                                />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                      </div>
                      <div className="flex items-center">
                        <FormField
                          control={control}
                          name={`publications.${index}.publication_year`}
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <Input
                                  {...field}
                                  type="number"
                                  placeholder="Year"
                                  className="border-0 p-0 h-6 w-16 text-sm text-muted-foreground focus-visible:ring-0"
                                  // Convert string to number for the form
                                  onChange={(e) => field.onChange(e.target.value ? parseInt(e.target.value, 10) : '')}
                                />
                              </FormControl>
                              <FormMessage className="text-xs mt-1" />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removePublication(index, field.publication_id)}
                    className="text-rose-500 hover:text-rose-600 hover:bg-rose-50 shrink-0"
                    type="button"
                    disabled={isDeleting === field.publication_id || isSubmitting}
                  >
                    {isDeleting === field.publication_id ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Trash2 className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>
              
              <div className="ml-0 sm:ml-11">
                <FormField
                  control={control}
                  name={`publications.${index}.publication_url`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium">Publication URL</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="https://example.com/publication"
                          className="mt-1"
                        />
                      </FormControl>
                      <FormMessage className="text-xs" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={control}
                  name={`publications.${index}.description`}
                  render={({ field }) => (
                    <FormItem className="mt-3">
                      <FormLabel className="text-sm font-medium">Description</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Brief description of the publication"
                          className="mt-1"
                        />
                      </FormControl>
                      <FormMessage className="text-xs" />
                    </FormItem>
                  )}
                />
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
EditPublicationsForm.displayName = "EditPublicationsForm";
