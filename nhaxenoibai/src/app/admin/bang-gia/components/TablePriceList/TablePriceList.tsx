import React from "react";
import styles from "./TablePriceList.module.scss";
import { Button, Table } from "antd";
import { Price } from "@/common/service/models/Price";
import { ColumnsType } from "antd/es/table";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

interface ITablePriceList {
  openPanel: (data?: Price.PriceModel, type?: string) => void;
  listPrice?: Price.PriceModel[];
  currentPage?: number;
  totalRecordCount?: number;
  setPage?: (page: number) => void;
  handleOpenModal: (data?: Price.PriceModel) => void;
}

const TablePriceList = (props: ITablePriceList) => {
  const {
    openPanel,
    listPrice,
    currentPage,
    totalRecordCount,
    setPage,
    handleOpenModal,
  } = props;

  const columns: ColumnsType<Price.PriceModel> = [
    {
      title: "Loại xe",
      dataIndex: "carType",
      key: "carType",
      render: (_, record) => (
        <div onClick={() => openPanel(record, "View")} className={styles.title}>
          {record.carType}
        </div>
      ),
    },
    {
      title: "Giá tiền/Km",
      dataIndex: "moneyTitle",
      key: "moneyTitle",
      render: (_, record) => <div>{record.moneyTitle}</div>,
    },
    {
      title: "Hà Nội -> Nội Bài ",
      dataIndex: "fromHanoiToNoiBai",
      key: "fromHanoiToNoiBai",
      render: (_, record) => <div>{record.fromHanoiToNoiBai}</div>,
    },
    {
      title: "Nội Bài -> Hà Nội",
      dataIndex: "fromNoiBaiToHanoi",
      key: "fromNoiBaiToHanoi",
      render: (_, record) => <div>{record.fromNoiBaiToHanoi}</div>,
    },
    {
      title: "Hai Chiều(Trong ngày)",
      dataIndex: "toWay",
      key: "toWay",
      render: (_, record) => <div>{record.toWay}</div>,
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
        dataSource={listPrice}
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

export default TablePriceList;
