import z from 'zod'

export const user = z.object({
  USER_ID: z.number(),
  USERNAME: z.string(),
  USER_FIRST_NAME: z.string(),
  USER_LAST_NAME: z.string(),
  USER_AGE: z.number().nullable(),
  USER_INTRO: z.string().nullable(),
  USER_CONTACT_NUMBER: z.string().nullable(),
  USER_EMAIL: z.string(),
  USER_PASSWORD: z.string(),
  USER_ICON: z.string().nullable(),
  USER_PRIVACY_STATUS: z.string(),
  USER_ROLE: z.string(),
  USER_ACCOUNT_CREATED_TIME: z.string(),
  LastLoginAt: z.string().nullable(),
  USER_AREA_ID: z.number().nullable(),
})

export type userType = z.infer<typeof user>
