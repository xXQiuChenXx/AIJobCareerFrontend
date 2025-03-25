import { useState, forwardRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { FileText, Plus, Trash2 } from "lucide-react"
import type { Publication } from "@/types/publication"
import { PublicationService } from "@/services/publication-service"
import { toast } from "sonner"

interface EditPublicationsFormProps {
  publications?: Publication[];
  onSave?: (publications: Publication[]) => Promise<void>;
  onSubmitSuccess?: () => void;
}

export const EditPublicationsForm = forwardRef<HTMLFormElement, EditPublicationsFormProps>(
  ({ publications = [], onSave, onSubmitSuccess }, ref) => {
    const [pubs, setPubs] = useState<Publication[]>(publications);
    const [loading, setLoading] = useState(false);
    const [submitting, setSubmitting] = useState(false);

    const addPublication = () => {
      // Create a placeholder publication with a temporary ID
      const newPub: Publication = {
        publication_id: `temp-${Date.now()}`,
        user_id: publications[0]?.user_id || '',
        publication_title: "",
        publisher: "",
        publication_year: new Date().getFullYear(),
        publication_url: "",
        description: "",
      }
      setPubs([newPub, ...pubs])
    }

    const removePublication = async (id: string) => {
      try {
        // Only call API if it's not a temporary ID
        if (!id.startsWith('temp-')) {
          setLoading(true);
          await PublicationService.deletePublication(id);
          toast.success("Publication deleted successfully");
        }
        setPubs(pubs.filter((pub) => pub.publication_id !== id));
      } catch (error) {
        console.error("Failed to delete publication:", error);
        toast.error("Failed to delete publication");
      } finally {
        setLoading(false);
      }
    }

    // Handle form submission
    const handleSubmit = async (e?: React.FormEvent) => {
      if (e) e.preventDefault();
      
      try {
        setSubmitting(true);
        
        // If custom onSave is provided, use that
        if (onSave) {
          await onSave(pubs);
        } 
        // Otherwise save directly to API
        else {
          for (const pub of pubs) {
            if (pub.publication_id.startsWith('temp-')) {
              // Create new publication
              const { publication_id, ...newPub } = pub;
              await PublicationService.createPublication(newPub);
            } else {
              // Update existing publication
              await PublicationService.updatePublication(pub.publication_id, pub);
            }
          }
        }
        
        // Call the onSubmitSuccess callback to close the dialog
        if (onSubmitSuccess) {
          onSubmitSuccess();
        }
      } catch (error) {
        console.error("Failed to save publications:", error);
        toast.error("Failed to save publications");
      } finally {
        setSubmitting(false);
      }
    };

    return (
      <div className="space-y-4">
        <Button
          onClick={addPublication}
          className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700"
          disabled={loading || submitting}
          type="button"
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Publication
        </Button>

        <form ref={ref} onSubmit={handleSubmit}>
          {pubs.map((pub) => (
            <div key={pub.publication_id} className="rounded-lg border p-4 mb-4">
              <div className="flex flex-col sm:flex-row justify-between mb-4 gap-4">
                <div className="flex items-start gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-100">
                    <FileText className="h-4 w-4 text-emerald-600" />
                  </div>
                  <div className="flex-1">
                    <Input
                      value={pub.publication_title}
                      onChange={(e) => {
                        const updated = pubs.map((item) =>
                          item.publication_id === pub.publication_id ? 
                            { ...item, publication_title: e.target.value } : item,
                        )
                        setPubs(updated)
                      }}
                      placeholder="Publication Title"
                      className="border-0 p-0 text-lg font-semibold h-7 focus-visible:ring-0"
                    />
                    <div className="flex flex-wrap gap-2 mt-1">
                      <div className="flex items-center">
                        <Input
                          value={pub.publisher}
                          onChange={(e) => {
                            const updated = pubs.map((item) =>
                              item.publication_id === pub.publication_id ? 
                                { ...item, publisher: e.target.value } : item,
                            )
                            setPubs(updated)
                          }}
                          placeholder="Publisher/Journal"
                          className="border-0 p-0 h-6 w-40 text-sm text-muted-foreground focus-visible:ring-0"
                        />
                      </div>
                      <div className="flex items-center">
                        <Input
                          value={pub.publication_year.toString()}
                          onChange={(e) => {
                            const updated = pubs.map((item) =>
                              item.publication_id === pub.publication_id ? 
                                { ...item, publication_year: parseInt(e.target.value) || new Date().getFullYear() } : item,
                            )
                            setPubs(updated)
                          }}
                          placeholder="Year"
                          className="border-0 p-0 h-6 w-16 text-sm text-muted-foreground focus-visible:ring-0"
                        />
                      </div>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removePublication(pub.publication_id)}
                    className="text-rose-500 hover:text-rose-600 hover:bg-rose-50 ml-auto"
                    disabled={loading}
                    type="button"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div className="ml-0 sm:ml-11">
                <label className="text-sm font-medium">Publication URL</label>
                <Input
                  value={pub.publication_url}
                  onChange={(e) => {
                    const updated = pubs.map((item) =>
                      item.publication_id === pub.publication_id ? 
                        { ...item, publication_url: e.target.value } : item,
                    )
                    setPubs(updated)
                  }}
                  placeholder="https://example.com/publication"
                  className="mt-1"
                />
                <label className="text-sm font-medium mt-3 block">Description</label>
                <Input
                  value={pub.description}
                  onChange={(e) => {
                    const updated = pubs.map((item) =>
                      item.publication_id === pub.publication_id ? 
                        { ...item, description: e.target.value } : item,
                    )
                    setPubs(updated)
                  }}
                  placeholder="Brief description of the publication"
                  className="mt-1"
                />
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
EditPublicationsForm.displayName = "EditPublicationsForm";

