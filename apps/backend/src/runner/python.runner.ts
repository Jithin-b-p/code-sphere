import fs from 'fs/promises'
import path from 'path'
import { execProcess } from './exec/exec'
import { createTempDir, cleanupTempDir } from './exec/temp'
import type { Runner, RunInput, RunOutput } from './types'

export class PythonRunner implements Runner {
  async run(input: RunInput): Promise<RunOutput> {
    const dir = await createTempDir()
    try {
      const file = path.join(dir, 'solution.py')

      await fs.writeFile(file, input.code)

      return await execProcess(
        'python3',
        [file],
        input.input,
        dir,
        input.timeLimitMs
      )
    } finally {
      await cleanupTempDir(dir)
    }
  }
}
