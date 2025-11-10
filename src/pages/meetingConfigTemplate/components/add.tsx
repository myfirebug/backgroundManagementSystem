import { PlusOutlined } from "@ant-design/icons";
import {
  ModalForm,
  ProFormSelect,
  ProFormText,
  ProFormDigit,
} from "@ant-design/pro-components";
import CustomEditor from "@src/components/customEditor";
import { Button, Form, message } from "antd";

const waitTime = (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

export default () => {
  const [form] = Form.useForm<{
    type: string;
    account: string;
    password: string;
    smpt: string;
    port: number;
  }>();
  return (
    <ModalForm<{
      type: string;
      account: string;
      password: string;
      smpt: string;
      port: number;
    }>
      title="添加"
      trigger={
        <Button type="primary">
          <PlusOutlined />
          添加
        </Button>
      }
      form={form}
      width={500}
      autoFocusFirstInput
      modalProps={{
        destroyOnHidden: true,
        onCancel: () => console.log("run"),
      }}
      submitTimeout={2000}
      onFinish={async (values) => {
        console.log(values, "values");
        await waitTime(2000);
        message.success("Submission successful");
        return false;
      }}
    >
      <ProFormSelect
        width="lg"
        request={async () => [
          {
            value: "chapter",
            label: "类型",
          },
        ]}
        name="type"
        label="类型"
        rules={[{ required: true, message: "请选择" }]}
      />
      <Form.Item
        name="html"
        label="富文本"
        rules={[{ required: true, message: "请输入" }]}
      >
        <CustomEditor />
      </Form.Item>
      <ProFormText
        width="lg"
        name="account"
        label="账号"
        placeholder="请输入账号"
        rules={[{ required: true, message: "请输入账号" }]}
      />
      <ProFormText.Password
        width="lg"
        name="password"
        label="密码"
        placeholder="请输入密码"
        rules={[{ required: true, message: "请输入密码" }]}
      />
      <ProFormText
        width="lg"
        name="smpt"
        label="SMTP"
        placeholder="请输入SMTP"
        rules={[{ required: true, message: "请输入SMTP" }]}
      />

      <ProFormDigit
        width="lg"
        name="port"
        label="端口"
        placeholder="请输入端口"
        rules={[{ required: true, message: "请输入端口" }]}
      />
    </ModalForm>
  );
};
