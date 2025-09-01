import { Navigate, Outlet } from "react-router-dom"
import { useAuth } from "@/hooks/use-auth"
import { useEffect, useState } from "react"

export default function PrivateRoute() {
  const { isAuthenticated, refreshTokenIfNeeded } = useAuth()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function check() {
      await refreshTokenIfNeeded()
      setLoading(false)
    }
    check()
  }, [])

  if (loading) return <div>Carregando...</div>
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />
}
