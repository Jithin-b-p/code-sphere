import { submissionQueue } from './queue'
import { prisma } from '../prisma'
import { judgeSubmission } from '../judge/judge'

submissionQueue.on('job', async ({ submissionId }) => {
  console.log(`[worker] picked job submission=${submissionId}`)

  try {
    const submission = await prisma.submission.findUnique({
      where: { id: submissionId },
    })
    if (!submission) {
      console.error('[worker] submission not found', submissionId)
      return
    }

    await prisma.submission.update({
      where: { id: submissionId },
      data: { status: 'RUNNING' },
    })

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
          result.status === 'RUNTIME_ERROR'
            ? 'Runtime error'
            : result.status === 'TIME_LIMIT_EXCEEDED'
              ? 'Time limit exceeded'
              : result.status === 'WRONG_ANSWER'
                ? `Wrong answer on test ${result.failedTestIndex}`
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
