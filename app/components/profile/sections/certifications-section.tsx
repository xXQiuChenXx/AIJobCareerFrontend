import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Star, EyeOff, FileText, Lock } from "lucide-react";
import { EditSectionDialog } from "../edit-section-dialog";
import { EditEducationForm } from "../edit-education-form";
import type { CompleteProfile } from "@/types/user";
import type { Certification } from "@/types/certification";
import { useRef, type RefObject } from "react";

interface CertificationsSectionProps {
  profile: CompleteProfile;
  isPrivate: boolean;
  handleSaveCertifications?: (certifications: Certification[]) => Promise<void>;
}

// Helper function to format dates
const formatDate = (dateString?: string): string => {
  if (!dateString) return "";
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", { year: "numeric", month: "short" });
};

const CertificationsSection = ({
  profile,
  isPrivate,
  handleSaveCertifications,
}: CertificationsSectionProps) => {
  const formRef = useRef<HTMLFormElement>(null);
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center">
            <span>Certifications</span>
            {isPrivate && (
              <Badge
                variant="outline"
                className="ml-2 gap-1 text-amber-600 border-amber-200 bg-amber-50"
              >
                <EyeOff className="h-3 w-3" />
                Private
              </Badge>
            )}
          </div>
          <EditSectionDialog
            title="Certifications"
            description="Update your certifications and licenses"
            formRef={formRef as RefObject<HTMLFormElement>}
          >
            <EditEducationForm
              educations={profile.education || []}
              certifications={profile.certifications || []}
              onSaveCertifications={handleSaveCertifications}
              ref={formRef}
            />
          </EditSectionDialog>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {isPrivate ? (
          <div className="flex flex-col items-center justify-center py-6 text-center">
            <div className="mb-4 rounded-full bg-amber-100 p-3">
              <Lock className="h-6 w-6 text-amber-600" />
            </div>
            <h3 className="text-lg font-medium">Certifications are private</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              The account owner has set this profile to private.
            </p>
          </div>
        ) : profile.certifications?.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-6 text-center">
            <div className="mb-4 rounded-full bg-blue-100 p-3">
              <FileText className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="text-lg font-medium">Add your certifications</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Click the edit button to add your certifications and licenses.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {profile.certifications.map((cert) => (
              <div key={cert.certification_id} className="flex gap-4">
                <div className="mt-1 flex-shrink-0">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-amber-100">
                    <Star className="h-4 w-4 text-amber-600" />
                  </div>
                </div>
                <div>
                  <h3 className="font-medium">{cert.certification_name}</h3>
                  <div className="text-sm text-muted-foreground">
                    {cert.issuing_organization} · Issued{" "}
                    {formatDate(cert.issue_date)}
                    {cert.expiry_date &&
                      ` · Expires ${formatDate(cert.expiry_date)}`}
                  </div>
                  {cert.credential_url && (
                    <a
                      href={cert.credential_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-1 inline-block text-sm text-primary hover:underline"
                    >
                      View credential
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default CertificationsSection;
