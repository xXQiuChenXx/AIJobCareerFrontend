import z from 'zod'

export const area = z.object({
  AREA_ID: z.number(),
  AREA_NAME: z.string(),
})

export type areaType = z.infer<typeof area>
