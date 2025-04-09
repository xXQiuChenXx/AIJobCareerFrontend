import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, EyeOff, Lock, ExternalLink } from "lucide-react";
import { EditSectionDialog } from "../edit-section-dialog";
import { EditPublicationsForm } from "../edit-publications-form";
import type { CompleteProfile } from "@/types/user";
import type { Publication } from "@/types/publication";
import { useRef, useState, type RefObject } from "react";
import { NavLink } from "react-router";
import { Button } from "@/components/ui/button";

interface PublicationsSectionProps {
  profile: CompleteProfile;
  isPrivate: boolean;
  handleSavePublications: (publications: Publication[]) => Promise<void>;
}

const PublicationsSection = ({
  profile,
  isPrivate,
  handleSavePublications,
}: PublicationsSectionProps) => {
  const formRef = useRef<HTMLFormElement>(null);
  const [open, setOpen] = useState(false);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between text-2xl">
          <div className="flex items-center">
            <span>Publications</span>
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
            title="Publications"
            description="Update your research papers and publications"
            formRef={formRef as RefObject<HTMLFormElement>}
          >
            <EditPublicationsForm
              publications={profile.publications || []}
              onSave={handleSavePublications}
              ref={formRef}
              onSubmitSuccess={() => setOpen(false)}
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
            <h3 className="text-lg font-medium">Publications are private</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              The account owner has set this profile to private.
            </p>
          </div>
        ) : !profile.publications || profile.publications.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-6 text-center">
            <div className="mb-4 rounded-full bg-blue-100 p-3">
              <FileText className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="text-lg font-medium">Add your publications</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Click the edit button to add your research papers and
              publications.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {profile.publications.map((pub) => (
              <div key={pub.publication_id} className="flex gap-4">
                <div className="mt-1 flex-shrink-0">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-100">
                    <FileText className="h-4 w-4 text-emerald-600" />
                  </div>
                </div>
                <div>
                  <h3 className="font-medium">{pub.publication_title}</h3>
                  <div className="text-sm text-muted-foreground">
                    {pub.publisher} · {pub.publication_year}
                  </div>
                  {pub.description && (
                    <p className="mt-1 text-sm">{pub.description}</p>
                  )}
                  {pub.publication_url && (
                    <NavLink
                      to={pub.publication_url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button variant="link" style={{ padding: "0" }}>
                        <ExternalLink className="w-2 h-2" />
                        View publication
                      </Button>
                    </NavLink>
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

export default PublicationsSection;
