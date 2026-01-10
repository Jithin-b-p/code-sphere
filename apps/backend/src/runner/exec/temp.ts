import fs from 'fs/promises'
import os from 'os'
import path from 'path'

export async function createTempDir(): Promise<string> {
  return fs.mkdtemp(path.join(os.tmpdir(), 'codesphere-'))
}

export async function cleanupTempDir(dir: string) {
  await fs.rm(dir, { recursive: true, force: true })
}
