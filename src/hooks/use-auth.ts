import { create } from "zustand";
import { persist } from "zustand/middleware";

interface User {
  id: string;
  name: string;
  login: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  login: (token: string, refreshToken: string, user: User) => void;
  logout: () => void;
  refreshTokenIfNeeded: () => Promise<void>;
}

export const useAuth = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      refreshToken: null,
      isAuthenticated: false,

      login: (token, refreshToken, user) => {
        set({ token, refreshToken, user, isAuthenticated: true });
      },

      logout: () => {
        set({
          token: null,
          refreshToken: null,
          user: null,
          isAuthenticated: false,
        });
      },

      refreshTokenIfNeeded: async () => {
        const { token, refreshToken } = get();
        if (!token && refreshToken) {
          try {
            // Aqui você faria uma chamada à API para renovar token
            const response = await fetch("/api/auth/refresh", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ refreshToken }),
            });
            if (response.ok) {
              const data = await response.json();
              set({ token: data.token });
            } else {
              get().logout();
            }
          } catch {
            get().logout();
          }
        }
      },
    }),
    { name: "auth-storage" }, // persist no localStorage
  ),
);
