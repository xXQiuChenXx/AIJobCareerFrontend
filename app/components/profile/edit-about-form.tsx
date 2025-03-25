import { useState, forwardRef } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import type { BasicInfo } from "@/types/user"
import { ProfileImageUpload } from "./profile-image-upload"
import { toast } from "sonner"

interface EditAboutFormProps {
  profile?: BasicInfo;
  onSave?: (data: Partial<BasicInfo>) => Promise<void>;
  onSubmitSuccess?: () => void;
}

// Schema for the basic profile information
const aboutFormSchema = z.object({
  location: z.string().min(2, { message: "Location must be at least 2 characters." }),
  intro: z.string().min(10, { message: "About me must be at least 10 characters." }),
  contact_number: z.string().optional(),
});

type AboutFormValues = z.infer<typeof aboutFormSchema>

export const EditAboutForm = forwardRef<HTMLFormElement, EditAboutFormProps>(
  ({ profile, onSave, onSubmitSuccess }, ref) => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [iconKey, setIconKey] = useState<string>(profile?.icon || '');
    
    // Get user initials for avatar fallback
    const userInitials = profile?.full_name
      ? profile.full_name.split(' ').map(part => part[0]).join('').toUpperCase()
      : 'U';
      
    // Get the current profile image URL if it exists
    const profileImageUrl = profile?.icon 
      ? `${process.env.NEXT_PUBLIC_API_URL || 'https://api.aicareer.example.com'}/Files/${profile.icon}`
      : undefined;

    // Set default values from the profile data if provided
    const defaultValues: AboutFormValues = {
      location: profile?.location || "",
      intro: profile?.intro || "",
      contact_number: profile?.contact_number || "",
    };

    const form = useForm<AboutFormValues>({
      resolver: zodResolver(aboutFormSchema),
      defaultValues,
      mode: "onChange",
    });

    const handleSubmit = async (values: AboutFormValues) => {
      if (onSave) {
        setIsSubmitting(true);
        try {
          // Combine form values with icon key
          await onSave({
            ...values,
            icon: iconKey,
          });
          
          // Call the onSubmitSuccess callback to close the dialog
          if (onSubmitSuccess) {
            onSubmitSuccess();
          }
        } catch (error) {
          console.error("Error saving profile:", error);
          toast.error("Failed to update profile information");
        } finally {
          setIsSubmitting(false);
        }
      }
    };

    return (
      <div className="space-y-6">
        <div className="flex justify-center">
          <ProfileImageUpload 
            currentImageUrl={profileImageUrl} 
            userInitials={userInitials}
            onImageUploaded={setIconKey}
          />
        </div>

        <Form {...form}>
          <form ref={ref} onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Location</FormLabel>
                  <FormControl>
                    <Input placeholder="City, State" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="contact_number"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contact Number</FormLabel>
                  <FormControl>
                    <Input placeholder="Your phone number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="intro"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>About Me</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Write a short bio about yourself" 
                      className="min-h-32 resize-none" 
                      {...field} 
                    />
                  </FormControl>
                  <FormDescription>Briefly describe your professional background and interests.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Hidden submit button that will be triggered by the dialog's save button */}
            <button type="submit" hidden></button>
          </form>
        </Form>
      </div>
    )
  }
)

// Add display name for React DevTools
EditAboutForm.displayName = "EditAboutForm";

