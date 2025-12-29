import { submissionQueue } from './queue'
import { prisma } from '../prisma'
import { judgeSubmission } from '../judge/judge'

submissionQueue.on('job', async ({ submissionId }) => {
  console.log(`[worker] picked job submission=${submissionId}`)

  try {
    await prisma.submission.update({
      where: { id: submissionId },
      data: { status: 'RUNNING' },
    })

    const submission = await prisma.submission.findUnique({
      where: { id: submissionId },
    })
    if (!submission) {
      console.error('[worker] submission not found', submissionId)
      return
    }

    const problem = await prisma.problem.findUnique({
      where: { id: submission.problemId },
      include: { testCases: true },
    })
    if (!problem) {
      await prisma.submission.update({
        where: { id: submissionId },
        data: { status: 'FAILED', errorMsg: 'Problem not found' },
      })
      return
    }

    const result = await judgeSubmission({
      code: submission.code,
      language: submission.language,
      testCases: problem.testCases.map((tc) => ({
        input: tc.input,
        output: tc.output,
      })),
      timeLimitMs: problem.timeLimitMs,
    })

    await prisma.submission.update({
      where: { id: submissionId },
      data: {
        status: result.status,
        timeMs: result.timeMs,
        errorMsg:
          result.status !== 'ACCEPTED'
            ? `Failed at test ${result.failedTestIndex}`
            : null,
      },
    })
  } catch (err) {
    console.error('[worker] processing error', err)
    await prisma.submission.update({
      where: { id: submissionId },
      data: {
        status: 'FAILED',
        errorMsg: err instanceof Error ? err.message : 'error',
      },
    })
  }
})
