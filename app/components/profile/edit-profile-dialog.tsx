import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CalendarIcon, Upload } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { CompanyService } from "@/services/company-service";
import { toast } from "sonner";
import type { JobBasicDTO } from "@/types/job";
import { ALLOWED_CITIES } from "@/types/about-form-schema";
import { company_industries } from "@/sample-data/company";

// Define the schema for company profile validation
const companyProfileSchema = z.object({
  company_name: z.string().min(2, {
    message: "Company name must be at least 2 characters.",
  }),
  company_intro: z.string().min(10, {
    message: "Company introduction must be at least 10 characters.",
  }),
  company_website: z.string().url({
    message: "Please enter a valid URL.",
  }),
  company_industry: z.string().min(2, {
    message: "Industry must be at least 2 characters.",
  }),
  company_area_name: z.string().min(2, {
    message: "Location must be at least 2 characters.",
  }),
  company_founded: z.date({
    required_error: "Please select a date.",
  }),
});

type CompanyProfileFormValues = z.infer<typeof companyProfileSchema>;

type CompanyData = {
  company_id: string;
  company_name: string;
  company_icon: string;
  company_founded: string;
  company_intro: string;
  company_website: string;
  company_industry: string;
  company_area_name?: string;
  jobs: JobBasicDTO[];
};

interface EditProfileDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  companyData: CompanyData;
  onUpdate: (data: CompanyData) => void;
}

export default function EditProfileDialog({
  open,
  onOpenChange,
  companyData,
  onUpdate,
}: EditProfileDialogProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState<string | null>(
    companyData.company_icon
      ? CompanyService.getCompanyLogoUrl(companyData.company_icon)
      : null
  );

  // Initialize the form with company data
  const form = useForm<CompanyProfileFormValues>({
    resolver: zodResolver(companyProfileSchema),
    defaultValues: {
      company_name: companyData.company_name,
      company_intro: companyData.company_intro,
      company_website: companyData.company_website,
      company_industry: companyData.company_industry,
      company_area_name: companyData.company_area_name,
      company_founded: companyData.company_founded
        ? new Date(companyData.company_founded)
        : new Date(),
    },
  });

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setLogoFile(file);
      const objectUrl = URL.createObjectURL(file);
      setLogoPreview(objectUrl);
    }
  };

  async function onSubmit(data: CompanyProfileFormValues) {
    setIsSubmitting(true);
    try {
      let logoKey = companyData.company_icon;

      // Upload new logo if selected
      if (logoFile) {
        try {
          logoKey = await CompanyService.uploadCompanyLogo(logoFile);
        } catch (error) {
          console.error("Error uploading logo:", error);
          toast("Failed to upload company logo");
          setIsSubmitting(false);
          return;
        }
      }

      // Update the company data with form values
      const updatedData = {
        ...companyData,
        ...data,
        company_icon: logoKey,
        company_founded: data.company_founded.toISOString(), // Convert Date to ISO string
      };

      // Call the API to update company
      await CompanyService.updateCompany(companyData.company_id, {
        company_name: updatedData.company_name,
        company_icon: logoKey,
        company_intro: updatedData.company_intro,
        company_website: updatedData.company_website,
        company_founded: updatedData.company_founded,
        company_industry: updatedData.company_industry,
        company_area_name: updatedData.company_area_name,
      });

      onUpdate(updatedData);
      toast("Company profile updated successfully");
    } catch (error) {
      console.error("Error updating profile:", error);
      toast("Failed to update company profile");
    } finally {
      setIsSubmitting(false);
      onOpenChange(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Edit Company Profile</DialogTitle>
          <DialogDescription>
            Update your company information. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="flex flex-col items-center mb-4">
              <div className="mb-2 relative w-24 h-24 rounded-full overflow-hidden border-2 border-gray-200">
                {logoPreview ? (
                  <img
                    src={logoPreview}
                    alt="Company Logo"
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                    <span className="text-gray-400">Logo</span>
                  </div>
                )}
              </div>
              <div className="mt-2">
                <label htmlFor="logo-upload" className="cursor-pointer">
                  <div className="flex items-center gap-1 text-sm text-blue-500 hover:text-blue-600">
                    <Upload size={16} />
                    <span>
                      {companyData.company_icon ? "Change Logo" : "Upload Logo"}
                    </span>
                  </div>
                  <input
                    id="logo-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleLogoChange}
                    className="hidden"
                  />
                </label>
              </div>
            </div>

            <FormField
              control={form.control}
              name="company_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Company Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter company name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="company_intro"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Company Introduction</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter company introduction"
                      className="min-h-[100px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="company_website"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Website</FormLabel>
                    <FormControl>
                      <Input placeholder="https://example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="company_industry"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Industry</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select an industry" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {company_industries.map((industry) => (
                          <SelectItem key={industry} value={industry}>
                            {industry}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="company_area_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Location</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field?.value}
                      {...field}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a location" />
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
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="company_founded"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Founded Date</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) =>
                            date > new Date() || date < new Date("1900-01-01")
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormDescription>
                      Date when the company was founded
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Saving..." : "Save Changes"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
