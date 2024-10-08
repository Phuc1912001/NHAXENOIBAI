/* eslint-disable jsx-a11y/alt-text */
import React, { useState } from "react";
import styles from "./TableListDiscount.module.scss";
import { Button, Image, Spin, Table, Tooltip } from "antd";
import { Discount } from "@/common/service/models/Discount";
import { ColumnsType } from "antd/es/table";
import dayjs from "dayjs";
import Status from "@/components/Status/Status";
import { EEventStatusProperties } from "@/app/admin/ma-giam-gia/discountCode.model";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import service from "@/common/service/apis";
import ViewImage from "@/components/ViewImage/ViewImage";

interface ITableListDiscount {
  openPanel: (data?: Discount.DiscountModel, type?: string) => void;
  listDiscount: Discount.DiscountModel[];
  currentPage?: number;
  totalRecordCount?: number;
  setPage?: (page: number) => void;
  handleOpenModal: (data?: Discount.DiscountModel) => void;
}

const TableListDiscount = (props: ITableListDiscount) => {
  const {
    openPanel,
    listDiscount,
    currentPage,
    totalRecordCount,
    setPage,
    handleOpenModal,
  } = props;

  const columns: ColumnsType<Discount.DiscountModel> = [
    {
      title: "Khuyến mãi",
      dataIndex: "title",
      key: "title",
      width: "20%",
      render: (_, record) => (
        <div className={styles.wrapperDiscountTile}>
          <ViewImage
            isPreview={false}
            keyImage={record.fileInforImage?.keyImage ?? ""}
            isHeight40={true}
          />

          <div className={styles.wrapperTitle}>
            <Tooltip
              title={
                <div className={styles.customTooltip}>{record?.title}</div>
              }
              color={"#fff"}
            >
              <span
                onClick={() => openPanel(record, "View")}
                className={`${styles.title}`}
              >
                {record.title}
              </span>
            </Tooltip>
          </div>
        </div>
      ),
    },
    {
      title: "Số tiền giảm",
      dataIndex: "discountTitle",
      key: "discountTitle",
      render: (_, record) => <div>{record.discountTitle}</div>,
    },
    {
      title: "Bắt đầu",
      dataIndex: "startTime",
      key: "startTime",
      render: (_, record) => (
        <div>{dayjs(record.startTime).format("DD/MM/YYYY HH:mm ")}</div>
      ),
    },
    {
      title: "Kết thúc",
      dataIndex: "endTime",
      key: "endTime",
      render: (_, record) => (
        <div>{dayjs(record.endTime).format("DD/MM/YYYY HH:mm ")}</div>
      ),
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
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
        dataSource={listDiscount}
        tableLayout="auto"
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

export default TableListDiscount;
