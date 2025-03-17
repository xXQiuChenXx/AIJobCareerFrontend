import z from 'zod'

export const user_application = z.object({
  UA_ID: z.number(),
  UA_USER_ID: z.number(),
  UA_APPLICATION_ID: z.number(),
})

export type userApplicationType = z.infer<typeof user_application>
