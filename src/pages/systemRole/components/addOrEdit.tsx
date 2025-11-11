import type { FC } from "react";
import { PlusOutlined } from "@ant-design/icons";
import {
  DrawerForm,
  ProFormText,
  ProFormDigit,
  ProFormTreeSelect,
  ProFormRadio,
} from "@ant-design/pro-components";
import { Button, Form, message } from "antd";

const waitTime = (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};
interface formProps {
  parentMenuId: string;
  sort: number;
  roleName: string;
  roleStatus: string;
}

interface AddOrEditProps {
  title?: string;
  data?: any;
  isButton: boolean;
}

const AddOrEdit: FC<AddOrEditProps> = ({ title, isButton, data }) => {
  console.log(data, "data");
  const [form] = Form.useForm<formProps>();
  return (
    <DrawerForm<formProps>
      title={`${title}角色`}
      trigger={
        isButton ? (
          <Button type="primary">
            <PlusOutlined />
            新增
          </Button>
        ) : (
          <span
            className=" text-blue-600 cursor-pointer hover:text-blue-500"
            key="modify"
          >
            {title}
          </span>
        )
      }
      onOpenChange={() => {
        form.setFieldsValue(data);
      }}
      width={500}
      layout="horizontal"
      form={form}
      {...{
        labelCol: { span: 4 },
        wrapperCol: { span: 20 },
      }}
      autoFocusFirstInput
      initialValues={{
        roleStatus: 1,
      }}
      submitTimeout={2000}
      onFinish={async (values) => {
        console.log(values, "values");
        await waitTime(2000);
        message.success("Submission successful");
        return false;
      }}
    >
      <ProFormText
        name="roleName"
        label="角色名称"
        rules={[{ required: true, message: "请输入" }]}
      />
      <ProFormDigit name="sort" label="显示排序" />
      <ProFormTreeSelect name="parentMenuId" label="菜单权限" width="lg" />
      <ProFormRadio.Group
        name="roleStatus"
        label="角色状态"
        rules={[{ required: true, message: "请选择" }]}
        options={[
          { label: "正常", value: 1 },
          { label: "停用", value: 2 },
        ]}
        width="lg"
      />
    </DrawerForm>
  );
};

export default AddOrEdit;
