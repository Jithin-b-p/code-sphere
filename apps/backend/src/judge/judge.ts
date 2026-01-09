import { getRunner } from '../runner'
import { normalizeOutput } from '../runner/normalize'
import type { JudgeResult } from './types'

export async function judgeSubmission({
  code,
  language,
  testCases,
  timeLimitMs,
}: {
  code: string
  language: string
  testCases: { input: string; output: string }[]
  timeLimitMs: number
}): Promise<JudgeResult> {
  const runner = getRunner(language)
  let totalTime = 0

  for (let i = 0; i < testCases.length; i++) {
    const tc = testCases[i]

    const result = await runner.run({
      code,
      input: tc.input,
      timeLimitMs,
    })

    totalTime += result.timeMs

    if (result.timedOut) {
      return {
        status: 'TIME_LIMIT_EXCEEDED',
        failedTestIndex: i,
        timeMs: totalTime,
      }
    }

    if (result.exitCode !== 0) {
      return {
        status: 'RUNTIME_ERROR',
        failedTestIndex: i,
        actual: (result.stderr || '').slice(0, 512),
        timeMs: totalTime,
      }
    }

    const actual = normalizeOutput(result.stdout)
    const expected = normalizeOutput(tc.output)

    if (actual !== expected) {
      return {
        status: 'WRONG_ANSWER',
        failedTestIndex: i,
        expected,
        actual,
        timeMs: totalTime,
      }
    }
  }

  return { status: 'ACCEPTED', timeMs: totalTime }
}
