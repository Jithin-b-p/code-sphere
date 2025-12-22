'use client'

import { useEffect, useState } from 'react'
import Editor from '@monaco-editor/react'
import { api } from '@/lib/api'
import { useRouter } from 'next/navigation'
import { Language, Problem } from '@/types/problem'

import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"

// Icons
import { Play, Send, Settings, ChevronLeft, Code2, ListChecks } from 'lucide-react'
import { useTheme } from 'next-themes'


export default function ProblemClient({ slug }: { slug: string }) {
  const [problem, setProblem] = useState<Problem | null>(null)
  const [code, setCode] = useState<string>(`// write your solution here`)
  const [language, setLanguage] = useState<'javascript' | 'python'>('javascript')

  const router = useRouter()

  // Theme Logic
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setMounted(true)
    }, 0)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    api.get<Problem>(`/problems/${slug}`)
      .then(res => setProblem(res.data))
      .catch(() => router.push('/problems'))
  }, [slug, router])

  // Mock difficulty color logic (assuming problem object might have difficulty field later)
  const getDifficultyColor = (diff: string = 'Medium') => {
    switch (diff.toLowerCase()) {
      case 'easy': return 'text-green-500 bg-green-500/10 hover:bg-green-500/20 border-green-500/20';
      case 'medium': return 'text-yellow-500 bg-yellow-500/10 hover:bg-yellow-500/20 border-yellow-500/20';
      case 'hard': return 'text-red-500 bg-red-500/10 hover:bg-red-500/20 border-red-500/20';
      default: return 'text-muted-foreground';
    }
  }

  // Loading State
  if (!problem || !mounted) {
    return (
      <div className="h-screen p-4 space-y-4 bg-background">
        <Skeleton className="h-12 w-full rounded-lg" />
        <div className="flex gap-4 h-[calc(100vh-100px)]">
          <Skeleton className="w-1/2 h-full rounded-lg" />
          <Skeleton className="w-1/2 h-full rounded-lg" />
        </div>
      </div>
    )
  }

  return (
    <div className="h-screen flex flex-col bg-background overflow-hidden">
      {/* 1. Modern Top Navigation */}
      <header className="flex items-center justify-between px-4 py-3 border-b bg-card z-10">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => router.push('/problems')}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <div className="flex items-center gap-3">
            <h1 className="text-lg font-semibold tracking-tight truncate max-w-[300px]">
              {problem.title}
            </h1>
            <Badge variant="outline" className={`${getDifficultyColor('Medium')} transition-colors`}>
              Medium
            </Badge>
          </div>
        </div>

        <div className="flex items-center gap-2">
           {/* Run Button */}
          <Button variant="secondary" size="sm" className="gap-2">
            <Play className="h-4 w-4 fill-current" />
            <span className="hidden sm:inline">Run</span>
          </Button>
          {/* Submit Button */}
          <Button 
            size="sm" 
            className="gap-2 bg-green-600 hover:bg-green-700 text-white"
            onClick={() => alert('Submission pipeline in Week 5')}
          >
            <Send className="h-4 w-4" />
            <span className="hidden sm:inline">Submit</span>
          </Button>
        </div>
      </header>

      {/* 2. Resizable Workspace */}
      <div className="flex-1 overflow-hidden">
        <ResizablePanelGroup direction="horizontal" className="h-full border-t">
          
          {/* Left Panel: Problem Details */}
          <ResizablePanel defaultSize={40} minSize={30} maxSize={70}>
            <div className="h-full flex flex-col bg-card/50">
              <Tabs defaultValue="description" className="flex-1 flex flex-col w-full">
                <div className="px-4 py-2 border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
                  <TabsList className="w-full justify-start h-9 p-0 bg-transparent rounded-none border-b-0">
                    <TabsTrigger 
                      value="description" 
                      className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none h-9 px-4"
                    >
                      <ListChecks className="mr-2 h-4 w-4" />
                      Description
                    </TabsTrigger>
                    <TabsTrigger 
                      value="solution" 
                      className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none h-9 px-4"
                    >
                      <Code2 className="mr-2 h-4 w-4" />
                      Solution
                    </TabsTrigger>
                  </TabsList>
                </div>

                <TabsContent value="description" className="flex-1 p-0 m-0 border-none outline-none data-[state=active]:flex flex-col">
                  <ScrollArea className="flex-1">
                    <div className="p-6 max-w-none prose prose-stone dark:prose-invert">
                       {/* Typography styles for better readability */}
                      <h2 className="text-xl font-bold mb-4">{problem.title}</h2>
                      <p className="text-sm text-muted-foreground whitespace-pre-line leading-7">
                        {problem.description}
                      </p>
                      
                      {/* Example "Examples" section styling */}
                      <div className="mt-8 space-y-4">
                        <div className="rounded-lg bg-muted/50 p-4">
                          <h3 className="font-semibold text-sm mb-2">Example 1:</h3>
                          <code className="text-xs bg-muted px-2 py-1 rounded">Input: str = &quot;hai&quot;</code>
                          <br />
                          <code className="text-xs bg-muted px-2 py-1 rounded mt-2 inline-block">Output: &quot;iah&quot;</code>
                        </div>
                      </div>
                    </div>
                  </ScrollArea>
                </TabsContent>
                <TabsContent value="solution" className="flex-1 p-6 m-0">
                   <div className="flex items-center justify-center h-full text-muted-foreground text-sm">
                      Official solution not available.
                   </div>
                </TabsContent>
              </Tabs>
            </div>
          </ResizablePanel>

          <ResizableHandle withHandle />

          {/* Right Panel: Editor */}
          <ResizablePanel defaultSize={60} minSize={30}>
            <div className="h-full flex flex-col">
              {/* Editor Toolbar */}
              <div className="flex items-center justify-between px-4 py-2 border-b bg-background/95">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Code</span>
                  <Separator orientation="vertical" className="h-4" />
                  <Select
                    value={language}
                    onValueChange={value => setLanguage(value as Language)}
                  >
                    <SelectTrigger className="h-8 w-[140px] border-none bg-transparent focus:ring-0 hover:bg-muted/50 transition-colors text-xs font-medium">
                      <SelectValue placeholder="Language" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="javascript">JavaScript</SelectItem>
                      <SelectItem value="python">Python</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground">
                  <Settings className="h-4 w-4" />
                </Button>
              </div>

              {/* Monaco Editor Wrapper */}
              <div className="flex-1 relative">
                <Editor
                  theme={theme === 'dark' ? "vs-dark" : "vs"}
                  language={language}
                  value={code}
                  onChange={v => setCode(v || '')}
                  options={{
                    fontSize: 14,
                    fontFamily: "'JetBrains Mono', 'Fira Code', Consolas, monospace", // Use a nice coding font if available
                    minimap: { enabled: false },
                    scrollBeyondLastLine: false,
                    automaticLayout: true,
                    padding: { top: 16, bottom: 16 },
                    renderLineHighlight: "all",
                    lineNumbers: "on",
                    glyphMargin: false,
                    folding: true,
                    lineDecorationsWidth: 10,
                    lineNumbersMinChars: 3,
                  }}
                  className="h-full w-full"
                />
              </div>
            </div>
          </ResizablePanel>

        </ResizablePanelGroup>
      </div>
    </div>
  )
}