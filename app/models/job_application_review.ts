import z from 'zod'

export const job_application_review = z.object({
  review_id: z.number(),
  review_application_id: z.number(),
  review_company_id: z.number(),
  review_status: z.string(),
  review_context: z.string(),
  review_date: z.string(),
})

export type jobApplicationReviewType = z.infer<typeof job_application_review>
