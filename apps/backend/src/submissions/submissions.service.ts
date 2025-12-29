import { queueSubmission } from '../jobs/queue'
import { prisma } from '../prisma'
import { CreateSubmmissionType } from './submissions.schema'

export async function createSubmission(
  data: CreateSubmmissionType,
  userId: number
) {
  const problem = await prisma.problem.findUnique({
    where: { id: data.problemId },
  })

  if (!problem) throw new Error('Problem not found')

  const submission = await prisma.submission.create({
    data: {
      userId,
      problemId: data.problemId,
      language: data.language,
      code: data.code,
      status: 'PENDING',
    },
  })

  queueSubmission({ submissionId: submission.id })

  return submission
}

export async function getSubmissionById(id: number) {
  return await prisma.submission.findUnique({
    where: { id },
    include: { testResults: { orderBy: { testIndex: 'asc' } } },
  })
}

export async function listSubmissionsForProblem(
  userId: number,
  problemId: number,
  { page = 1, perPage = 20 } = {}
) {
  const skip = (page - 1) * perPage
  const [items, total] = await Promise.all([
    prisma.submission.findMany({
      where: { userId, problemId },
      orderBy: { createdAt: 'desc' },
      skip,
      take: perPage,
      include: { testResults: false },
    }),

    prisma.submission.count({ where: { userId, problemId } }),
  ])

  return { items, total, page, perPage }
}
