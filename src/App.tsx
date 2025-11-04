import AppProvider from "@/provider";
import configDisableDevtool from "@/utils/disableDevtool";

void configDisableDevtool();

function App() {
  return <AppProvider />;
}

export default App;
