import { lazy, Suspense } from "react";
import { Navigate, Route, Routes } from "react-router";

import LoginPage from "../pages/login";
import LoadingPage from "../pages/loading";
import NotFound from "../pages/not-found";
import DashboardLayout from "../layout/dashboardLayout";
import { useAuth } from "@/stores/auth-store";

const AdminSettingslazy = lazy(() => import("../pages/admin/settings"));
const UsersAdminLazy = lazy(() => import("../pages/admin/users"));
const BannersAdminLazy = lazy(() => import("../pages/admin/banners"));
const ServicesAdminLazy = lazy(() => import("../pages/admin/services"));
const NoticiasAdminLazy = lazy(() => import("../pages/admin/noticias"));
const DocumentosAdminLazy = lazy(() => import("../pages/admin/documentos"));
const ClientesAdminLazy = lazy(() => import("../pages/admin/clientes"));

const FinancialPageLazy = lazy(() => import("../pages/financial"));

type IProps = {
  isAdmin?: boolean;
  children: JSX.Element;
};

const RoutesAplication = () => {
  const { usuario, logout, isAuthenticated } = useAuth();

  const Autenticate = ({ children, isAdmin }: IProps) => {
    let errAccess = false;
    if (!isAuthenticated) errAccess = true;

    if (isAdmin && usuario?.cod === 1) errAccess = true;

    if (errAccess) {
      logout();
      return <Navigate to="/login" replace />;
    }
    return children;
  };

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<LoginPage />} />
      <Route element={<DashboardLayout />}>
        <Route
          path="/financial"
          element={
            <Autenticate isAdmin>
              <Suspense fallback={<LoadingPage />}>
                <FinancialPageLazy />
              </Suspense>
            </Autenticate>
          }
        />
        <Route
          path="/admin/settings"
          element={
            <Autenticate isAdmin>
              <Suspense fallback={<LoadingPage />}>
                <AdminSettingslazy />
              </Suspense>
            </Autenticate>
          }
        />
        <Route
          path="/admin/settings/users"
          element={
            <Autenticate isAdmin>
              <Suspense fallback={<LoadingPage />}>
                <UsersAdminLazy />
              </Suspense>
            </Autenticate>
          }
        />
        <Route
          path="/admin/settings/documentos"
          element={
            <Autenticate isAdmin>
              <Suspense fallback={<LoadingPage />}>
                <DocumentosAdminLazy />
              </Suspense>
            </Autenticate>
          }
        />
        <Route
          path="/admin/settings/clientes"
          element={
            <Autenticate isAdmin>
              <Suspense fallback={<LoadingPage />}>
                <ClientesAdminLazy />
              </Suspense>
            </Autenticate>
          }
        />
        <Route
          path="/admin/settings/banners"
          element={
            <Autenticate isAdmin>
              <Suspense fallback={<LoadingPage />}>
                <BannersAdminLazy />
              </Suspense>
            </Autenticate>
          }
        />
        <Route
          path="/admin/settings/services"
          element={
            <Autenticate isAdmin>
              <Suspense fallback={<LoadingPage />}>
                <ServicesAdminLazy />
              </Suspense>
            </Autenticate>
          }
        />
        <Route
          path="/admin/settings/noticias"
          element={
            <Autenticate isAdmin>
              <Suspense fallback={<LoadingPage />}>
                <NoticiasAdminLazy />
              </Suspense>
            </Autenticate>
          }
        />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default RoutesAplication;
