import React, { forwardRef, useImperativeHandle, useState } from "react";
import styles from "./DiscountCodeFilterPanel.module.scss";
import {
  Button,
  Checkbox,
  Col,
  DatePicker,
  Drawer,
  Form,
  Row,
  Select,
} from "antd";
import { CloseOutlined } from "@ant-design/icons";
import {
  EDiscountStatus,
  IFilterDiscountCodeValue,
  IFilterDrawerSections,
  PanelRefFilter,
} from "../../discountCode.model";
import { DiscountCode } from "@/common/service/models/DiscountCode";
import Card from "@/app/admin/Components/FoldCard/FoldCard";
import { useDevice } from "@/common/context/useDevice";
import { EDeviceType } from "@/common/enum/EDevice";

interface IDiscountCodeFilterPanel {
  dataFilterDiscountCode?: DiscountCode.DiscountCodeFilterModel;
  filterValue?: IFilterDiscountCodeValue;
  filter: (val: IFilterDiscountCodeValue) => void;
}
interface IOptionValue {
  label?: string;
  value?: string | number;
}

const DiscountCodeFilterPanel = (
  props: IDiscountCodeFilterPanel,
  ref: React.Ref<PanelRefFilter>
) => {
  const { dataFilterDiscountCode, filterValue, filter } = props;
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

  const filterOption = (input: string, option?: IOptionValue) =>
    (option?.label ?? "").toLowerCase().includes(input.toLowerCase()) ||
    ((option as A)?.email || "").toLowerCase().includes(input.toLowerCase());

  const renderNameStatus = (item?: number) => {
    switch (item) {
      case EDiscountStatus.Active:
        return "Hoạt động";
      case EDiscountStatus.PendingActive:
        return "Chờ hoạt động";
      case EDiscountStatus.Expired:
        return "Hết hạn";
      default:
        "Active";
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
                {dataFilterDiscountCode?.status.map((item) => (
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
      title: "Số tiền",
      key: "money",
      name: "money",
      isDisplay: true,
      render() {
        return (
          <Form.Item
            name="money"
            className={styles["ant-form-item"]}
            style={{ marginBottom: "0" }}
          >
            <Select
              rootClassName={styles.emFilterSelectMultiple}
              mode="multiple"
              placeholder="Chọn số tiền"
              options={dataFilterDiscountCode?.moneyFilters}
              filterOption={filterOption}
            />
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
              showTime
              showHour
              showMinute
            />
          </Form.Item>
        );
      },
    },
  ];
  const onFinish = (val: IFilterDiscountCodeValue) => {
    filter(val);
    setOpen(false);
  };

  const resetFilter = () => {
    form.resetFields();
  };

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
        title={<span style={{ color: "#12161B" }}>Bộ lọc mã giảm giá </span>}
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

export default forwardRef(DiscountCodeFilterPanel);
