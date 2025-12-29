import type { Runner, RunInput, RunOutput } from './types'

export class JavaScriptRunner implements Runner {
  async run(input: RunInput): Promise<RunOutput> {
    // MOCK execution (Day 3 replaces this)
    const start = Date.now()

    // Simulate correct behavior
    const stdout = input.input.includes('fail')
      ? 'wrong-output'
      : 'expected-output'

    return {
      stdout,
      exitCode: 0,
      timeMs: Date.now() - start,
    }
  }
}
