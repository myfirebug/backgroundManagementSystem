import type { FC } from "react";
import RoutesView from "@src/router";
import { ConfigProvider } from "antd";
interface AppProps {}

const App: FC<AppProps> = () => {
  return (
    <ConfigProvider>
      <RoutesView />
    </ConfigProvider>
  );
};

export default App;
