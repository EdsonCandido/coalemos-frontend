import { BrowserRouter, Routes, Route } from "react-router-dom";
import NotFound from "@/pages/NotFound";
import AuthLayout from "@/layout/AuthLayout";
import DashboardLayout from "@/layout/DashboardLayout";
import PrivateRoute from "@/routes/PrivateRoute";

import Login from "@/pages/auth/login";
import Register from "@/pages/auth/register";
import DashboardHome from "@/pages/dashboard";
import Profile from "@/pages/dashboard/profile";

export default function AppRouter() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<AuthLayout />}>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="*" element={<NotFound />} />
                </Route>


                <Route element={<PrivateRoute />}>
                    <Route element={<DashboardLayout />}>
                        <Route path="/dashboard" element={<DashboardHome />} />
                        <Route path="/dashboard/profile" element={<Profile />} />
                        <Route path="*" element={<NotFound />} />
                    </Route>
                </Route>
            </Routes>
        </BrowserRouter>
    );
}
