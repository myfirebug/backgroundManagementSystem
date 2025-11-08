import { Result } from "antd";

function NotFound() {
  return <Result status="404" title="404" subTitle="您访问的页面走丢了~~~" />;
}

export default NotFound;
