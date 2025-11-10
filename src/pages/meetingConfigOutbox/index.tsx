import type { ActionType, ProColumns } from "@ant-design/pro-components";
import { ProTable } from "@ant-design/pro-components";
import PopConfirm from "@src/components/popConfirm";
import { useRef } from "react";
import Add from "./components/add";

export type TableListItem = {
  id: number;
  name: string;
  account: number;
  successNum: number;
  errorNum: number;
  creator: string;
};
const tableListDataSource: TableListItem[] = [];

const creators = ["付小小", "曲丽丽", "林东东", "陈帅帅", "兼某某"];

for (let i = 0; i < 10; i += 1) {
  tableListDataSource.push({
    id: i,
    name: "xxxx",
    account: Math.floor(Math.random() * 20),
    successNum: Math.floor(Math.random() * 20),
    errorNum: Math.floor(Math.random() * 20),
    creator: creators[Math.floor(Math.random() * creators.length)],
  });
}

export default () => {
  const actionRef = useRef<ActionType>(null);

  const columns: ProColumns<TableListItem>[] = [
    {
      title: "类型",
      width: 120,
      dataIndex: "name",
    },
    {
      title: "账号",
      dataIndex: "account",
    },
    {
      title: "今日发送邮件数",
      dataIndex: "successNum",
    },
    {
      title: "今日发送邮件失败数",
      dataIndex: "errorNum",
    },
    {
      title: "操作",
      valueType: "option",
      key: "option",
      width: 150,
      render: (_, record) => [
        <span
          className=" text-blue-600 cursor-pointer hover:text-blue-500"
          key="editable"
        >
          关闭
        </span>,
        <PopConfirm
          text="删除"
          requestName="reportDelete"
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
        actionRef={actionRef}
        bordered
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
        search={false}
        headerTitle="发件箱列表"
        toolBarRender={() => [<Add />]}
      />
    </div>
  );
};
