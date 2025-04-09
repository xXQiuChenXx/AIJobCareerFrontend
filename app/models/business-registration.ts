import z from "zod";
import { company_industries } from "@/sample-data/company";

export const businessRegistrationSchema = z
  .object({
    // User information
    Username: z.string().min(3, "Username must be at least 3 characters"),
    FirstName: z.string().min(1, "First name is required"),
    LastName: z.string().min(1, "Last name is required"),
    Email: z.string().email("Invalid email format"),
    Password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(
      /[^A-Za-z0-9]/,
      "Password must contain at least one special character"
    ),
    Age: z.number().optional(),
    UserIntro: z.string().optional(),
    ContactNumber: z.string().optional(),
    UserIcon: z.string().optional(),
    PrivacyStatus: z.string().optional(),
    UserAreaId: z.number().optional(),
    confirm_password: z.string(),
    
    // Company information
    CompanyID: z.string(),
    CompanyName: z.string().min(1, "Company name is required"),
    CompanyIntro: z.string().optional(),
    CompanyWebsite: z.string().url("Invalid URL format").optional(),
    CompanyIndustry: z
      .enum([...company_industries] as [string, ...string[]])
      .optional(),
    CompanyIcon: z.string().optional(),
    CompanyAreaId: z.number().optional(),
  })
  .superRefine(({ Password, confirm_password }, ctx) => {
    if (Password !== confirm_password) {
      ctx.addIssue({
        code: "custom",
        message: "The passwords did not match",
        path: ["confirm_password"],
      });
    }
  });

export type BusinessRegistration = z.infer<typeof businessRegistrationSchema>;
