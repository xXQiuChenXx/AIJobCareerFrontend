import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Star, EyeOff, FileText, Lock, ExternalLink } from "lucide-react";
import { EditSectionDialog } from "../edit-section-dialog";
import { EditCertificationsForm } from "../edit-certifications-form";
import type { CompleteProfile } from "@/types/user";
import type { Certification } from "@/types/certification";
import { useRef, useState, type RefObject } from "react";

interface CertificationsSectionProps {
  profile: CompleteProfile;
  isPrivate: boolean;
  handleSaveCertifications?: (certifications: Certification[]) => Promise<void>;
}

const CertificationsSection = ({
  profile,
  isPrivate,
  handleSaveCertifications,
}: CertificationsSectionProps) => {
  const formRef = useRef<HTMLFormElement>(null);
  const [open, setOpen] = useState(false);

  const formatDate = (dateString?: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleString("default", { month: "short", year: "numeric" });
  };

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
            open={open}
            setOpen={setOpen}
            title="Certifications"
            description="Update your professional certifications"
            formRef={formRef as RefObject<HTMLFormElement>}
          >
            <EditCertificationsForm
              ref={formRef}
              certifications={profile.certifications || []}
              onSaveCertifications={handleSaveCertifications}
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
              Click the edit button to add your professional certifications.
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {profile.certifications.map((cert) => (
              <div key={cert.certification_id} className="flex gap-4">
                <div className="mt-1 flex-shrink-0">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-100">
                    <Star className="h-5 w-5 text-amber-600" />
                  </div>
                </div>
                <div className="space-y-1">
                  <h3 className="font-semibold">{cert.certification_name}</h3>
                  <div className="text-sm text-muted-foreground">
                    {cert.issuing_organization}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Issued: {formatDate(cert.issue_date)}
                    {cert.expiry_date &&
                      ` • Expires: ${formatDate(cert.expiry_date)}`}
                  </div>
                  {cert.credential_url && (
                    <a
                      href={cert.credential_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-sm text-blue-600 hover:text-blue-800 mt-1"
                    >
                      View credential
                      <ExternalLink className="ml-1 h-3 w-3" />
                    </a>
                  )}
                  {cert.credential_id && (
                    <div className="mt-1 text-xs text-muted-foreground">
                      Credential ID: {cert.credential_id}
                    </div>
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
