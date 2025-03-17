import z from 'zod'

export const notification = z.object({
  notification_id: z.number(),
  notification_user_id: z.number().nullable(),
  notification_company_id: z.number().nullable(),
  notification_text: z.string(),
  notification_timestamp: z.string(),
  notification_status: z.string(),
})

export type notificationType = z.infer<typeof notification>
