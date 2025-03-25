import { useState, forwardRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { GraduationCap, Plus, Star, Trash2 } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { Education } from "@/types/education";
import type { Certification } from "@/types/certification";
import { EducationService } from "@/services/education-service";
import { CertificationService } from "@/services/certification-service";
import { toast } from "sonner";

interface EditEducationFormProps {
  educations?: Education[];
  certifications?: Certification[];
  onSaveEducation?: (educations: Education[]) => Promise<void>;
  onSaveCertifications?: (certifications: Certification[]) => Promise<void>;
  onSubmitSuccess?: () => void;
}

export const EditEducationForm = forwardRef<HTMLFormElement, EditEducationFormProps>(
  ({ 
    educations = [], 
    certifications = [], 
    onSaveEducation, 
    onSaveCertifications,
    onSubmitSuccess 
  }, ref) => {
    const [education, setEducation] = useState<Education[]>(educations);
    const [certs, setCertifications] = useState<Certification[]>(certifications);
    const [loading, setLoading] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [activeTab, setActiveTab] = useState("education");

    const formatDateForInput = (dateString?: string): string => {
      if (!dateString) return "";
      // Convert API date format to YYYY-MM for input[type="month"]
      const date = new Date(dateString);
      return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
    };

    const addEducation = () => {
      const newEdu: Education = {
        education_id: `temp-${Date.now()}`,
        user_id: educations[0]?.user_id || "",
        degree_name: "",
        institution_name: "",
        start_year: new Date().getFullYear(),
        end_year: undefined,
        description: "",
      };
      setEducation([newEdu, ...education]);
    };

    const removeEducation = async (id: string) => {
      try {
        // Only call API if it's not a temporary ID
        if (!id.startsWith("temp-")) {
          setLoading(true);
          await EducationService.deleteEducation(id);
          toast.success("Education deleted successfully");
        }
        setEducation(education.filter((edu) => edu.education_id !== id));
      } catch (error) {
        console.error("Failed to delete education:", error);
        toast.error("Failed to delete education");
      } finally {
        setLoading(false);
      }
    };

    const addCertification = () => {
      const newCert: Certification = {
        certification_id: `temp-${Date.now()}`,
        user_id: certifications[0]?.user_id || "",
        certification_name: "",
        issuing_organization: "",
        issue_date: new Date().toISOString(),
        expiry_date: undefined,
        credential_id: "",
        credential_url: "",
      };
      setCertifications([newCert, ...certs]);
    };

    const removeCertification = async (id: string) => {
      try {
        // Only call API if it's not a temporary ID
        if (!id.startsWith("temp-")) {
          setLoading(true);
          await CertificationService.deleteCertification(id);
          toast.success("Certification deleted successfully");
        }
        setCertifications(certs.filter((cert) => cert.certification_id !== id));
      } catch (error) {
        console.error("Failed to delete certification:", error);
        toast.error("Failed to delete certification");
      } finally {
        setLoading(false);
      }
    };

    // Handle form submission
    const handleSubmit = async (e?: React.FormEvent) => {
      if (e) e.preventDefault();
      
      try {
        setSubmitting(true);
        
        if (activeTab === "education") {
          // Save education data
          if (onSaveEducation) {
            await onSaveEducation(education);
          } else {
            // Save directly to API
            for (const edu of education) {
              if (edu.education_id.startsWith("temp-")) {
                // Create new education
                const { education_id, ...newEdu } = edu;
                await EducationService.createEducation(newEdu);
              } else {
                // Update existing education
                await EducationService.updateEducation(edu.education_id, edu);
              }
            }
          }
        } else if (activeTab === "certifications") {
          // Save certification data
          if (onSaveCertifications) {
            await onSaveCertifications(certs);
          } else {
            // Save directly to API
            for (const cert of certs) {
              if (cert.certification_id.startsWith("temp-")) {
                // Create new certification
                const { certification_id, ...newCert } = cert;
                await CertificationService.createCertification(newCert);
              } else {
                // Update existing certification
                await CertificationService.updateCertification(cert.certification_id, cert);
              }
            }
          }
        }
        
        // Call the onSubmitSuccess callback to close the dialog
        if (onSubmitSuccess) {
          onSubmitSuccess();
        }
      } catch (error) {
        console.error(`Failed to save ${activeTab}:`, error);
        toast.error(`Failed to save ${activeTab}`);
      } finally {
        setSubmitting(false);
      }
    };

    return (
      <Tabs 
        defaultValue="education" 
        className="w-full" 
        onValueChange={(value) => setActiveTab(value)}
      >
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="education">Degrees & Education</TabsTrigger>
          <TabsTrigger value="certifications">Certifications</TabsTrigger>
        </TabsList>

        <form ref={ref} onSubmit={handleSubmit}>
          <TabsContent value="education" className="space-y-4 pt-4">
            <Button
              onClick={addEducation}
              className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
              disabled={loading || submitting}
              type="button"
            >
              <Plus className="mr-2 h-4 w-4" />
              Add Education
            </Button>

            {education.map((edu) => (
              <div key={edu.education_id} className="rounded-lg border p-4">
                <div className="flex flex-col sm:flex-row justify-between mb-4 gap-4">
                  <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-100">
                      <GraduationCap className="h-5 w-5 text-purple-600" />
                    </div>
                    <div className="flex-1">
                      <Input
                        value={edu.degree_name}
                        onChange={(e) => {
                          const updated = education.map((item) =>
                            item.education_id === edu.education_id
                              ? { ...item, degree_name: e.target.value }
                              : item
                          );
                          setEducation(updated);
                        }}
                        placeholder="Degree"
                        className="border-0 p-0 text-lg font-semibold h-7 focus-visible:ring-0"
                      />
                      <div className="flex flex-wrap gap-2 mt-1">
                        <div className="flex items-center">
                          <Input
                            value={edu.institution_name}
                            onChange={(e) => {
                              const updated = education.map((item) =>
                                item.education_id === edu.education_id
                                  ? { ...item, institution_name: e.target.value }
                                  : item
                              );
                              setEducation(updated);
                            }}
                            placeholder="School/University"
                            className="border-0 p-0 h-6 w-40 text-sm text-muted-foreground focus-visible:ring-0"
                          />
                        </div>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeEducation(edu.education_id)}
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
                    <Input
                      type="number"
                      value={edu.start_year?.toString() || ""}
                      onChange={(e) => {
                        const updated = education.map((item) =>
                          item.education_id === edu.education_id
                            ? {
                                ...item,
                                start_year:
                                  parseInt(e.target.value) ||
                                  new Date().getFullYear(),
                              }
                            : item
                        );
                        setEducation(updated);
                      }}
                      placeholder="Start Year"
                      className="w-20 text-sm"
                    />
                    <span className="mx-1 text-muted-foreground">-</span>
                    <Input
                      type="number"
                      value={edu.end_year?.toString() || ""}
                      onChange={(e) => {
                        const updated = education.map((item) =>
                          item.education_id === edu.education_id
                            ? {
                                ...item,
                                end_year: e.target.value
                                  ? parseInt(e.target.value)
                                  : undefined,
                              }
                            : item
                        );
                        setEducation(updated);
                      }}
                      placeholder="End Year"
                      className="w-20 text-sm"
                    />
                  </div>
                  <Textarea
                    value={edu.description}
                    onChange={(e) => {
                      const updated = education.map((item) =>
                        item.education_id === edu.education_id
                          ? { ...item, description: e.target.value }
                          : item
                      );
                      setEducation(updated);
                    }}
                    placeholder="Describe your studies, achievements, thesis, etc."
                    className="min-h-20 resize-none"
                  />
                </div>
              </div>
            ))}

            {education.length === 0 && (
              <div className="text-center py-6 text-muted-foreground border rounded-lg">
                No education records yet. Add your educational history!
              </div>
            )}
          </TabsContent>

          <TabsContent value="certifications" className="space-y-4 pt-4">
            <Button
              onClick={addCertification}
              className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600"
              disabled={loading || submitting}
              type="button"
            >
              <Plus className="mr-2 h-4 w-4" />
              Add Certification
            </Button>

            {certs.map((cert) => (
              <div key={cert.certification_id} className="rounded-lg border p-4">
                <div className="flex justify-between mb-2">
                  <div className="flex items-start gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-amber-100">
                      <Star className="h-4 w-4 text-amber-600" />
                    </div>
                    <div className="flex-1">
                      <Input
                        value={cert.certification_name}
                        onChange={(e) => {
                          const updated = certs.map((item) =>
                            item.certification_id === cert.certification_id
                              ? { ...item, certification_name: e.target.value }
                              : item
                          );
                          setCertifications(updated);
                        }}
                        placeholder="Certification Name"
                        className="border-0 p-0 text-base font-medium h-7 focus-visible:ring-0"
                      />
                      <div className="flex flex-wrap items-center gap-2 mt-1">
                        <Input
                          value={cert.issuing_organization}
                          onChange={(e) => {
                            const updated = certs.map((item) =>
                              item.certification_id === cert.certification_id
                                ? { ...item, issuing_organization: e.target.value }
                                : item
                            );
                            setCertifications(updated);
                          }}
                          placeholder="Issuing Organization"
                          className="border-0 p-0 h-6 text-sm text-muted-foreground focus-visible:ring-0"
                        />
                      </div>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeCertification(cert.certification_id)}
                    className="text-rose-500 hover:text-rose-600 hover:bg-rose-50"
                    disabled={loading || submitting}
                    type="button"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>

                <div className="ml-0 sm:ml-11 mt-4 space-y-3">
                  <div>
                    <label className="text-sm font-medium">Issue Date</label>
                    <Input
                      type="month"
                      value={formatDateForInput(cert.issue_date)}
                      onChange={(e) => {
                        const updated = certs.map((item) =>
                          item.certification_id === cert.certification_id
                            ? {
                                ...item,
                                issue_date: new Date(e.target.value).toISOString(),
                              }
                            : item
                        );
                        setCertifications(updated);
                      }}
                      placeholder="Issue Date"
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium">
                      Expiry Date (if applicable)
                    </label>
                    <Input
                      type="month"
                      value={formatDateForInput(cert.expiry_date)}
                      onChange={(e) => {
                        const updated = certs.map((item) =>
                          item.certification_id === cert.certification_id
                            ? {
                                ...item,
                                expiry_date: e.target.value
                                  ? new Date(e.target.value).toISOString()
                                  : undefined,
                              }
                            : item
                        );
                        setCertifications(updated);
                      }}
                      placeholder="Expiry Date"
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium">Credential ID</label>
                    <Input
                      value={cert.credential_id}
                      onChange={(e) => {
                        const updated = certs.map((item) =>
                          item.certification_id === cert.certification_id
                            ? { ...item, credential_id: e.target.value }
                            : item
                        );
                        setCertifications(updated);
                      }}
                      placeholder="Credential ID"
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium">Credential URL</label>
                    <Input
                      value={cert.credential_url}
                      onChange={(e) => {
                        const updated = certs.map((item) =>
                          item.certification_id === cert.certification_id
                            ? { ...item, credential_url: e.target.value }
                            : item
                        );
                        setCertifications(updated);
                      }}
                      placeholder="https://example.com/credential"
                      className="mt-1"
                    />
                  </div>
                </div>
              </div>
            ))}

            {certs.length === 0 && (
              <div className="text-center py-6 text-muted-foreground border rounded-lg">
                No certifications yet. Add your professional certifications!
              </div>
            )}
          </TabsContent>
          
          {/* Hidden submit button that will be triggered by the dialog's save button */}
          <button type="submit" hidden></button>
        </form>
      </Tabs>
    );
  }
);

// Add display name for React DevTools
EditEducationForm.displayName = "EditEducationForm";
