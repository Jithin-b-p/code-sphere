'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { api } from '@/lib/api'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

type ProblemSummary = {
  id: number
  title: string
  slug: string
  difficulty: string
  createdAt: string
}

export default function ProblemsPage() {
  const [problems, setProblems] = useState<ProblemSummary[]>([])
  const [page, setPage] = useState(1)
  const [total, setTotal] = useState(0)
  const perPage = 20

  useEffect(() => {
    api.get(`/problems?page=${page}&perPage=${perPage}`).then(res => {
      setProblems(res.data.items)
      setTotal(res.data.total)
    }).catch(() => {
      setProblems([])
    })
  }, [page])

  // const totalPages = Math.ceil(total / perPage || 1)

  return <div className="space-y-4">
      <h1 className="text-2xl font-semibold">Problems</h1>

      {problems.map(problem => (
        <Link key={problem.id} href={`/problems/${problem.slug}`}>
          <Card className="hover:bg-muted/50 transition">
            <CardContent className="flex items-center justify-between py-4">
              <span className="font-medium">{problem.title}</span>
              <Badge
                variant={
                  problem.difficulty === "EASY"
                    ? "secondary"
                    : problem.difficulty === "MEDIUM"
                    ? "default"
                    : "destructive"
                }
              >
                {problem.difficulty}
              </Badge>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>

  // return (
  //   <div style={{ padding: 20 }}>
  //     <h1>Problems</h1>
  //     <ul>
  //       {problems.map(p => (
  //         <li key={p.id}>
  //           <Link href={`/problems/${p.slug}`}>
  //             {p.title} — {p.difficulty}
  //           </Link>
  //         </li>
  //       ))}
  //     </ul>

  //     <div style={{ marginTop: 16 }}>
  //       <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}>Prev</button>
  //       <span style={{ margin: '0 8px' }}>{page}/{totalPages}</span>
  //       <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages}>Next</button>
  //     </div>
  //   </div>
  // )
}
