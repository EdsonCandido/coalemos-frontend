import { Navigate, Outlet } from "react-router-dom";

import { useEffect, useState } from "react";
import { useAuth } from "@/stores/auth-store";

export default function PrivateRoute() {
  const { isAuthenticated } = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function check() {
      // await refreshTokenIfNeeded();
      setLoading(false);
    }
    check();
  }, []);

  if (loading) return <div>Carregando ...</div>;
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
}
