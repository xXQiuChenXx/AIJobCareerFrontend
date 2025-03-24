import { type ReactNode, useState } from "react"
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
import { Edit, Save } from "lucide-react"
import { toast } from "sonner"

interface EditSectionDialogProps {
  triggerClassName?: string
  title: string
  description?: string
  children: ReactNode
  onSave?: () => void
}

export function EditSectionDialog({ triggerClassName, title, description, children, onSave }: EditSectionDialogProps) {
  const [open, setOpen] = useState(false)

  const handleSave = () => {
    // Call the onSave callback if provided
    onSave?.()

    // Close the dialog
    setOpen(false)

    // Show success toast
    toast("Your profile has been updated successfully.")
  }

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

        {children}

        <DialogFooter className="mt-4">
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
          >
            <Save className="mr-2 h-4 w-4" />
            Save Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

