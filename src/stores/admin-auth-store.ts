'use client';

import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

export interface AdminSession {
  access_token: string | null;
  refresh_token: string | null;
  admin_id: string | null;
  admin_email: string | null;
  expiresAt: number | null;
}

interface AdminAuthStore {
  session: AdminSession;
  isLoading: boolean;
  isAuthenticated: boolean;

  setSession: (session: AdminSession) => void;
  clearSession: () => void;
  setLoading: (loading: boolean) => void;
  updateTokens: (accessToken: string, refreshToken: string, expiresAt: number) => void;
}

const initialSession: AdminSession = {
  access_token: null,
  refresh_token: null,
  admin_id: null,
  admin_email: null,
  expiresAt: null,
};

const useAdminAuthStoreBase = create<AdminAuthStore>()(
  persist(
    (set, get) => ({
      session: initialSession,
      isLoading: false,
      isAuthenticated: false,

      setSession: (session: AdminSession) => {
        set({
          session,
          isAuthenticated: !!(session.access_token && session.admin_id),
        });
      },

      clearSession: () => {
        set({
          session: initialSession,
          isAuthenticated: false,
        });
      },

      setLoading: (loading: boolean) => {
        set({ isLoading: loading });
      },

      updateTokens: (accessToken: string, refreshToken: string, expiresAt: number) => {
        const current = get().session;
        set({
          session: {
            ...current,
            access_token: accessToken,
            refresh_token: refreshToken,
            expiresAt,
          },
        });
      },
    }),
    {
      name: 'admin-auth-store',
      storage: createJSONStorage(() => {
        if (typeof window !== 'undefined') {
          return localStorage;
        }
        return {
          getItem: () => null,
          setItem: () => {},
          removeItem: () => {},
        };
      }),
      partialize: (state) => ({
        session: state.session,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);

export const useAdminAuthStore = useAdminAuthStoreBase;
