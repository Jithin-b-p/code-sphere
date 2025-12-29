import { getRunner } from '../runner'
import { normalizeOutput } from '../runner/normalize'
import { JudgeInput, JudgeResult } from './types'

export async function judgeSubmission({
  code,
  language,
  testCases,
  timeLimitMs,
}: JudgeInput): Promise<JudgeResult> {
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

  return {
    status: 'ACCEPTED',
    timeMs: totalTime,
  }
}
