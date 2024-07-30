import React from "react";
import styles from "./TableDiscountCode.module.scss";
import { DiscountCode } from "@/common/service/models/DiscountCode";
import { Button, Table } from "antd";
import { ColumnsType } from "antd/es/table";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import Status from "@/components/Status/Status";
import { EEventStatusProperties } from "../../discountCode.model";

interface ITableDiscountCode {
  openPanel: (data?: DiscountCode.DiscountCodeModel, type?: string) => void;
  listDiscountCode?: DiscountCode.DiscountCodeModel[];
  currentPage?: number;
  totalRecordCount?: number;
  setPage?: (page: number) => void;
  handleOpenModal: (data?: DiscountCode.DiscountCodeModel) => void;
}

const TableDiscountCode = (props: ITableDiscountCode) => {
  const {
    openPanel,
    listDiscountCode,
    currentPage,
    totalRecordCount,
    setPage,
    handleOpenModal,
  } = props;

  const columns: ColumnsType<DiscountCode.DiscountCodeModel> = [
    {
      title: "Mã Giảm giá",
      dataIndex: "title",
      key: "title",
      render: (_, record) => (
        <div onClick={() => openPanel(record, "View")} className={styles.title}>
          {record.title}
        </div>
      ),
    },
    {
      title: "Số tiền giảm",
      dataIndex: "discountCodeTitle",
      key: "discountCodeTitle",
      render: (_, record) => <div>{record.discountCodeTitle}</div>,
    },
    {
      title: "Bắt đầu",
      dataIndex: "StartTime",
      key: "StartTime",
      render: (_, record) => (
        <div>{dayjs(record.startTime).format("DD/MM/YYYY HH:mm ")}</div>
      ),
    },
    {
      title: "Kết thúc",
      dataIndex: "EndTime",
      key: "EndTime",
      render: (_, record) => (
        <div>{dayjs(record.endTime).format("DD/MM/YYYY HH:mm ")}</div>
      ),
    },
    {
      title: "Trạng thái",
      dataIndex: "EndTime",
      key: "EndTime",
      render: (_, record) => (
        <div>
          <Status
            data={EEventStatusProperties}
            label={record.status ?? 1}
          ></Status>
        </div>
      ),
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
        dataSource={listDiscountCode}
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

export default TableDiscountCode;
