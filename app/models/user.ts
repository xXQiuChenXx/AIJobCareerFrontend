import z from "zod";

export const user = z.object({
  user_id: z.number().optional(),
  username: z.string(),
  user_first_name: z.string().min(2, { message: "First name must be at least 2 characters" }),
  user_last_name: z.string().min(2, { message: "Last name must be at least 2 characters" }),
  user_age: z.number().optional(),
  user_intro: z.string().optional(),
  user_contact_number: z.string().optional(),
  user_email: z.string().email({ message: "Please enter a valid email address" }),
  user_password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" })
    .regex(/[A-Z]/, {
      message: "Password must contain at least one uppercase letter",
    })
    .regex(/[a-z]/, {
      message: "Password must contain at least one lowercase letter",
    })
    .regex(/[0-9]/, { message: "Password must contain at least one number" })
    .regex(/[^A-Za-z0-9]/, {
      message: "Password must contain at least one special character",
    }),
  user_icon: z.string().optional(),
  user_privacy_status: z.string(),
  user_role: z.string(),
  user_account_created_time: z.string(),
  last_login_at: z.string().optional(),
  user_area_id: z.number().optional(),
});

export type userType = z.infer<typeof user>;
