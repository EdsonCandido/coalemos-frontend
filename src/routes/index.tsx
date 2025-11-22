import { lazy, Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router';

import { useAuth } from '@/stores/auth-store';
import LoginPage from '../pages/login';
import LoadingPage from '../pages/loading';
import NotFound from '../pages/not-found';
import DashboardLayout from '../layout/dashboardLayout';

const PainelPageLazy = lazy(() => import('../pages/painel'));
const AdminSettingslazy = lazy(() => import('../pages/admin/settings'));
const UsersAdminLazy = lazy(() => import('../pages/admin/users'));
const BannersAdminLazy = lazy(() => import('../pages/admin/banners'));
const ClientesAdminLazy = lazy(() => import('../pages/admin/clientes'));
const EmpresasAdminLazy = lazy(() => import('../pages/admin/empresas'));
const FinancialPageLazy = lazy(() => import('../pages/financial'));

const DashboardHomePageLazy = lazy(() => import('../pages/dashboard/home'));

type IProps = {
  isAdmin?: boolean;
  children: JSX.Element;
};

const RoutesAplication = () => {
  const { usuario, isAuthenticated, hydrated } = useAuth();

  if (!hydrated) {
    return <LoadingPage />;
  }
  const Autenticate = ({ children, isAdmin }: IProps) => {
    let errAccess = false;
    if (!isAuthenticated) errAccess = true;
    if (isAdmin && !usuario?.is_admin) errAccess = true;

    if (errAccess) {
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
          path="/painel"
          element={
            <Autenticate>
              <Suspense fallback={<LoadingPage />}>
                <PainelPageLazy />
              </Suspense>
            </Autenticate>
          }
        />
        <Route
          path="/dashboard"
          element={
            <Autenticate>
              <Suspense fallback={<LoadingPage />}>
                <DashboardHomePageLazy />
              </Suspense>
            </Autenticate>
          }
        />
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
          path="/admin/settings/empresas"
          element={
            <Autenticate isAdmin>
              <Suspense fallback={<LoadingPage />}>
                <EmpresasAdminLazy />
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
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default RoutesAplication;
