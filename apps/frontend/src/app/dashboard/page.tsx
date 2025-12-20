'use client'

import { useAuth } from '@/lib/useAuth';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Dashboard() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) router.push('/login')
  }, [loading, user, router]);

  if (loading) return <p>Loading...</p>;
  return <h1>Welcome, {user?.userId}</h1>;
}
