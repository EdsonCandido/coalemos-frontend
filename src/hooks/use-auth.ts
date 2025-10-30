import { http } from "@/services/http";
import { toast } from "react-toastify";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface User {
  cod: string;
  nome: string;
  login: string;
  foto_perfil: string | null;
}

interface AuthState {
  usuario: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  login: ({
    login,
    password,
  }: {
    login: string;
    password: string;
  }) => Promise<boolean>;
  logout: () => void;
  refreshTokenIfNeeded: () => Promise<void>;
}

export const useAuth = create<AuthState>()(
  persist(
    (set, get) => ({
      usuario: null,
      accessToken: null,
      refreshToken: null,
      isAuthenticated: false,

      login: async ({ login, password }) => {
        const response = await http
          .post("/session/login", { login, password })
          .then((res) => ({ data: res.data, success: true, err: null }))
          .catch((e) => ({ data: null, success: false, err: e.response.data }));

        if (response.success) {
          const { accessToken, refreshToken, usuario } = response.data;

          http.defaults.headers.common["Authorization"] =
            `Bearer ${accessToken}`;

          set({
            accessToken,
            refreshToken,
            usuario,
            isAuthenticated: true,
          });

          return true;
        } else {
          toast.info(response.err);
          return false;
          // get().logout();
        }
      },

      logout: () => {
        set({
          accessToken: null,
          refreshToken: null,
          usuario: null,
          isAuthenticated: false,
        });
      },

      refreshTokenIfNeeded: async () => {
        const { accessToken, refreshToken } = get();
        if (!accessToken && refreshToken) {
          try {
            const response = await fetch("/api/auth/refresh", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ refreshToken }),
            });
            if (response.ok) {
              const data = await response.json();
              set({ accessToken: data.accessToken });
            } else {
              get().logout();
            }
          } catch {
            get().logout();
          }
        }
      },
    }),
    { name: "auth-storage", storage: createJSONStorage(() => localStorage) }, // or sessionStorage
  ),
);
