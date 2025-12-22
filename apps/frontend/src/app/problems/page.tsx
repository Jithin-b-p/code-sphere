'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

import { api } from '@/lib/api'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'

type ProblemSummary = {
  id: number
  title: string
  slug: string
  difficulty: 'EASY' | 'MEDIUM' | 'HARD'
  createdAt: string
}

export default function ProblemsPage() {
  const [problems, setProblems] = useState<ProblemSummary[]>([])
  const [page, setPage] = useState(1)
  const [total, setTotal] = useState(0)

  const perPage = 20
  const totalPages = Math.max(1, Math.ceil(total / perPage))
  

  useEffect(() => {
    api
      .get(`/problems?page=${page}&perPage=${perPage}`)
      .then(res => {
        setProblems(res.data.items)
        setTotal(res.data.total)
      })
      .catch(() => setProblems([]))
  }, [page])

  return (
    <div className="mx-auto max-w-5xl space-y-6 px-4 py-8">
      {/* Page Header */}
      <div className="space-y-1">
        <h1 className="text-3xl font-semibold tracking-tight">
          Problems
        </h1>
        <p className="text-sm text-muted-foreground">
          Solve curated coding problems and improve your skills
        </p>
      </div>

      <Separator />

      {/* List Container */}
      <Card className="overflow-hidden">
        {/* Table Header */}
        <div className="grid grid-cols-[80px_1fr_120px] border-b bg-muted/40 px-6 py-3 text-sm font-medium text-muted-foreground">
          <span>#</span>
          <span>Title</span>
          <span className="text-right">Difficulty</span>
        </div>

        {/* Rows */}
        {problems.length === 0 ? (
          <div className="py-12 text-center text-sm text-muted-foreground">
            No problems available.
          </div>
        ) : (
          problems.map((problem, index) => (
            <Link
              key={problem.id}
              href={`/problems/${problem.slug}`}
              className="block focus:outline-none"
            >
              <div className="grid grid-cols-[80px_1fr_120px] items-center px-6 py-4 transition hover:bg-muted/50 focus-visible:ring-2 focus-visible:ring-ring">
                {/* Index */}
                <span className="text-sm text-muted-foreground">
                  {(page - 1) * perPage + index + 1}
                </span>

                {/* Title */}
                <span className="font-medium">
                  {problem.title}
                </span>

                {/* Difficulty */}
                <div className="flex justify-end">
                  <Badge
                    variant={
                      problem.difficulty === 'EASY'
                        ? 'secondary'
                        : problem.difficulty === 'MEDIUM'
                        ? 'default'
                        : 'destructive'
                    }
                  >
                    {problem.difficulty}
                  </Badge>
                </div>
              </div>
            </Link>
          ))
        )}
      </Card>

      {/* Pagination */}
      <div className="flex items-center justify-between pt-2">
        <p className="text-sm text-muted-foreground">
          Page {page} of {totalPages}
        </p>

        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            disabled={page === 1}
            onClick={() => setPage(p => p - 1)}
          >
            Previous
          </Button>

          <Button
            variant="outline"
            size="sm"
            disabled={page === totalPages}
            onClick={() => setPage(p => p + 1)}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}
