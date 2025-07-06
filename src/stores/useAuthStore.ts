import { combine, createJSONStorage, persist } from 'zustand/middleware';
import { create } from 'zustand';
import createSelectors from '~/utils/createSelectors';
import type { Admin, Client } from '~/types/user';

const authStore = create(
  persist(
    combine(
      {
        isAuthenticated: true, 
        token: null as string | null,
        type: null as string | null,
        user: null as Admin | Client | null
      },
      (set) => ({
        setToken: (token: string) => set({ token }),
        setIsAuthenticated: (value: boolean) => set({ isAuthenticated: value }),
        setType: (type: string) => set({ type }),
        setUser: (user: Admin | Client) => set({ user }),
        logout: () =>
          set({ isAuthenticated: false, token: null, type: null, user: null }),
      })
    ),
    {
      name: 'auth',
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export const useAuthStore = createSelectors(authStore)
