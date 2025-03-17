import z from 'zod'

export const company = z.object({
  company_id: z.number(),
  company_name: z.string(),
  company_icon: z.string(),
  company_intro: z.string(),
  company_website: z.string(),
  company_area_id: z.number().nullable(),
})

export type companyType = z.infer<typeof company>
