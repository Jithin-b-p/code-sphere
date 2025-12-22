'use client'
import { useEffect, useState } from 'react'
import Editor from '@monaco-editor/react'
import { api } from '@/lib/api'
import { useRouter } from 'next/navigation'
import { Language, Problem } from '@/types/problem'


export default function ProblemClient({slug}: {slug:string}) {
  const [problem, setProblem] = useState<Problem | null>(null)
  const [code, setCode] = useState<string>(`// write your solution here`)
  const [language, setLanguage] = useState<'javascript'|'python'>('javascript')

  const router = useRouter()

  useEffect(() => {
    api.get<Problem>(`/problems/${slug}`).then(res => setProblem(res.data)).catch(() => {
      router.push('/problems')
    })
  }, [slug, router])

  if (!problem) return <p>Loading...</p>

  return (
    <div style={{ padding: 16 }}>
      <h1>{problem.title}</h1>
      <p>{problem.description}</p>

      <div style={{ margin: '16px 0' }}>
        <label>
          Language:
          <select value={language} onChange={(e) => setLanguage(e.target.value as Language)}>
            <option value="javascript">JavaScript</option>
            <option value="python">Python</option>
          </select>
        </label>
      </div>

      <Editor
        height="500px"
        defaultLanguage={language}
        value={code}
        onChange={(v) => setCode(v || '')}
      />

      <div style={{ marginTop: 12 }}>
        <button onClick={() => alert('Submission pipeline to be added in Week 5')}>Run / Submit</button>
      </div>
    </div>
  )
}
