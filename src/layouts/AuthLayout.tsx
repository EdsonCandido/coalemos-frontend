// src/components/layout/AuthLayout.tsx
import { type ReactNode } from "react";
import { Outlet } from "react-router-dom";

export default function AuthLayout({ children }: { children?: ReactNode }) {
  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
        {children || <Outlet />}
    </div>
  );
}
