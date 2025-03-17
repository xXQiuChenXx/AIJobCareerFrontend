import z from 'zod'

export const career_analysis = z.object({
  ANALYSIS_ID: z.number(),
  ANALYSIS_USER_ID: z.number(),
  ANALYSIS_AI_DIRECTION: z.string(),
  ANALYSIS_AI_MARKET_GAP: z.string(),
  ANALYSIS_AI_CAREER_PROSPECTS: z.string(),
})

export type careerAnalysisType = z.infer<typeof career_analysis>
