import type { ActionType, ProColumns } from "@ant-design/pro-components";
import { ProTable } from "@ant-design/pro-components";
import PopConfirm from "@src/components/popConfirm";
import { Button } from "antd";
import { useRef } from "react";
import AddOrEdit from "./components/addOrEdit";

interface DataType {
  key: number;
  name: string;
  sort: number;
  status: string;
  createTime: string;
}

export type TableListItem = DataType;

export default () => {
  const actionRef = useRef<ActionType>(null);
  const tableListDataSource: TableListItem[] = [
    {
      key: 1,
      name: "超级管理员",
      sort: 1,
      status: "正常",
      createTime: "202201-12",
    },
  ];

  const columns: ProColumns<TableListItem>[] = [
    {
      title: "角色名",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "排序",
      dataIndex: "sort",
      key: "sort",
      search: false,
    },
    {
      title: "状态",
      dataIndex: "status",
      key: "status",
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
        <AddOrEdit isButton={false} title="修改" data={record} />,
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
        headerTitle="角色管理"
        toolBarRender={() => [<AddOrEdit isButton title="新增" />]}
      />
    </div>
  );
};
