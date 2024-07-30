import { Money } from "@/common/service/models/Money";
import Table, { ColumnsType } from "antd/es/table";
import React from "react";
import styles from "./TableListMoney.module.scss";
import { Button } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

interface ITableListMoney {
  openPanel: (data?: Money.MoneyModel, type?: string) => void;
  listMoney?: Money.MoneyModel[];
  currentPage?: number;
  totalRecordCount?: number;
  setPage?: (page: number) => void;
  handleOpenModal: (data?: Money.MoneyModel) => void;
}

const TableListMoney = (props: ITableListMoney) => {
  const {
    openPanel,
    listMoney,
    currentPage,
    totalRecordCount,
    setPage,
    handleOpenModal,
  } = props;

  const columns: ColumnsType<Money.MoneyModel> = [
    {
      title: "Số tiền(Chữ số)",
      dataIndex: "title",
      key: "title",
      render: (_, record) => (
        <div onClick={() => openPanel(record, "View")} className={styles.title}>
          {record.title}
        </div>
      ),
    },
    {
      title: "Số tiền",
      dataIndex: "money",
      key: "money",
      render: (_, record) => <div>{record.money}</div>,
    },
    {
      title: "Action",
      dataIndex: " ",
      key: "action",
      fixed: "right",
      render: (_, record) => (
        <div>
          <Button
            onClick={() => openPanel(record, "Edit")}
            type="text"
            icon={<EditOutlined style={{ fontSize: 18 }} />}
          />
          <Button
            onClick={() => handleOpenModal(record)}
            type="text"
            icon={<DeleteOutlined style={{ fontSize: 18 }} />}
          />
        </div>
      ),
    },
  ];
  return (
    <div>
      <Table
        columns={columns}
        dataSource={listMoney}
        tableLayout="auto"
        //   scroll={}
        className={`${styles.pcTable} nxsb-border-table`}
        rowKey={(record: A) => record.id ?? new Date().getTime()}
        pagination={{
          current: currentPage,
          pageSize: 10,
          total: totalRecordCount,
          simple: true,
          onChange: setPage,
        }}
      />
    </div>
  );
};

export default TableListMoney;
