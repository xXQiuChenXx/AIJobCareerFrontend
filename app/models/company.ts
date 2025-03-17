import z from 'zod'

export const company = z.object({
  COMPANY_ID: z.number(),
  COMPANY_NAME: z.string(),
  COMPANY_ICON: z.string(),
  COMPANY_INTRO: z.string(),
  COMPANY_WEBSITE: z.string(),
  COMPANY_AREA_ID: z.number().nullable(),
})

export type companyType = z.infer<typeof company>
