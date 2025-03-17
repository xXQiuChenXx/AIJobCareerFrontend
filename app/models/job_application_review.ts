import z from 'zod'

export const job_application_review = z.object({
  REVIEW_ID: z.number(),
  REVIEW_APPLICATION_ID: z.number(),
  REVIEW_COMPANY_ID: z.number(),
  REVIEW_STATUS: z.string(),
  REVIEW_CONTEXT: z.string(),
  REVIEW_DATE: z.string(),
})

export type jobApplicationReviewType = z.infer<typeof job_application_review>
