'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import AdminLayout from '@/components/layouts/admin-layout';
import { useAdminAuth } from '@/hooks/use-admin-auth';

export default function AdminPortalLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { isAuthenticated } = useAdminAuth();

  // Client-side guard: redirect to /login if session is missing (defense-in-depth after middleware)
  useEffect(() => {
    if (isAuthenticated === false) {
      const session = window.localStorage.getItem('admin-auth-store');
      if (!session || session === 'null') {
        router.push('/login');
      }
    }
  }, [isAuthenticated, router]);

  return <AdminLayout>{children}</AdminLayout>;
}
