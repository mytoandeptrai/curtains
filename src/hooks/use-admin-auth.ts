'use client';

import { useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useAdminAuthStore } from '@/stores/admin-auth-store';

export function useAdminAuth() {
  const router = useRouter();
  const { session, isAuthenticated, isLoading, setSession, clearSession, setLoading } =
    useAdminAuthStore();

  const login = useCallback(
    async (email: string, password: string) => {
      setLoading(true);
      try {
        const response = await fetch('/api/admin/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Login failed');
        }

        const data = await response.json();

        setSession({
          access_token: data.access_token,
          refresh_token: data.refresh_token,
          admin_id: data.admin_id,
          admin_email: data.admin_email,
          expiresAt: data.expiresAt,
        });

        router.push('/admin');
      } catch (error) {
        throw error;
      } finally {
        setLoading(false);
      }
    },
    [setLoading, setSession, router]
  );

  const logout = useCallback(async () => {
    setLoading(true);
    try {
      await fetch('/api/admin/auth/logout', {
        method: 'POST',
      });

      clearSession();
      router.push('/login');
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setLoading(false);
    }
  }, [setLoading, clearSession, router]);

  const requestPasswordReset = useCallback(
    async (email: string) => {
      setLoading(true);
      try {
        const response = await fetch('/api/admin/auth/reset-password', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email }),
        });

        if (!response.ok) {
          throw new Error('Failed to send reset email');
        }

        return await response.json();
      } finally {
        setLoading(false);
      }
    },
    [setLoading]
  );

  return {
    session,
    isAuthenticated,
    isLoading,
    login,
    logout,
    requestPasswordReset,
    admin_email: session.admin_email,
  };
}
