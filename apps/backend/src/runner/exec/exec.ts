import { RunOutput } from '../types'
import { spawn } from 'child_process'
import { MAX_OUTPUT_SIZE } from './limits'

export function execProcess(
  command: string,
  args: string[],
  input: string,
  cwd: string,
  timeLimitMs: number
): Promise<RunOutput> {
  return new Promise((resolver) => {
    const start = Date.now()

    const proc = spawn(command, args, {
      cwd,
      stdio: ['pipe', 'pipe', 'pipe'],
      env: {},
      detached: false,
    })

    let stdout = ''
    let stderr = ''
    let timedOut = false

    const timer = setTimeout(() => {
      timedOut = true
      proc.kill('SIGKILL')
    }, timeLimitMs)

    proc.stdout.on('data', (chunk) => {
      stdout += chunk.toString()

      if (stdout.length > MAX_OUTPUT_SIZE) {
        stdout = stdout.slice(0, MAX_OUTPUT_SIZE)
        proc.kill('SIGKILL')
      }
    })

    proc.stderr.on('data', (chunk) => {
      stderr += chunk.toString()

      if (stderr.length > MAX_OUTPUT_SIZE) {
        stderr = stderr.slice(0, MAX_OUTPUT_SIZE)
        proc.kill('SIGKILL')
      }
    })

    proc.on('close', (code) => {
      clearTimeout(timer)
      resolver({
        stdout,
        stderr,
        timeMs: Date.now() - start,
        exitCode: timedOut ? -1 : (code ?? -1),
        timedOut,
      })
    })
    proc.stdin.write(input)
    proc.stdin.end()
  })
}
