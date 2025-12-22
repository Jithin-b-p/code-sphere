export type Difficulty = 'EASY' | 'MEDIUM' | 'HARD'

export interface TestCase {
  id: number
  input: string
  output: string
}

export interface Problem {
  id: number
  title: string
  slug: string
  description: string
  difficulty: Difficulty
  timeLimitMs: number
  memoryMb: number
  createdAt: string
  testCases: TestCase[]
}

export type Language = 'javascript' | 'python'
