import React, { forwardRef, useImperativeHandle, useState } from "react";
import styles from "./PanelFilterBookCar.module.scss";
import { Button, Checkbox, Col, DatePicker, Drawer, Form, Row } from "antd";
import { useDevice } from "@/common/context/useDevice";
import { EDeviceType } from "@/common/enum/EDevice";
import {
  EBookCarStatus,
  IFilterBookCarValue,
  PanelRefFilter,
} from "../../bookCar.model";
import { CloseOutlined } from "@ant-design/icons";
import { IFilterDrawerSections } from "@/app/admin/ma-giam-gia/discountCode.model";
import { BookCar } from "@/common/service/models/BookCarModel";
import Card from "@/app/admin/Components/FoldCard/FoldCard";

interface IBookCarFilterPanel {
  dataFilterBookCar?: BookCar.BookCarFilterModel;
  filterValue?: IFilterBookCarValue;
  filter: (val: IFilterBookCarValue) => void;
}

const PanelFilterBookCar = (
  props: IBookCarFilterPanel,
  ref: React.Ref<PanelRefFilter>
) => {
  const { dataFilterBookCar, filterValue, filter } = props;
  const [open, setOpen] = useState<boolean>(false);
  const [form] = Form.useForm();
  const { RangePicker } = DatePicker;
  const { type: typeDevice } = useDevice();
  const isMobile = typeDevice === EDeviceType.Mobile;
  useImperativeHandle(ref, () => ({
    handleOpenPanel,
  }));

  const handleOpenPanel = () => {
    form.resetFields();
    form.setFieldsValue(filterValue);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const onFinish = (val: IFilterBookCarValue) => {
    filter(val);
    setOpen(false);
  };

  const resetFilter = () => {
    form.resetFields();
  };

  const renderNameStatus = (item?: number) => {
    switch (item) {
      case EBookCarStatus.PendingGo:
        return "Chờ đi";
      case EBookCarStatus.Complete:
        return "Hoàn thành";
      default:
        "Hoàn thành";
        break;
    }
  };

  const filterSections: IFilterDrawerSections[] = [
    {
      title: "Trạng thái",
      key: "status",
      name: "status",
      isDisplay: true,
      render() {
        return (
          <Form.Item
            name="status"
            className={styles.assessment}
            style={{ marginBottom: "0" }}
          >
            <Checkbox.Group className={styles.groupRow}>
              <Row gutter={[0, 19]}>
                {dataFilterBookCar?.status?.map((item) => (
                  <Col xs={12} key={item}>
                    <Checkbox value={item}>{renderNameStatus(item)}</Checkbox>
                  </Col>
                ))}
              </Row>
            </Checkbox.Group>
          </Form.Item>
        );
      },
    },

    {
      title: "Khoảng thời gian",
      key: "dateRange",
      name: "dateRange",
      isDisplay: true,
      render() {
        return (
          <Form.Item
            name="dateRange"
            className={styles["ant-form-item"]}
            style={{ marginBottom: "0" }}
          >
            <RangePicker
              placement="bottomLeft"
              popupClassName={styles.nxsbRangePickerFilterRangeDate}
              format="DD MMM YYYY HH:mm"
              placeholder={["Bắt đầu", "Kết thúc"]}
              style={{ width: "100%" }}
              inputReadOnly={true}
            />
          </Form.Item>
        );
      },
    },
  ];

  const renderActionButton = () => {
    return (
      <div className={styles.wrapperFooter}>
        <Button onClick={handleClose}>Đóng</Button>
        <Button onClick={resetFilter}>Reset</Button>
        <Button
          type="primary"
          onClick={() => {
            form.submit();
          }}
        >
          Áp Dụng
        </Button>
      </div>
    );
  };

  return (
    <div>
      <Drawer
        title={<span style={{ color: "#12161B" }}>Bộ lọc đặt xe </span>}
        destroyOnClose
        open={open}
        placement="right"
        maskClosable={false}
        closable={false}
        extra={<CloseOutlined onClick={handleClose} />}
        footer={renderActionButton()}
        width={isMobile ? "90%" : 420}
      >
        <Form onFinish={onFinish} layout="vertical" form={form}>
          {filterSections.map((record) => {
            return (
              record.isDisplay && (
                <Card key={record.key} title={record.title}>
                  <div>{record.render()}</div>
                </Card>
              )
            );
          })}
        </Form>
      </Drawer>
    </div>
  );
};

export default forwardRef(PanelFilterBookCar);
