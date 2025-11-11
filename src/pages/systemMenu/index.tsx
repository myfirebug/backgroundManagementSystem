import type { ActionType, ProColumns } from "@ant-design/pro-components";
import { ProTable } from "@ant-design/pro-components";
import PopConfirm from "@src/components/popConfirm";
import { Button } from "antd";
import { useRef } from "react";
import Add from "./components/addOrEdit";

interface DataType {
  key: React.ReactNode;
  menuName: string;
  icon: string;
  sort: number;
  componentPath: string;
  path: string;
  status: string;
  createTime: string;
  children?: DataType[];
}

export type TableListItem = DataType;

export default () => {
  const actionRef = useRef<ActionType>(null);
  const tableListDataSource: TableListItem[] = [
    {
      key: 1,
      path: "/meeting",
      menuName: "会议管理",
      icon: "",
      sort: 1,
      componentPath: "",
      status: "正常",
      createTime: "202201-12",
      children: [
        {
          key: 11,
          path: "/meeting/list",
          menuName: "会议列表",
          icon: "",
          sort: 1,
          componentPath: "meeting",
          status: "正常",
          createTime: "202201-12",
        },
        {
          key: 12,
          path: "/meeting/config",
          menuName: "配置",
          icon: "",
          sort: 1,
          componentPath: "",
          status: "正常",
          createTime: "202201-12",
          children: [
            {
              key: 121,
              path: "/meeting/config/dispatchBox",
              menuName: "发件箱配置",
              icon: "",
              sort: 1,
              componentPath: "meetingConfigDispatchBox",
              status: "正常",
              createTime: "202201-12",
            },
            {
              key: 122,
              path: "/meeting/config/template",
              menuName: "模版配置",
              icon: "",
              sort: 1,
              componentPath: "meetingConfigTemplate",
              status: "正常",
              createTime: "202201-12",
            },
            {
              key: 123,
              path: "/meeting/config/page",
              menuName: "页面显示配置",
              icon: "",
              sort: 1,
              componentPath: "meetingConfigPage",
              status: "正常",
              createTime: "202201-12",
            },
            {
              key: 124,
              path: "/meeting/config/courseware",
              menuName: "课件配置",
              icon: "",
              sort: 1,
              componentPath: "meetingConfigCourseware",
              status: "正常",
              createTime: "202201-12",
            },
            {
              key: 125,
              path: "/meeting/config/schedule",
              menuName: "日程配置",
              icon: "",
              sort: 1,
              componentPath: "",
              status: "正常",
              createTime: "202201-12",
              children: [
                {
                  key: 1211,
                  path: "/meeting/config/schedule/topicTypes",
                  menuName: "讲题类型配置",
                  icon: "",
                  sort: 1,
                  componentPath: "meetingConfigCourScheduleTopicTypes",
                  status: "正常",
                  createTime: "202201-12",
                },
                {
                  key: 1212,
                  path: "/meeting/config/schedule/sessionLabel",
                  menuName: "session标签配置",
                  icon: "",
                  sort: 1,
                  componentPath: "meetingConfigCourScheduleSessionLabel",
                  status: "正常",
                  createTime: "202201-12",
                },
                {
                  key: 1213,
                  path: "/meeting/config/schedule/topicLabel",
                  menuName: "讲题标签配置",
                  icon: "",
                  sort: 1,
                  componentPath: "meetingConfigCourScheduleTopicLabel",
                  status: "正常",
                  createTime: "202201-12",
                },
                {
                  key: 1214,
                  path: "/meeting/config/schedule/conflict",
                  menuName: "冲突配置",
                  icon: "",
                  sort: 1,
                  componentPath: "meetingConfigCourScheduleConflict",
                  status: "正常",
                  createTime: "202201-12",
                },
                {
                  key: 1215,
                  path: "/meeting/config/schedule/session",
                  menuName: "session配置",
                  icon: "",
                  sort: 1,
                  componentPath: "meetingConfigCourScheduleSession",
                  status: "正常",
                  createTime: "202201-12",
                },
                {
                  key: 1216,
                  path: "/meeting/config/schedule/topic",
                  menuName: "讲题配置",
                  icon: "",
                  sort: 1,
                  componentPath: "meetingConfigCourScheduleTopic",
                  status: "正常",
                  createTime: "202201-12",
                },
              ],
            },
          ],
        },
      ],
    },
    {
      key: 2,
      path: "/system",
      menuName: "系统管理",
      icon: "",
      sort: 1,
      componentPath: "",
      status: "正常",
      createTime: "202201-12",
      children: [
        {
          key: 21,
          path: "/system/menu",
          menuName: "菜单管理",
          icon: "",
          sort: 1,
          componentPath: "systemMenu",
          status: "正常",
          createTime: "202201-12",
        },
        {
          key: 22,
          path: "/system/user",
          menuName: "用户管理",
          icon: "",
          sort: 1,
          componentPath: "systemUser",
          status: "正常",
          createTime: "202201-12",
        },
        {
          key: 23,
          path: "/system/role",
          menuName: "角色管理",
          icon: "",
          sort: 1,
          componentPath: "systemRole",
          status: "正常",
          createTime: "202201-12",
        },
      ],
    },
  ];

  const columns: ProColumns<TableListItem>[] = [
    {
      title: "菜单名称",
      dataIndex: "menuName",
      key: "menuName",
    },
    {
      title: "图标",
      dataIndex: "icon",
      key: "icon",
      search: false,
    },
    {
      title: "排序",
      dataIndex: "sort",
      key: "sort",
      search: false,
    },
    {
      title: "路由",
      dataIndex: "path",
      key: "path",
      search: false,
    },
    {
      title: "组件路径",
      dataIndex: "componentPath",
      key: "componentPath",
      search: false,
    },
    {
      title: "状态",
      dataIndex: "status",
      key: "status",
      search: false,
    },
    {
      title: "创建时间",
      dataIndex: "createTime",
      key: "createTime",
      search: false,
    },
    {
      title: "操作",
      valueType: "option",
      key: "option",
      width: 120,
      render: (_, record) => [
        <Add title="修改" isButton={false} data={record} key="modify" />,
        <Add title="新增" isButton={false} data={record} key="add" />,
        <PopConfirm
          text="删除"
          requestName="reportDelete"
          key="delete"
          params={{
            ids: [record.key],
          }}
          reload={actionRef.current?.reloadAndRest}
        ></PopConfirm>,
      ],
    },
  ];

  return (
    <div className=" p-4 custom-content">
      <ProTable<TableListItem>
        columns={columns}
        actionRef={actionRef}
        request={(params, sorter, filter) => {
          // 表单搜索项会从 params 传入，传递给后端接口。
          console.log(params, sorter, filter);
          return Promise.resolve({
            data: tableListDataSource,
            success: true,
          });
        }}
        rowKey="key"
        pagination={{
          showQuickJumper: true,
        }}
        search={{
          labelWidth: "auto",
        }}
        dateFormatter="string"
        headerTitle="菜单管理"
        toolBarRender={() => [<Add title="新增" isButton />]}
      />
    </div>
  );
};
