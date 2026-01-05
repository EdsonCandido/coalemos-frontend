import { useEffect, type ReactNode } from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import { ThemeProvider } from 'next-themes';
import { BrowserRouter } from 'react-router-dom';
import { Slide, ToastContainer } from 'react-toastify';
import { devextremeMessages } from '@/utils/devextremePtBr';
import { locale, loadMessages } from 'devextreme/localization';
import 'react-toastify/dist/ReactToastify.min.css';
import 'devextreme/dist/css/dx.softblue.css';
import { CustomProvider } from 'rsuite';
import { ptBR } from 'rsuite/locales';
import theme from '@/theme';
import RoutesAplication from '@/routes';
import { useAuth } from '@/stores/auth-store';
import { http } from '@/services/http';
import { useForceRefreshReload } from '@/hooks/useForceRefresh';
import UpdateBanner from '@/components/ui/UpdateBanner';
loadMessages(devextremeMessages);
locale('pt-BR');

type ContextProviderProps = {
  children?: ReactNode;
};

const AppProvider = ({ children }: ContextProviderProps) => {
  const { visible, secondsLeft } = useForceRefreshReload();
  const setHydrated = useAuth((s) => s.setHydrated);

  useEffect(() => {
    useAuth.persist.onFinishHydration(() => {
      const accessToken = useAuth.getState().accessToken;
      if (accessToken) http.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;

      setHydrated(true);
    });

    if (useAuth.persist.hasHydrated()) {
      setHydrated(true);
    }
  }, [setHydrated]);

  return (
    <BrowserRouter basename="/">
      <ChakraProvider theme={theme}>
        <CustomProvider locale={ptBR}>
          <ThemeProvider attribute="class" disableTransitionOnChange>
            <ToastContainer
              position="top-right"
              autoClose={5000}
              pauseOnFocusLoss={true}
              theme="light"
              style={{ fontSize: '12px' }}
              draggable={true}
              transition={Slide}
            />
            <UpdateBanner visible={visible} secondsLeft={secondsLeft} />
            <RoutesAplication />
            {children}
          </ThemeProvider>
        </CustomProvider>
      </ChakraProvider>
    </BrowserRouter>
  );
};

export default AppProvider;
