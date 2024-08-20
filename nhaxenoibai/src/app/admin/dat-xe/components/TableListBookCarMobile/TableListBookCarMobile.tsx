"use client";
import TableMobile, {
  ITableSection,
} from "@/app/admin/Components/TableMobile/TableMobile";
import { EEventStatusProperties } from "@/app/admin/ma-giam-gia/discountCode.model";
import { BookCar } from "@/common/service/models/BookCarModel";
import Status from "@/components/Status/Status";
import { DeleteOutlined, EditOutlined, MoreOutlined } from "@ant-design/icons";
import { Dropdown, MenuProps } from "antd";
import dayjs from "dayjs";
import { useState } from "react";
import styles from "./TableListBookCarMobile.module.scss";
import { EBookCarProperties } from "../../bookCar.model";

interface ITableListBookCarMobile {
  data: BookCar.BookCarModel[];
  handleOpenModal: (data?: BookCar.BookCarModel) => void;
  currentPage: number;
  totalRecordCount: number;
  setPage?: (page: number) => void;
}

const TableListBookCarMobile = (props: ITableListBookCarMobile) => {
  const { data, handleOpenModal, currentPage, totalRecordCount, setPage } =
    props;

  const [currentRecord, setCurrentRecord] = useState<BookCar.BookCarModel>();

  const items: MenuProps["items"] = [
    {
      key: "1",
      label: (
        <div
          className={styles.wrapperEdit}
          //   onClick={() => handleOpenPanel("Edit")}
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

  const handleIconClick = (record?: BookCar.BookCarModel) => {
    setCurrentRecord(record);
  };

  const tableSections: ITableSection<BookCar.BookCarModel> = {
    header: {
      dataIndex: "fullName",
      render: (record) => (
        <div className={styles.wrapperHeader}>
          <div className={styles.wrapperTitle}>
            <div
              className={styles.title}
              //   onClick={() => openPanel(record, "View")}
            >
              <div className={styles.typeBanding}>{record?.fullName}</div>
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
        label: "Thoi gian di",
        dataIndex: "startTime",
        render: (record) => (
          <div className={styles.content}>
            {dayjs(record?.startTime).format("DD/MM/YYYY HH:mm ")}
          </div>
        ),
      },
      {
        label: "Trạng thái",
        dataIndex: "status",
        render: (record) => (
          <div>
            <Status
              data={EBookCarProperties}
              label={Number(record?.status) || 1}
            />
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

export default TableListBookCarMobile;
