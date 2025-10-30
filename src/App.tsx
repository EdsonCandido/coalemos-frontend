import { ThemeProvider } from "./components/theme-provider";
import AppRouter from "./routes/AppRouter";
import { ToastContainer, Slide } from "react-toastify";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Slide}
      />
      <AppRouter />
    </ThemeProvider>
  );
}

export default App;
