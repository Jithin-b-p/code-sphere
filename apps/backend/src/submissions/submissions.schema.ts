import { z } from 'zod'

export const CreateSubmissionSchema = z.object({
  problemId: z.number().int().positive(),
  language: z.enum(['javascript', 'python']),
  code: z.string().min(1).max(200_000),
})

export type CreateSubmmissionType = z.infer<typeof CreateSubmissionSchema>
