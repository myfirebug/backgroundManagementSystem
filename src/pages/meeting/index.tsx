import type { ActionType, ProColumns } from "@ant-design/pro-components";
import { ProTable } from "@ant-design/pro-components";
import PopConfirm from "@src/components/popConfirm";
import { Button } from "antd";
import { useRef } from "react";

export type TableListItem = {
  id: number;
  name: string;
  createdAt: string;
};
const tableListDataSource: TableListItem[] = [];

for (let i = 0; i < 5; i += 1) {
  tableListDataSource.push({
    id: i,
    name: "AppName",
    createdAt: "2025-04-01至2025-05-31",
  });
}

export default () => {
  const actionRef = useRef<ActionType>(null);
  const columns: ProColumns<TableListItem>[] = [
    {
      title: "会议名称",
      dataIndex: "name",
      render: (_) => <a>{_}</a>,
    },
    {
      title: "会议时间",
      width: 240,
      dataIndex: "createdAt",
      search: false,
    },
    {
      title: "操作",
      valueType: "option",
      key: "option",
      width: 260,
      render: (_, record) => [
        <span
          className=" text-blue-600 cursor-pointer hover:text-blue-500"
          key="address"
        >
          地址
        </span>,
        <span
          className=" text-blue-600 cursor-pointer hover:text-blue-500"
          key="importExort"
        >
          导入/导出
        </span>,
        <span
          className=" text-blue-600 cursor-pointer hover:text-blue-500"
          key="config"
        >
          配置
        </span>,
        <span
          className=" text-blue-600 cursor-pointer hover:text-blue-500"
          key="courseware"
        >
          课件管理
        </span>,
        <PopConfirm
          text="删除"
          requestName="reportDelete"
          key="delete"
          params={{
            ids: [record.id],
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
        bordered
        actionRef={actionRef}
        request={(params, sorter, filter) => {
          // 表单搜索项会从 params 传入，传递给后端接口。
          console.log(params, sorter, filter);
          return Promise.resolve({
            data: tableListDataSource,
            success: true,
          });
        }}
        rowKey="id"
        pagination={{
          showQuickJumper: true,
        }}
        search={{
          optionRender: false,
          collapsed: false,
        }}
        dateFormatter="string"
        headerTitle="会议管理列表"
        toolBarRender={() => [
          <Button type="primary" key="primary">
            创建会议
          </Button>,
        ]}
      />
    </div>
  );
};
