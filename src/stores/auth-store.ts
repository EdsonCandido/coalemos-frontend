import { http } from "@/services/http";
import { toast } from "react-toastify";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface User {
  cod: number;
  nome: string;
  login: string;
  foto_perfil: string | null;
  is_admin: number;
}

interface AuthState {
  usuario: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  signIn: ({
    login,
    password,
  }: {
    login: string;
    password: string;
  }) => Promise<User | null>;
  logout: () => void;
  refreshTokenIfNeeded: () => Promise<{
    success: boolean;
    accessToken: null | string;
  }>;
}

export const useAuth = create<AuthState>()(
  persist(
    (set, get) => ({
      usuario: null,
      accessToken: null,
      refreshToken: null,
      isAuthenticated: false,

      signIn: async ({ login, password }) => {
        toast.loading("Consultando...");
        const response = await http
          .post("/session/login", { login, password })
          .then((res) => ({ data: res.data, success: true, err: null }))
          .catch((e) => ({
            data: null,
            success: false,
            err: e.response?.data || e.message,
          }));

        toast.dismiss();

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

          return usuario;
        } else {
          toast.error(`${response.err}`);
          return null;
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
        const refreshToken = get().refreshToken;
        if (!refreshToken) throw new Error("Nenhum refresh token disponível");

        const response = await http
          .post("/session/refresh-token", { refreshToken })
          .then((res) => ({ data: res.data, success: true }))
          .catch(() => ({ data: null, success: false }));

        if (response.success) {
          set({
            accessToken: response.data.accessToken,
            refreshToken: response.data.refreshToken,
          });

          http.defaults.headers.common["Authorization"] =
            `Bearer ${response.data.accessToken}`;
          return { accessToken: response.data.accessToken, success: true };
        } else {
          return { accessToken: null, success: false };
        }
      },
    }),
    { name: "auth-storage", storage: createJSONStorage(() => localStorage) }, // or sessionStorage
  ),
);
