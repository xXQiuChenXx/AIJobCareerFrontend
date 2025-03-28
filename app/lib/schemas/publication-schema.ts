import { z } from "zod";

// Regular expression for validating URLs
const urlRegex =
  /^(https?:\/\/)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/;

export const publicationSchema = z.object({
  publication_id: z.string(),
  user_id: z.string().nullable(),
  publication_title: z
    .string()
    .min(1, "Title is required")
    .max(200, "Title cannot exceed 200 characters"),
  publisher: z.string().max(100, "Publisher name cannot exceed 100 characters"),
  publication_year: z
    .number()
    .int("Year must be a whole number")
    .min(1900, "Year must be 1900 or later")
    .max(new Date().getFullYear(), "Year cannot be in the future"),
  publication_url: z
    .string()
    .refine((val) => val === "" || urlRegex.test(val), {
      message: "Please enter a valid URL (e.g., https://example.com)",
    }),
  description: z.string().max(500, "Description cannot exceed 500 characters"),
});

export const publicationsFormSchema = z.object({
  publications: z.array(publicationSchema),
});

export type PublicationFormValues = z.infer<typeof publicationsFormSchema>;
