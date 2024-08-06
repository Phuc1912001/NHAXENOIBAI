import TableMobile, {
  ITableSection,
} from "@/app/admin/Components/TableMobile/TableMobile";
import { Discount } from "@/common/service/models/Discount";
import React, { useState } from "react";
import styles from "./TableDiscountMobile.module.scss";
import ViewImage from "@/components/ViewImage/ViewImage";
import { DeleteOutlined, EditOutlined, MoreOutlined } from "@ant-design/icons";
import { Dropdown, MenuProps, Pagination, Popover } from "antd";
import Status from "@/components/Status/Status";
import { EEventStatusProperties } from "@/app/admin/ma-giam-gia/discountCode.model";
import dayjs from "dayjs";

interface ITableDiscountMobile {
  data: Discount.DiscountModel[];
  openPanel: (data?: Discount.DiscountModel, type?: string) => void;
  handleOpenModal: (data?: Discount.DiscountModel) => void;
  currentPage: number;
  totalRecordCount: number;
  setPage?: (page: number) => void;
}

const TableDiscountMobile = (props: ITableDiscountMobile) => {
  const {
    data,
    openPanel,
    handleOpenModal,
    currentPage,
    totalRecordCount,
    setPage,
  } = props;
  const [currentRecord, setCurrentRecord] = useState<Discount.DiscountModel>();

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

  const handleIconClick = (record?: Discount.DiscountModel) => {
    setCurrentRecord(record);
  };

  const tableSections: ITableSection<Discount.DiscountModel> = {
    header: {
      dataIndex: "discountNumber",
      render: (record) => (
        <div className={styles.wrapperHeader}>
          <div className={styles.wrapperTitle}>
            <div>
              <ViewImage
                isPreview={false}
                keyImage={record?.fileInforImage?.keyImage ?? ""}
                isHeight40={true}
              />
            </div>
            <div
              className={styles.title}
              onClick={() => openPanel(record, "View")}
            >
              <div className={styles.typeBanding}>{record?.title}</div>
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
        label: "Số tiền giảm",
        dataIndex: "title",
        render: (record) => (
          <div className={styles.content}>{record?.discountTitle}</div>
        ),
      },
      {
        label: "Trạng thái",
        dataIndex: "status",
        render: (record) => (
          <div className={styles.content}>
            <Status
              data={EEventStatusProperties}
              label={record?.status ?? 1}
            ></Status>
          </div>
        ),
      },
      {
        label: "Bắt đầu",
        dataIndex: "startTime",
        render: (record) => (
          <div className={styles.content}>
            {dayjs(record?.startTime).format("DD/MM/YYYY HH:mm ")}
          </div>
        ),
      },
      {
        label: "Kết thúc",
        dataIndex: "endTime",
        render: (record) => (
          <div className={styles.content}>
            {dayjs(record?.endTime).format("DD/MM/YYYY HH:mm ")}
          </div>
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

export default TableDiscountMobile;
