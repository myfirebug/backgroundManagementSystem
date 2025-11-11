import type { FC } from "react";
import { PlusOutlined } from "@ant-design/icons";
import {
  ModalForm,
  ProFormSelect,
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
  type: string;
  icon: string;
  sort: number;
  menuName: string;
  path: string;
  componentPath: string;
  showStatus: string;
  menuStatus: string;
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
    <ModalForm<formProps>
      title={`${title}菜单`}
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
      modalProps={{
        destroyOnHidden: true,
        onCancel: () => console.log("run"),
      }}
      initialValues={{
        type: 1,
        showStatus: 1,
        menuStatus: 1,
      }}
      submitTimeout={2000}
      onFinish={async (values) => {
        console.log(values, "values");
        await waitTime(2000);
        message.success("Submission successful");
        return false;
      }}
    >
      <ProFormTreeSelect name="parentMenuId" label="上级菜单" width="lg" />
      <ProFormRadio.Group
        name="type"
        label="菜单类型"
        rules={[{ required: true, message: "请选择" }]}
        options={[
          { label: "目录", value: 1 },
          { label: "菜单", value: 2 },
          { label: "按钮", value: 3 },
        ]}
        width="lg"
      />
      <ProFormSelect width="lg" name="icon" label="图标" />
      <ProFormDigit name="sort" label="显示排序" />
      <ProFormText
        name="menuName"
        label="菜单名称"
        rules={[{ required: true, message: "请输入" }]}
      />
      <ProFormText
        name="path"
        label="路由地址"
        rules={[{ required: true, message: "请输入" }]}
      />
      <ProFormText name="componentPath" label="组件地址" />
      <ProFormRadio.Group
        name="showStatus"
        label="显示状态"
        rules={[{ required: true, message: "请选择" }]}
        options={[
          { label: "显示", value: 1 },
          { label: "隐藏", value: 2 },
        ]}
        width="lg"
      />
      <ProFormRadio.Group
        name="menuStatus"
        label="菜单状态"
        rules={[{ required: true, message: "请选择" }]}
        options={[
          { label: "正常", value: 1 },
          { label: "停用", value: 2 },
        ]}
        width="lg"
      />
    </ModalForm>
  );
};

export default AddOrEdit;
