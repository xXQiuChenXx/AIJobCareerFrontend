import React, {
  type ReactNode,
  useState,
  type Dispatch,
  type SetStateAction,
} from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Edit, Loader2, Save } from "lucide-react";

interface EditSectionDialogProps {
  triggerClassName?: string;
  title: string;
  description?: string;
  children: ReactNode;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  formRef?: React.RefObject<HTMLFormElement>;
}

export function EditSectionDialog({
  triggerClassName,
  title,
  description,
  children,
  formRef,
  open,
  setOpen,
}: EditSectionDialogProps) {
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    // Check if we have a form in the children and try to submit it
    if (formRef?.current) {
      // Programmatically submit the form
      const submitEvent = new Event("submit", {
        cancelable: true,
        bubbles: true,
      });
      await formRef.current.dispatchEvent(submitEvent);
    }
    setSaving(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" className={triggerClassName}>
          <Edit className="h-4 w-4" />
          <span className="sr-only">Edit {title}</span>
        </Button>
      </DialogTrigger>
      <DialogContent
        onKeyDown={(e) => {
          if (e.key === "Enter") setOpen(false);
        }}
        className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto"
      >
        <DialogHeader>
          <DialogTitle>Edit {title}</DialogTitle>
          {description && <DialogDescription>{description}</DialogDescription>}
        </DialogHeader>

        {children}

        <DialogFooter className="mt-4">
          <Button
            variant="outline"
            onClick={() => setOpen(false)}
            disabled={saving}
          >
            Cancel
          </Button>
          <Button onClick={handleSave} className="" disabled={saving}>
            {saving ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="mr-2 h-4 w-4" />
                Save Changes
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
