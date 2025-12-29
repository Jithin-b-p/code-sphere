import { Response } from 'express'
import { AuthRequest } from '../auth/auth.middleware'
import { CreateSubmissionSchema } from './submissions.schema'
import * as service from './submissions.service'

export async function createSubmissionHandler(req: AuthRequest, res: Response) {
  const parse = CreateSubmissionSchema.safeParse(req.body)
  if (!parse.success)
    return res
      .status(400)
      .json({ message: 'Invalid submission', errors: parse.error.format() })

  const user = req.user
  if (!user) return res.status(401).json({ message: 'Unauthorized' })

  try {
    const submission = await service.createSubmission(parse.data, user.userId)
    return res
      .status(201)
      .json({ submissionId: submission.id, status: submission.status })
  } catch (err: unknown) {
    console.error('createSubmission error', err)
    return res.status(500).json({
      message: err instanceof Error ? err.message : 'Internal server error',
    })
  }
}

export async function getSubmissionHandler(req: AuthRequest, res: Response) {
  const id = Number(req.params.id)
  const userId = req.user?.userId

  if (!id) return res.status(400).json({ message: 'Invalid Id' })
  if (!userId) return res.status(401).json({ message: 'Invalid user id' })

  const submission = await service.getSubmissionById(id)

  if (!submission)
    return res.status(404).json({ message: 'Submission not found' })

  if (submission.userId !== userId && req.user?.role !== 'ADMIN')
    return res.status(403).json({ message: 'Forbidden' })

  return res.json(submission)
}

export async function listSubmissionForProblemHandler(
  req: AuthRequest,
  res: Response
) {
  const problemId = Number(req.params.id)
  if (!problemId)
    return res.status(400).json({ message: "Problem doesn't exist" })

  const page = Math.max(1, Number(req.query.page ?? 1))
  const perPage = Math.max(1, Math.min(100, Number(req.query.perPage ?? 20)))

  const user = req.user
  if (!user) return res.status(401).json({ message: 'Unauthorized' })

  const result = await service.listSubmissionsForProblem(
    user.userId,
    problemId,
    { page, perPage }
  )
  return res.json(result)
}
