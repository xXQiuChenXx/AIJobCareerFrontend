import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  jobSchema,
  type JobFormValues,
  jobTypeMap,
} from "@/lib/schemas/company-schema";
import { type JobBasicDTO } from "@/types/job";
import { toast } from "sonner";
import { ALLOWED_CITIES } from "@/types/about-form-schema";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { ScrollArea } from "../ui/scroll-area";

interface JobDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialData?: JobData | null;
  onSubmit: (data: JobFormValues) => Promise<void>;
  title: string;
  description: string;
  submitLabel: string;
  companyId: string;
}

export type JobData = {
  job_id: number;
  job_title: string;
  job_description: string;
  job_requirement?: string;
  job_benefit?: string;
  job_responsible?: string;
  job_type: number;
  job_salary_min: number;
  job_salary_max: number;
  job_location: string;
  job_posted_date: string;
  job_deadline?: string | Date;
};

export default function JobDialog({
  open,
  onOpenChange,
  initialData,
  onSubmit,
  title,
  description,
  submitLabel,
}: JobDialogProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  console.log(initialData)

  // Initialize the form with job data if editing, or empty values if creating
  const form = useForm<JobFormValues>({
    resolver: zodResolver(jobSchema),
    defaultValues: initialData
      ? {
          job_title: initialData.job_title,
          job_description: initialData.job_description,
          job_requirement: initialData.job_requirement || "",
          job_benefit: initialData.job_benefit || "",
          job_responsible: initialData.job_responsible || "",
          job_type: initialData.job_type,
          job_salary_min: initialData.job_salary_min,
          job_salary_max: initialData.job_salary_max,
          job_location: initialData.job_location,
          job_deadline: initialData.job_deadline
            ? new Date(initialData.job_deadline)
            : undefined,
        }
      : {
          job_title: "",
          job_description: "",
          job_requirement: "",
          job_benefit: "",
          job_responsible: "",
          job_type: 0,
          job_salary_min: 0,
          job_salary_max: 0,
          job_location: "",
          job_deadline: undefined,
        },
  });

  async function handleSubmit(data: JobFormValues) {
    setIsSubmitting(true);

    try {
      await onSubmit(data);
      form.reset();
      onOpenChange(false);
      toast(
        initialData ? "Job updated successfully" : "Job created successfully"
      );
    } catch (error) {
      console.error("Error submitting job:", error);
      toast(initialData ? "Failed to update job" : "Failed to create job");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] flex flex-col">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)}>
            <ScrollArea className="h-[60vh]">
              <div className="space-y-6 pr-4 pl-1">
                <FormField
                  control={form.control}
                  name="job_title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Job Title</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter job title" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="job_description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Job Description</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Enter job description"
                          className="min-h-[100px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="job_requirement"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Job Requirements</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Enter job requirements"
                          className="min-h-[100px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="job_benefit"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Job Benefits</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Enter job benefits"
                          className="min-h-[100px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="job_responsible"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Job Responsibilities</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Enter job responsibilities"
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
                    name="job_type"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Job Type</FormLabel>
                        <Select
                          onValueChange={(value) =>
                            field.onChange(Number.parseInt(value))
                          }
                          defaultValue={field.value.toString()}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select job type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {Object.entries(jobTypeMap).map(([key, value]) => (
                              <SelectItem key={key} value={key}>
                                {value}
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
                    name="job_location"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Location</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select location" />
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
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="job_salary_min"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Minimum Salary (RM)</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="0"
                            {...field}
                            onChange={(e) =>
                              field.onChange(Number(e.target.value))
                            }
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="job_salary_max"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Maximum Salary (RM)</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="0"
                            {...field}
                            onChange={(e) =>
                              field.onChange(Number(e.target.value))
                            }
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="job_deadline"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Application Deadline</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              className={cn(
                                "w-full pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value ? (
                                format(field.value, "d MMMM yyyy")
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
                            disabled={(date) => date < new Date()}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </ScrollArea>

            <DialogFooter className="mt-7">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Submitting..." : submitLabel}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
