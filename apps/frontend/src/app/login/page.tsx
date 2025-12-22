'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { api } from '@/lib/api'

// UI Components
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'

// Icons
import { Loader2, Command } from 'lucide-react'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  
  const router = useRouter()

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    try {
      await api.post('/auth/login', { email, password })
      router.push('/dashboard')
    } catch (err) {
      setError('Invalid email or password. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center p-4">
      {/* Background Pattern (Matches your RootLayout) */}
      <div className="fixed inset-0 -z-10 h-full w-full bg-background bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"></div>

      <Card className="w-full max-w-md border-muted/50 shadow-xl bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <CardHeader className="space-y-1 text-center">
          <div className="flex justify-center mb-4">
            <div className="rounded-lg bg-primary/10 p-3">
              <Command className="h-6 w-6 text-primary" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold tracking-tight">
            Welcome back
          </CardTitle>
          <CardDescription>
            Enter your credentials to access your workspace
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            
            {/* Error Message */}
            {error && (
              <div className="p-3 text-sm text-red-500 bg-red-500/10 border border-red-500/20 rounded-md">
                {error}
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input 
                id="email" 
                type="email" 
                placeholder="name@example.com" 
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                disabled={isLoading}
              />
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <Link 
                  href="/forgot-password" 
                  className="text-xs font-medium text-primary hover:underline underline-offset-4"
                >
                  Forgot password?
                </Link>
              </div>
              <Input 
                id="password" 
                type="password" 
                placeholder="••••••••"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                disabled={isLoading}
              />
            </div>

            <Button className="w-full" type="submit" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Signing in...
                </>
              ) : (
                "Sign In"
              )}
            </Button>
          </form>
        </CardContent>
        
        <CardFooter className="flex flex-col gap-4 text-center">
          <div className="text-sm text-muted-foreground">
            Don&apos;t have an account?{" "}
            <Link 
              href="/register" 
              className="font-medium text-primary hover:underline underline-offset-4"
            >
              Sign up
            </Link>
          </div>
        </CardFooter>
      </Card>
      
      {/* Footer / Copyright */}
      <p className="mt-8 text-center text-sm text-muted-foreground">
        &copy; {new Date().getFullYear()} CodeSphere. All rights reserved.
      </p>
    </div>
  )
}