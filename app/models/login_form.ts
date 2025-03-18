import z from "zod";

export const LoginFormSchema = z.object({
  username_or_email: z.string(),
  password: z.string(),
});

export type LoginFormType = z.infer<typeof LoginFormSchema>;
