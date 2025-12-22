import type { Metadata } from 'next'
import { Inter } from 'next/font/google' // 1. Modern Font
import './globals.css'
import Link from "next/link"
import { ThemeProvider } from "@/components/theme-provider"
import { ModeToggle } from "@/components/ui/theme-toggle"
import { Button } from "@/components/ui/button"
import { Code2, Github } from "lucide-react"
import { Toaster } from '@/components/ui/sonner'

// Initialize Font
const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'CodeSphere',
  description: 'The modern platform for coding excellence.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} min-h-screen bg-background antialiased selection:bg-primary/10 selection:text-primary`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="relative flex min-h-screen flex-col">
            
            {/* Background Pattern (Optional: Adds a subtle tech texture) */}
            <div className="fixed inset-0 -z-10 h-full w-full bg-background bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"></div>

            {/* Modern Sticky Header */}
            <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
              <div className="container flex h-14 max-w-screen-2xl items-center">
                
                {/* Logo Area */}
                <div className="mr-4 hidden md:flex">
                  <Link href="/" className="mr-6 flex items-center space-x-2">
                    <Code2 className="h-6 w-6" />
                    <span className="hidden font-bold sm:inline-block">
                      CodeSphere
                    </span>
                  </Link>
                  <nav className="flex items-center gap-6 text-sm">
                    <Link
                      href="/problems"
                      className="transition-colors hover:text-foreground/80 text-foreground/60"
                    >
                      Problems
                    </Link>
                    <Link
                      href="/contest"
                      className="transition-colors hover:text-foreground/80 text-foreground/60"
                    >
                      Contest
                    </Link>
                    <Link
                      href="/discuss"
                      className="transition-colors hover:text-foreground/80 text-foreground/60"
                    >
                      Discuss
                    </Link>
                  </nav>
                </div>

                {/* Mobile Menu Placeholder (Hamburger would go here) */}
                <Button variant="ghost" className="inline-flex md:hidden h-9 w-9 p-0">
                   <Code2 className="h-5 w-5" />
                </Button>

                {/* Right Side Actions */}
                <div className="flex flex-1 items-center justify-end space-x-2">
                  <nav className="flex items-center space-x-2">
                    <Button variant="ghost" size="icon" asChild>
                      <Link href="https://github.com" target="_blank" rel="noreferrer">
                        <Github className="h-4 w-4" />
                        <span className="sr-only">GitHub</span>
                      </Link>
                    </Button>
                    
                    {/* Theme Toggle Component */}
                    <ModeToggle />
                    
                    <div className="border-l pl-2 ml-2">
                       <Button asChild variant="default" size="sm" className="h-8">
                         <Link href="/login">Sign In</Link>
                       </Button>
                    </div>
                  </nav>
                </div>
              </div>
            </header>

            {/* Main Content Area */}
            <main className="flex-1">
              {children}
            </main>
            <Toaster />
            
            {/* Simple Footer */}
            <footer className="border-t py-6 md:py-0">
              <div className="container flex flex-col items-center justify-between gap-4 md:h-16 md:flex-row">
                <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
                  Built by CodeSphere. The source code is available on{" "}
                  <a
                    href="#"
                    target="_blank"
                    rel="noreferrer"
                    className="font-medium underline underline-offset-4"
                  >
                    GitHub
                  </a>
                  .
                </p>
              </div>
            </footer>
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}