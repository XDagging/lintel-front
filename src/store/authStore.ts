import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AuthUser {
  uuid: string;
  email: string;
  role: 'user' | 'worker';
  rating?: number;
  address?: string;
  name?: string;
  img?: string;
  promoCode?: string;
  isApproved?: boolean;
}

interface AuthStore {
  token: string | null;
  user: AuthUser | null;
  setAuth: (token: string, user: AuthUser) => void;
  updateUser: (updates: Partial<AuthUser>) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      token: null,
      user: null,
      setAuth: (token, user) => {
        localStorage.setItem('lintel_token', token);
        set({ token, user });
      },
      updateUser: (updates) =>
        set((state) => ({
          user: state.user ? { ...state.user, ...updates } : null,
        })),
      logout: () => {
        localStorage.removeItem('lintel_token');
        set({ token: null, user: null });
      },
    }),
    { name: 'lintel-auth', partialize: (s) => ({ token: s.token, user: s.user }) }
  )
);
