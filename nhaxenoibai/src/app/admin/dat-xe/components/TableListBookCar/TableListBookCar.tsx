import React from "react";
import styles from "./TableListBookCar.module.scss";
import { BookCar } from "@/common/service/models/BookCarModel";
import Table, { ColumnsType } from "antd/es/table";
import { Button, Tooltip } from "antd";
import dayjs from "dayjs";
import Status from "@/components/Status/Status";
import { EEventStatusProperties } from "@/app/admin/ma-giam-gia/discountCode.model";
import { DeleteOutlined } from "@ant-design/icons";
import { EBookCarProperties } from "../../bookCar.model";

interface ITableListBookCar {
  listBookCar?: BookCar.BookCarModel[];
  currentPage?: number;
  totalRecordCount?: number;
  setPage?: (page: number) => void;
  handleOpenModal: (data?: BookCar.BookCarModel) => void;
}

const TableListBookCar = (props: ITableListBookCar) => {
  const {
    listBookCar,
    currentPage,
    totalRecordCount,
    setPage,
    handleOpenModal,
  } = props;

  const columns: ColumnsType<BookCar.BookCarModel> = [
    {
      title: "Khách hàng",
      dataIndex: "fullName",
      key: "fullName",
      width: "20%",
      render: (_, record) => (
        <div className={styles.wrapperTitle}>
          <div></div>
          <Tooltip
            title={
              <div className={styles.customTooltip}>{record?.fullName}</div>
            }
            color={"#fff"}
          >
            <span
              //   onClick={() => openPanel(record, "View")}
              className={`${styles.title}`}
            >
              {record.fullName}
            </span>
          </Tooltip>
        </div>
      ),
    },
    {
      title: "Thời gian đi",
      dataIndex: "startTime",
      key: "startTime",
      render: (_, record) => (
        <div>{dayjs(record.startTime).format("DD/MM/YYYY HH:mm ")}</div>
      ),
    },

    {
      title: "Trạng thái",
      dataIndex: "EndTime",
      key: "EndTime",
      render: (_, record) => (
        <div>
          <Status
            data={EBookCarProperties}
            label={Number(record.status) || 1}
          />
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
        dataSource={listBookCar}
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

export default TableListBookCar;
