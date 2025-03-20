import { user } from "@/models/user";
import { z } from "zod";

export const RegisterFormSchema = user
  .extend({
    confirm_password: z.string(),
    terms_accepted: z.boolean().refine(val => val === true, {
      message: "You must accept the terms and conditions"
    }),
  })
  .superRefine(({ user_password, confirm_password }, ctx) => {
    if (user_password !== confirm_password) {
      ctx.addIssue({
        code: "custom",
        message: "The passwords did not match",
        path: ["confirm_password"],
      });
    }
  });

export type RegisterFormType = z.infer<typeof RegisterFormSchema>;
