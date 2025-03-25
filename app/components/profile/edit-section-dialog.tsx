import React, { type ReactNode, useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Edit, Loader2, Save } from "lucide-react"
import { toast } from "sonner"

interface EditSectionDialogProps {
  triggerClassName?: string
  title: string
  description?: string
  children: ReactNode
  onSave?: () => Promise<void>
}

export function EditSectionDialog({ triggerClassName, title, description, children, onSave }: EditSectionDialogProps) {
  const [open, setOpen] = useState(false)
  const [saving, setSaving] = useState(false)
  const formRef = useRef<HTMLFormElement>(null)

  const handleSave = async () => {
    // Check if we have a form in the children and try to submit it
    if (formRef.current) {
      // Programmatically submit the form
      const submitEvent = new Event('submit', { cancelable: true, bubbles: true });
      formRef.current.dispatchEvent(submitEvent);
      
      // If the event wasn't prevented (validation passed), submit handler will be called
      // The form's submit handler should handle the actual saving
      return;
    }
    
    // If no form exists or form doesn't have a submit handler, use the onSave prop
    if (onSave) {
      setSaving(true)
      try {
        await onSave()
        setOpen(false)
        toast.success(`${title} updated successfully.`)
      } catch (error) {
        console.error(`Error saving ${title}:`, error)
        toast.error(`Failed to update ${title}. Please try again.`)
      } finally {
        setSaving(false)
      }
    } else {
      // No form and no onSave, just close the dialog
      setOpen(false)
      toast.success(`${title} updated successfully.`)
    }
  }

  // Clone the children and pass the formRef to it if it's a form
  const childrenWithProps = React.Children.map(children, child => {
    if (React.isValidElement(child)) {
      // If the child has a form element as the top component, pass the ref
      if (child.type === 'form' || (typeof child.type === 'function' && child.type.name.includes('Form'))) {
        return React.cloneElement(child, { 
          ref: formRef,
          onSubmitSuccess: () => {
            setOpen(false);
            toast.success(`${title} updated successfully.`);
          }
        } as any);
      }
    }
    return child;
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" className={triggerClassName}>
          <Edit className="h-4 w-4" />
          <span className="sr-only">Edit {title}</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit {title}</DialogTitle>
          {description && <DialogDescription>{description}</DialogDescription>}
        </DialogHeader>

        {childrenWithProps}

        <DialogFooter className="mt-4">
          <Button variant="outline" onClick={() => setOpen(false)} disabled={saving}>
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
            disabled={saving}
          >
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
  )
}

