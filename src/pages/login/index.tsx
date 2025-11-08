import React, { useEffect } from "react";
import type { FormProps } from "antd";
import { Button, Checkbox, Form, Input } from "antd";
import bgUrl from "./assets/bg.jpg";
import { useMenuStore, useTokensStore } from "@store/index";
import { useNavigate } from "react-router-dom";

type FieldType = {
  username?: string;
  password?: string;
  remember?: string;
};

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { token, setToken } = useTokensStore();
  const { getMenus } = useMenuStore();
  useEffect(() => {
    if (token) {
      navigate("/home");
    }
  }, []);
  const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
    console.log("Success:", values);
    if (values.username === "admin" && values.password === "123456") {
      setToken("admin123456");
      getMenus([
        {
          path: "/expert",
          title: "会议管理",
          redirect: "",
          modulePath: "expert",
          icon: "ContactsOutlined",
          meta: {
            auth: true,
            menu: true,
          },
        },
        {
          path: "/configuration",
          title: "配置",
          redirect: "",
          modulePath: "configuration",
          icon: "SettingOutlined",
          meta: {
            auth: true,
            menu: true,
          },
          children: [
            {
              path: "/configuration/dispatchBox",
              title: "发件箱",
              redirect: "",
              modulePath: "configuration/dispatchBox",
              meta: {
                auth: true,
                menu: true,
              },
            },
            {
              path: "/configuration/template",
              title: "模版",
              redirect: "",
              modulePath: "configuration/template",
              meta: {
                auth: true,
                menu: true,
              },
            },
            {
              path: "/configuration/notice",
              title: "邮件/短信/下载记录",
              redirect: "",
              modulePath: "configuration/notice",
              meta: {
                auth: true,
                menu: true,
              },
            },
            {
              path: "/configuration/page",
              title: "页面显示",
              redirect: "",
              modulePath: "configuration/page",
              meta: {
                auth: true,
                menu: true,
              },
            },
            {
              path: "/configuration/courseware",
              title: "课件",
              redirect: "",
              modulePath: "configuration/courseware",
              meta: {
                auth: true,
                menu: true,
              },
            },
          ],
        },
        {
          path: "/schedule",
          title: "日程",
          redirect: "",
          modulePath: "",
          icon: "BuildOutlined",
          meta: {
            auth: true,
            menu: true,
          },
          children: [
            {
              path: "/schedule/topicTypes",
              title: "讲题类型",
              redirect: "",
              modulePath: "schedule/topicTypes",
              meta: {
                auth: true,
                menu: true,
              },
            },
            {
              path: "/schedule/session",
              title: "session配置",
              redirect: "",
              modulePath: "schedule/session",
              meta: {
                auth: true,
                menu: true,
              },
            },
            {
              path: "/schedule/sessionLabel",
              title: "session标签",
              redirect: "",
              modulePath: "schedule/sessionLabel",
              meta: {
                auth: true,
                menu: true,
              },
            },
            {
              path: "/schedule/topicLabel",
              title: "讲题标签",
              redirect: "",
              modulePath: "schedule/topicLabel",
              meta: {
                auth: true,
                menu: true,
              },
            },
            {
              path: "/schedule/topic",
              title: "讲题",
              redirect: "",
              modulePath: "schedule/topic",
              meta: {
                auth: true,
                menu: true,
              },
            },
          ],
        },
        {
          path: "/customer",
          title: "客户管理",
          redirect: "",
          modulePath: "customer",
          icon: "TeamOutlined",
          meta: {
            auth: true,
            menu: true,
          },
        },
        {
          path: "/importAndExport",
          title: "导入导出",
          redirect: "",
          icon: "ContactsOutlined",
          modulePath: "importAndExport",
          meta: {
            auth: true,
            menu: true,
          },
        },
        {
          path: "/courseware",
          title: "课件管理",
          redirect: "",
          modulePath: "courseware",
          icon: "ApartmentOutlined",
          meta: {
            auth: true,
            menu: true,
          },
        },
      ]);

      navigate("/home");
    }
  };

  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (
    errorInfo
  ) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <div
      className="bg-cover w-screen h-screen flex justify-center items-center"
      style={{ backgroundImage: `url(${bgUrl})` }}
    >
      <div className=" bg-white p-10 w-96 rounded-lg">
        <h2 className="text-lg text-center font-bold pb-3">用户登录</h2>
        <Form
          name="basic"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item<FieldType>
            name="username"
            rules={[{ required: true, message: "请输入账号" }]}
          >
            <Input placeholder="账号" />
          </Form.Item>

          <Form.Item<FieldType>
            name="password"
            rules={[{ required: true, message: "请输入密码" }]}
          >
            <Input.Password placeholder="密码" />
          </Form.Item>

          <Form.Item<FieldType>
            name="remember"
            valuePropName="checked"
            label={null}
          >
            <Checkbox>记住密码</Checkbox>
          </Form.Item>

          <Form.Item label={null}>
            <Button type="primary" htmlType="submit" block>
              登录
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Login;
