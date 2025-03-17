import z from 'zod'

export const area = z.object({
  area_id: z.number(),
  area_name: z.string(),
})

export type areaType = z.infer<typeof area>
