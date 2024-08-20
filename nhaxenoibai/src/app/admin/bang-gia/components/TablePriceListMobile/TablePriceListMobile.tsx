import React, { useState } from "react";
import styles from "./TablePriceListMobile.module.scss";
import { Price } from "@/common/service/models/Price";
import { Dropdown, MenuProps } from "antd";
import { DeleteOutlined, EditOutlined, MoreOutlined } from "@ant-design/icons";
import TableMobile, {
  ITableSection,
} from "@/app/admin/Components/TableMobile/TableMobile";

interface ITablePriceListMobile {
  data: Price.PriceModel[];
  openPanel: (data?: Price.PriceModel, type?: string) => void;
  handleOpenModal: (data?: Price.PriceModel) => void;
  currentPage: number;
  totalRecordCount: number;
  setPage?: (page: number) => void;
}

const TablePriceListMobile = (props: ITablePriceListMobile) => {
  const {
    data,
    openPanel,
    handleOpenModal,
    currentPage,
    totalRecordCount,
    setPage,
  } = props;
  const [currentRecord, setCurrentRecord] = useState<Price.PriceModel>();

  const handleOpenPanel = (type: string) => {
    openPanel(currentRecord, type);
  };

  const items: MenuProps["items"] = [
    {
      key: "1",
      label: (
        <div
          className={styles.wrapperEdit}
          onClick={() => handleOpenPanel("Edit")}
        >
          <EditOutlined />
          <div>Sửa</div>
        </div>
      ),
    },
    {
      key: "2",
      label: (
        <div
          className={styles.wrapperEdit}
          onClick={() => handleOpenModal(currentRecord)}
        >
          <DeleteOutlined />
          <div>Xóa</div>
        </div>
      ),
    },
  ];

  const handleIconClick = (record?: Price.PriceModel) => {
    setCurrentRecord(record);
  };

  const tableSections: ITableSection<Price.PriceModel> = {
    header: {
      dataIndex: "carType",
      render: (record) => (
        <div className={styles.wrapperHeader}>
          <div className={styles.wrapperTitle}>
            <div
              className={styles.title}
              onClick={() => openPanel(record, "View")}
            >
              <div className={styles.typeBanding}>{record?.carType}</div>
            </div>
          </div>

          <Dropdown
            menu={{ items }}
            placement="topRight"
            arrow
            trigger={["click"]}
          >
            <div
              className={styles.wrapperIcon}
              onClick={() => handleIconClick(record)}
            >
              <MoreOutlined style={{ fontSize: "24px", fontWeight: 700 }} />
            </div>
          </Dropdown>
        </div>
      ),
    },
    body: [
      {
        label: "Hà Nội->Nội Bài",
        dataIndex: "fromHanoiToNoiBai",
        render: (record) => (
          <div className={styles.content}>{record?.fromHanoiToNoiBai}</div>
        ),
      },
      {
        label: "Nội Bài->Hà Nội",
        dataIndex: "fromHanoiToNoiBai",
        render: (record) => (
          <div className={styles.content}>{record?.fromNoiBaiToHanoi}</div>
        ),
      },
      {
        label: "Hai chiều(trong ngày)",
        dataIndex: "toWay",
        render: (record) => (
          <div className={styles.content}>{record?.toWay}</div>
        ),
      },
    ],
  };

  return (
    <div>
      <TableMobile
        list={data}
        tableSection={tableSections}
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

export default TablePriceListMobile;
