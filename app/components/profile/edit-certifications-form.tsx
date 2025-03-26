import { useState, forwardRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Star, Plus, Trash2 } from "lucide-react";
import type { Certification } from "@/types/certification";
import { CertificationService } from "@/services/certification-service";
import { toast } from "sonner";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { certificateSchema } from "@/lib/schemas/education-schema";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

interface EditCertificationsFormProps {
  certifications?: Certification[];
  onSaveCertifications?: (certifications: Certification[]) => Promise<void>;
  onSubmitSuccess?: () => void;
}

// Create a wrapper schema for an array of certification items
const certificationsArraySchema = z.object({
  certifications: z.array(certificateSchema)
});

type FormValues = z.infer<typeof certificationsArraySchema>;

export const EditCertificationsForm = forwardRef<HTMLFormElement, EditCertificationsFormProps>(
  ({ 
    certifications = [], 
    onSaveCertifications,
    onSubmitSuccess 
  }, ref) => {
    
    const [loading, setLoading] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    
    // Setup certification form with proper typing
    const form = useForm<FormValues>({
      resolver: zodResolver(certificationsArraySchema),
      defaultValues: {
        certifications: certifications.length > 0 
          ? certifications 
          : [{ 
              certification_id: `temp-${Date.now()}`, 
              user_id: "", 
              certification_name: "", 
              issuing_organization: "", 
              issue_date: new Date().toISOString(), 
              credential_id: "", 
              credential_url: "" 
            }]
      },
    });
    
    const { fields, append, remove } = useFieldArray({
      control: form.control,
      name: "certifications"
    });

    const formatDateForInput = (dateString?: string): string => {
      if (!dateString) return "";
      // Convert API date format to YYYY-MM for input[type="month"]
      const date = new Date(dateString);
      return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
    };

    const addCertification = () => {
      const newCert = {
        certification_id: `temp-${Date.now()}`,
        user_id: certifications[0]?.user_id || "",
        certification_name: "",
        issuing_organization: "",
        issue_date: new Date().toISOString(),
        expiry_date: undefined,
        credential_id: "",
        credential_url: "",
      };
      append(newCert);
    };

    const removeCertification = async (index: number, id: string) => {
      try {
        // Only call API if it's not a temporary ID
        if (!id.startsWith("temp-")) {
          setLoading(true);
          await CertificationService.deleteCertification(id);
          toast.success("Certification deleted successfully");
        }
        remove(index);
      } catch (error) {
        console.error("Failed to delete certification:", error);
        toast.error("Failed to delete certification");
      } finally {
        setLoading(false);
      }
    };

    // Handle form submission with proper typing
    const onSubmit = async (data: FormValues) => {
      try {
        setSubmitting(true);
        
        if (onSaveCertifications) {
          await onSaveCertifications(data.certifications);
        } else {
          // Save directly to API
          for (const cert of data.certifications) {
            if (cert.certification_id?.startsWith("temp-")) {
              // Create new certification
              const { certification_id, ...newCert } = cert;
              await CertificationService.createCertification(newCert);
            } else {
              // Update existing certification
              await CertificationService.updateCertification(cert.certification_id!, cert);
            }
          }
        }
        
        toast.success("Certifications updated successfully");
        
        // Call the onSubmitSuccess callback to close the dialog
        if (onSubmitSuccess) {
          onSubmitSuccess();
        }
      } catch (error) {
        console.error("Failed to save certifications:", error);
        toast.error("Failed to save certifications");
      } finally {
        setSubmitting(false);
      }
    };
    
    // For handling submit from parent component via ref
    const handleSubmit = (e?: React.FormEvent) => {
      if (e) e.preventDefault();
      form.handleSubmit(onSubmit)();
    };

    return (
      <form ref={ref} onSubmit={handleSubmit}>
        <div className="space-y-4 pt-4">
          <Button
            onClick={addCertification}
            className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600"
            disabled={loading || submitting}
            type="button"
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Certification
          </Button>

          {fields.map((field, index) => (
            <div key={field.id} className="rounded-lg border p-4">
              <div className="flex justify-between mb-2">
                <div className="flex items-start gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-amber-100">
                    <Star className="h-4 w-4 text-amber-600" />
                  </div>
                  <div className="flex-1">
                    <FormField
                      control={form.control}
                      name={`certifications.${index}.certification_name`}
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              {...field}
                              placeholder="Certification Name"
                              className="border-0 p-0 text-base font-medium h-7 focus-visible:ring-0"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div className="flex flex-wrap items-center gap-2 mt-1">
                      <FormField
                        control={form.control}
                        name={`certifications.${index}.issuing_organization`}
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input
                                {...field}
                                placeholder="Issuing Organization"
                                className="border-0 p-0 h-6 text-sm text-muted-foreground focus-visible:ring-0"
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
                  onClick={() => removeCertification(index, form.getValues(`certifications.${index}.certification_id`) || "")}
                  className="text-rose-500 hover:text-rose-600 hover:bg-rose-50"
                  disabled={loading || submitting}
                  type="button"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>

              <div className="ml-0 sm:ml-11 mt-4 space-y-3">
                <FormField
                  control={form.control}
                  name={`certifications.${index}.issue_date`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium">Issue Date</FormLabel>
                      <FormControl>
                        <Input
                          type="month"
                          value={formatDateForInput(field.value)}
                          onChange={(e) => {
                            field.onChange(new Date(e.target.value).toISOString());
                          }}
                          placeholder="Issue Date"
                          className="mt-1"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name={`certifications.${index}.expiry_date`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium">Expiry Date (if applicable)</FormLabel>
                      <FormControl>
                        <Input
                          type="month"
                          value={formatDateForInput(field.value)}
                          onChange={(e) => {
                            field.onChange(e.target.value ? new Date(e.target.value).toISOString() : undefined);
                          }}
                          placeholder="Expiry Date"
                          className="mt-1"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name={`certifications.${index}.credential_id`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium">Credential ID</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Credential ID"
                          className="mt-1"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name={`certifications.${index}.credential_url`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium">Credential URL</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="https://example.com/credential"
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
            <div className="text-center py-6 text-muted-foreground border rounded-lg">
              No certifications yet. Add your professional certifications!
            </div>
          )}
        </div>
        
        {/* Hidden submit button that will be triggered by the dialog's save button */}
        <button type="submit" hidden></button>
      </form>
    );
  }
);

// Add display name for React DevTools
EditCertificationsForm.displayName = "EditCertificationsForm";
