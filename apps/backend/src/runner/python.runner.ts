import type { Runner, RunInput, RunOutput } from './types'

export class PythonRunner implements Runner {
  async run(input: RunInput): Promise<RunOutput> {
    const start = Date.now()

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
