import env from "@/configs/env";
import disableDevtool from "disable-devtool";

const configDisableDevtool = () => {
  if (env.VITE_NODE_ENV != "production") return;
  disableDevtool({
    disableMenu: true,
    clearLog: true,
    onDevtoolClose: () => window.location.reload(),
    ondevtoolopen: () => {
      document.body.innerHTML =
        "<h2 style='text-align:center;margin-top:40vh;'> <p>⚠️ Acesso restrito</p> Feche o DevTools para continuar.</h2>";
    },
  });
};

export default configDisableDevtool;
