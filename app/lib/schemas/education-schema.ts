import * as z from "zod";

export const educationSchema = z
  .object({
    education_id: z.string(),
    user_id: z.string().optional(),
    degree_name: z.string().min(1, "Degree name is required"),
    institution_name: z.string().min(1, "Institution name is required"),
    start_year: z
      .number({
        required_error: "Start year is required",
        invalid_type_error: "Start year must be a number",
      })
      .int()
      .min(1950, "Start year must be at least 1950")
      .max(new Date().getFullYear(), "Start year cannot be in the future"),
    end_year: z
      .number({
        invalid_type_error: "End year must be a number",
      })
      .int()
      .min(1980, "End year must be at least 1980")
      .max(
        new Date().getFullYear() + 10,
        "End year cannot be too far in the future"
      )
      .optional()
      .refine((val) => val === undefined || val === null || val >= 1900, {
        message: "End year must be at least 1900",
      }),
    description: z.string(),
  })
  .refine((data) => !data.end_year || data.start_year <= data.end_year, {
    message: "Start year must be before end year",
    path: ["start_year"],
  });

export const certificateSchema = z
  .object({
    certification_id: z.string().optional(),
    user_id: z.string().optional(),
    certification_name: z.string().min(1, "Certification name is required"),
    issuing_organization: z.string().min(1, "Issuing organization is required"),
    issue_date: z.string().min(1, "Issue date is required"),
    expiry_date: z.string().optional(),
    credential_id: z.string().optional(),
    credential_url: z
      .string()
      .url("Please enter a valid URL")
      .optional()
      .or(z.literal("")),
  })
  .refine(
    (data) =>
      !data.expiry_date ||
      new Date(data.issue_date) <= new Date(data.expiry_date),
    {
      message: "Issue date must be before expiry date",
      path: ["issue_date"],
    }
  );

export type EducationFormValues = z.infer<typeof educationSchema>;
export type CertificateFormValues = z.infer<typeof certificateSchema>;
