import type { ActionType, ProColumns } from "@ant-design/pro-components";
import { ProTable } from "@ant-design/pro-components";
import { useRef } from "react";
import Add from "./components/add";
import { Switch } from "antd";
import CustomEditor from "@src/components/customEditor";

export type TableListItem = {
  id: number;
  name: string;
  status: string;
  sendMethod: string;
};
const tableListDataSource: TableListItem[] = [];

for (let i = 0; i < 10; i += 1) {
  tableListDataSource.push({
    id: i,
    name: "xxxx",
    sendMethod: "手动触发",
    status: "开启",
  });
}

export default () => {
  const actionRef = useRef<ActionType>(null);

  const columns: ProColumns<TableListItem>[] = [
    {
      title: "名称",
      width: 120,
      dataIndex: "name",
    },
    {
      title: "发送方式",
      dataIndex: "sendMethod",
      search: false,
    },
    {
      title: "状态",
      dataIndex: "status",
      width: 100,
      search: false,
      render: () => [
        <Switch
          checkedChildren="开启"
          unCheckedChildren="关闭"
          defaultChecked
        />,
      ],
    },
    {
      title: "操作",
      valueType: "option",
      key: "option",
      width: 150,
      render: () => [
        <span
          className=" text-blue-600 cursor-pointer hover:text-blue-500"
          key="editable"
        >
          修改
        </span>,
      ],
    },
  ];
  return (
    <div className=" p-4 custom-content">
      <CustomEditor value="<p>test</p>" />
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
        headerTitle="发件箱列表"
        toolBarRender={() => [<Add />]}
      />
    </div>
  );
};
