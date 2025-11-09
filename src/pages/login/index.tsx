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
          path: "/meeting",
          title: "会议管理",
          redirect: "",
          modulePath: "",
          icon: "ContactsOutlined",
          meta: {
            auth: true,
            menu: true,
          },
          children: [
            {
              path: "/meeting",
              title: "会议列表",
              redirect: "",
              modulePath: "meeting",
              icon: "ApartmentOutlined",
              meta: {
                auth: true,
                menu: true,
              },
            },
            {
              path: "/meeting/config",
              title: "配置",
              redirect: "",
              modulePath: "",
              icon: "SettingOutlined",
              meta: {
                auth: true,
                menu: true,
              },
              children: [
                {
                  path: "/meeting/config/outbox",
                  title: "发件箱",
                  redirect: "",
                  modulePath: "meetingConfigOutbox",
                  icon: "TeamOutlined",
                  meta: {
                    auth: true,
                    menu: true,
                  },
                },
                {
                  path: "/meeting/config/template",
                  title: "模版",
                  redirect: "",
                  modulePath: "meetingConfigTemplate",
                  icon: "ContactsOutlined",
                  meta: {
                    auth: true,
                    menu: true,
                  },
                },
                {
                  path: "/meeting/config/schedule",
                  title: "日程",
                  redirect: "",
                  modulePath: "",
                  icon: "ApartmentOutlined",
                  meta: {
                    auth: true,
                    menu: true,
                  },
                  children: [
                    {
                      path: "/meeting/config/schedule/topicTypes",
                      title: "讲题类型",
                      redirect: "",
                      modulePath: "meetingConfigScheduleTopicTypes",
                      icon: "TeamOutlined",
                      meta: {
                        auth: true,
                        menu: true,
                      },
                    },
                    {
                      path: "/meeting/config/schedule/sessionTypes",
                      title: "session类型",
                      redirect: "",
                      modulePath: "meetingConfigScheduleSessionTypes",
                      icon: "BuildOutlined",
                      meta: {
                        auth: true,
                        menu: true,
                      },
                    },
                  ],
                },
              ],
            },
            {
              path: "/meeting/courseware",
              title: "课件管理",
              redirect: "",
              modulePath: "meetingCourseware",
              icon: "ApartmentOutlined",
              meta: {
                auth: true,
                menu: true,
              },
            },
            {
              path: "/meeting/importExport",
              title: "导入/导出",
              redirect: "",
              modulePath: "meetingImportExport",
              icon: "TeamOutlined",
              meta: {
                auth: true,
                menu: true,
              },
            },
            {
              path: "/meeting/address",
              title: "地址",
              redirect: "",
              modulePath: "meetingAddress",
              icon: "BuildOutlined",
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
          icon: "SettingOutlined",
          meta: {
            auth: true,
            menu: true,
          },
        },
        {
          path: "/expertDatabase",
          title: "专家库",
          redirect: "",
          modulePath: "expertDatabase",
          icon: "BuildOutlined",
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
