import z from 'zod'

export const career_analysis = z.object({
  analysis_id: z.number(),
  analysis_user_id: z.number(),
  analysis_ai_direction: z.string(),
  analysis_ai_market_gap: z.string(),
  analysis_ai_career_prospects: z.string(),
})

export type careerAnalysisType = z.infer<typeof career_analysis>
