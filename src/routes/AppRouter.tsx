import { BrowserRouter, Routes, Route } from "react-router-dom";
import NotFound from "@/pages/NotFound";
import AuthLayout from "@/layouts/AuthLayout";
import DashboardLayout from "@/layouts/DashboardLayout";
import PrivateRoute from "@/routes/PrivateRoute";

import Login from "@/pages/auth/login";
import Register from "@/pages/auth/register";
import DashboardHome from "@/pages/dashboard";
import Profile from "@/pages/dashboard/profile";
import PublicRoute from "./PublicRoute";
import ClientsPage from "@/pages/dashboard/client";
import FinanceSummary from "@/pages/dashboard/finance-summary";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PublicRoute />}>
          <Route element={<AuthLayout />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>
        </Route>

        <Route element={<PrivateRoute />}>
          <Route element={<DashboardLayout />}>
            <Route path="/" element={<DashboardHome />} />
            <Route
              path="/dashboard/finance-summary"
              element={<FinanceSummary />}
            />
            <Route path="/dashboard/profile" element={<Profile />} />
            <Route path="/dashboard/clients" element={<ClientsPage />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
