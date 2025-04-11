import { useState, forwardRef, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import type { BasicInfo } from "@/types/user";
import { ProfileImageUpload } from "./profile-image-upload";
import { toast } from "sonner";
import { FileService } from "@/services/file-service";
import {
  aboutFormSchema,
  ALLOWED_CITIES,
  PRIVACY_STATUS,
  type AboutFormValues,
} from "@/types/about-form-schema";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface EditAboutFormProps {
  profile?: BasicInfo;
  onSave?: (data: Partial<BasicInfo>) => Promise<void>;
  onSubmitSuccess?: () => void;
  userInitials: string;
  registerSubmit?: (submitFn: () => Promise<void>) => void;
}

export const EditAboutForm = forwardRef<HTMLFormElement, EditAboutFormProps>(
  ({ profile, onSave, userInitials, registerSubmit, onSubmitSuccess }, ref) => {
    const [iconKey, setIconKey] = useState<string>(profile?.icon || "");

    // Set default values from the profile data if provided
    const defaultValues: AboutFormValues = {
      user_first_name: profile?.first_name || "",
      user_last_name: profile?.last_name || "",
      user_age: profile?.age || 0,
      user_email: profile?.email || "",
      area_name: profile?.location || ("" as any),
      user_intro: profile?.intro || "",
      user_contact_number: profile?.contact_number || "",
      user_privacy_status:
        profile?.privacy_status === "public" ? "public" : "private",
    };

    const form = useForm<AboutFormValues>({
      resolver: zodResolver(aboutFormSchema),
      defaultValues,
      mode: "onChange",
    });

    const handleSubmit = async (values: AboutFormValues) => {
      if (onSave) {
        try {
          let profileIconUrl = FileService.getFileUrl(iconKey);
          const updateData: Partial<BasicInfo> = {
            first_name: values.user_first_name,
            last_name: values.user_last_name,
            age: values.user_age as number | undefined,
            email: values.user_email,
            location: values.area_name,
            intro: values.user_intro,
            contact_number: values.user_contact_number,
            icon: iconKey ? profileIconUrl : undefined,
            privacy_status: values?.user_privacy_status,
          };

          // Send the profile update
          await onSave(updateData);

          await onSubmitSuccess?.();

          toast.success("Profile updated successfully");
        } catch (error) {
          console.error("Error saving profile:", error);
          toast.error("Failed to update profile information");
        }
      }
    };

    // Register the submit function with the parent dialog
    useEffect(() => {
      if (registerSubmit) {
        registerSubmit(async () => {
          const isValid = await form.trigger();
          if (isValid) {
            const values = form.getValues();
            await handleSubmit(values);
            return Promise.resolve();
          }
          return Promise.reject(new Error("Form validation failed"));
        });
      }
    }, [registerSubmit, form]);

    return (
      <div className="space-y-6">
        <div className="flex justify-center">
          <ProfileImageUpload
            currentImageUrl={profile?.icon}
            userInitials={userInitials}
            onImageUploaded={setIconKey}
          />
        </div>

        <Form {...form}>
          <form
            ref={ref}
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-4"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="user_first_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                      <Input placeholder="First Name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="user_last_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Last Name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="user_age"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Age</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Your age"
                        {...field}
                        onChange={(e) =>
                          field.onChange(
                            e.target.value === ""
                              ? undefined
                              : parseInt(e.target.value)
                          )
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="user_email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="Your email address" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="area_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Location</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select your city" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {ALLOWED_CITIES.map((city) => (
                          <SelectItem key={city} value={city}>
                            {city}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      Select your city in Sarawak
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="user_privacy_status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Profile Privacy</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select privacy status" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {PRIVACY_STATUS.map((status) => (
                          <SelectItem key={status} value={status}>
                            {status.charAt(0).toUpperCase() + status.slice(1)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      Control who can see your profile
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="user_contact_number"
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
              name="user_intro"
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
                  <FormDescription>
                    Briefly describe your professional background and interests.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Hidden submit button that will be triggered by the dialog's save button */}
            <button type="submit" hidden></button>
          </form>
        </Form>
      </div>
    );
  }
);

// Add display name for React DevTools
EditAboutForm.displayName = "EditAboutForm";
