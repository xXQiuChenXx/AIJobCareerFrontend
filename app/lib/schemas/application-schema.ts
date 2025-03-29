import * as z from "zod";

export const jobApplicationSchema = z.object({
  firstName: z
    .string()
    .min(2, { message: "First name must be at least 2 characters." }),
  lastName: z
    .string()
    .min(2, { message: "Last name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  phone: z.string().min(10, { message: "Please enter a valid phone number." }),
  linkedIn: z
    .string()
    .url({ message: "Please enter a valid URL." })
    .optional()
    .or(z.literal("")),
  portfolio: z
    .string()
    .url({ message: "Please enter a valid URL." })
    .optional()
    .or(z.literal("")),
  experience: z
    .string()
    .min(1, { message: "Please select your experience level." }),
  education: z
    .string()
    .min(1, { message: "Please select your highest education." }),
  skills: z.string().min(5, { message: "Please list your relevant skills." }),
  availability: z
    .string()
    .min(1, { message: "Please select your availability." }),
  relocate: z.boolean(),
  salary: z
    .string()
    .min(1, { message: "Please select your salary expectation." }),
  coverLetter: z
    .string()
    .min(50, { message: "Cover letter must be at least 50 characters." }),
  termsAccepted: z.literal(true, {
    errorMap: () => ({ message: "You must accept the terms and conditions." }),
  }),
});

export type JobApplicationFormValues = z.infer<typeof jobApplicationSchema>;
