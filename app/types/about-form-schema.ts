import { z } from "zod";

export const ALLOWED_CITIES = [
  "Kuching",
  "Miri",
  "Sibu",
  "Bintulu",
  "Samarahan",
  "Sri Aman",
  "Kapit",
  "Limbang",
  "Sarikei",
  "Betong",
] as const;

export const PRIVACY_STATUS = ["private", "public"] as const;

export const aboutFormSchema = z.object({
  user_first_name: z.string().min(1, { message: "First name is required." }),
  user_last_name: z.string().min(1, { message: "Last name is required." }),
  user_age: z
    .number()
    .int()
    .min(18, { message: "You must be at least 18 years old." })
    .optional()
    .or(z.string().regex(/^\d+$/).transform(Number).optional()),
  user_email: z
    .string()
    .email({ message: "Please enter a valid email address." })
    .optional(),
  area_name: z
    .enum(ALLOWED_CITIES, {
      errorMap: () => ({ message: "Please select a valid city" }),
    })
    .optional()
    .or(z.literal("")),
  user_privacy_status: z.enum(PRIVACY_STATUS, {
    errorMap: () => ({ message: "Please select a valid privacy status" }),
  }).default("private"),
  user_intro: z
    .string()
    .min(10, { message: "About me must be at least 10 characters." })
    .optional()
    .or(z.literal("")),
  user_contact_number: z.string().optional(),
});

export type AboutFormValues = z.infer<typeof aboutFormSchema>;
