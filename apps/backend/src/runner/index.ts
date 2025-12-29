import { JavaScriptRunner } from './javascript.runner'
import { PythonRunner } from './python.runner'
import type { Runner } from './types'

export function getRunner(language: string): Runner {
  switch (language) {
    case 'javascript':
      return new JavaScriptRunner()
    case 'python':
      return new PythonRunner()
    default:
      throw new Error(`Unsupported language: ${language}`)
  }
}
