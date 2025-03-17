import z from 'zod'

export const notification = z.object({
  NOTIFICATION_ID: z.number(),
  NOTIFICATION_USER_ID: z.number().nullable(),
  NOTIFICATION_COMPANY_ID: z.number().nullable(),
  NOTIFICATION_TEXT: z.string(),
  NOTIFICATION_TIMESTAMP: z.string(),
  NOTIFICATION_STATUS: z.string(),
})

export type notificationType = z.infer<typeof notification>
