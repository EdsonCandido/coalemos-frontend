import { useEffect, type ReactNode } from "react";
import { ChakraProvider } from "@chakra-ui/react";
import { ThemeProvider } from "next-themes";
import { BrowserRouter } from "react-router-dom";
import { Slide, ToastContainer } from "react-toastify";
import { devextremeMessages } from "@/utils/devextremePtBr";
import { locale, loadMessages } from "devextreme/localization";
import "react-toastify/dist/ReactToastify.min.css";
import "devextreme/dist/css/dx.softblue.css";
import { CustomProvider } from "rsuite";
import { ptBR } from "rsuite/locales";
import theme from "@/theme";
import RoutesAplication from "@/routes";
import { useAuth } from "@/stores/auth-store";
import { http } from "@/services/http";
loadMessages(devextremeMessages);
locale("pt-BR");

type ContextProviderProps = {
  children?: ReactNode;
};

const AppProvider = ({ children }: ContextProviderProps) => {
  const setHydrated = useAuth((s) => s.setHydrated);

  useEffect(() => {
    // ✅ Aguarda o Zustand terminar de reidratar
    useAuth.persist.onFinishHydration(() => {
      const accessToken = useAuth.getState().accessToken;
      if (accessToken) {
        // Reaplica o token ao axios
        http.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
      }
      setHydrated(true);
    });

    // Caso já tenha sido hidratado (em hot reloads)
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
              style={{ fontSize: "12px" }}
              draggable={true}
              transition={Slide}
            />
            <RoutesAplication />
            {children}
          </ThemeProvider>
        </CustomProvider>
      </ChakraProvider>
    </BrowserRouter>
  );
};

export default AppProvider;
