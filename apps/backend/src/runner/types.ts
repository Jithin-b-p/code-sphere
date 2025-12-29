export interface RunInput {
  code: string
  input: string
  timeLimitMs: number
}

export interface RunOutput {
  stdout: string
  stderr?: string
  exitCode: number
  timeMs: number
}

export interface Runner {
  run(input: RunInput): Promise<RunOutput>
}
