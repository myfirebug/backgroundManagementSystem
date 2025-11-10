import { Popconfirm } from "antd";

interface IPopConfirmProps {
  // 请求接口，这里查找的@src/service
  requestName: string;
  // 文本
  text?: string;
  // 刷新表格
  reload?: () => void;
  // 其他参数
  params?: any;
  // 回调方法
  callback?: Function;
  children?: React.ReactNode;
}

const PopConfirm: React.FC<IPopConfirmProps> = ({
  text,
  requestName,
  reload,
  params,
  callback,
  children,
}) => {
  console.log(requestName, reload, params, callback);
  const onConfirm = () => {
    console.log("确定了");
  };
  return (
    <Popconfirm
      key="popconfirm"
      title={`确认${text}吗?`}
      okText="是"
      cancelText="否"
      onConfirm={onConfirm}
    >
      <span className=" text-blue-600 cursor-pointer hover:text-blue-500">
        {children ? children : text}
      </span>
    </Popconfirm>
  );
};

export default PopConfirm;
