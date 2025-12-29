export interface JudgeResult {
  status: 'ACCEPTED' | 'WRONG_ANSWER' | 'RUNTIME_ERROR'
  failedTestIndex?: number
  expected?: string
  actual?: string
  timeMs?: number
}

export type JudgeInput = {
  code: string
  language: string
  testCases: { input: string; output: string }[]
  timeLimitMs: number
}
