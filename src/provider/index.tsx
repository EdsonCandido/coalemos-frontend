import type { ReactNode } from "react";
import { ChakraProvider } from "@chakra-ui/react";
import { ThemeProvider } from "next-themes";
import { BrowserRouter } from "react-router-dom";

import { Slide, ToastContainer } from "react-toastify";

import { devextremeMessages } from "@/utils/devextremePtBr";

import { locale, loadMessages } from "devextreme/localization";

import "react-toastify/dist/ReactToastify.min.css";
// import 'rsuite/dist/rsuite.min.css';
import "devextreme/dist/css/dx.softblue.css";
import { CustomProvider } from "rsuite";
import { ptBR } from "rsuite/locales";
import theme from "@/theme";
import RoutesAplication from "@/routes";
loadMessages(devextremeMessages);
locale("pt-BR");

type ContextProviderProps = {
  children?: ReactNode;
};
const AppProvider = ({ children }: ContextProviderProps) => {
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
