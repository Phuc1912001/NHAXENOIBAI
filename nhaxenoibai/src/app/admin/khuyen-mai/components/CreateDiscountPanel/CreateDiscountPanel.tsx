import React, { forwardRef, useImperativeHandle, useState } from "react";
import styles from "./CreateDiscountPanel.module.scss";
import { Button, DatePicker, Drawer, Form, Input, Select } from "antd";
import { PanelRef } from "../../discount.model";
import { CloseOutlined } from "@ant-design/icons";
import { useForm } from "antd/es/form/Form";
import { useUnsavedChanges } from "@/common/hook/useUnsavedChanges";
import { useLoading } from "@/common/context/useLoading";
import { useNotification } from "@/components/Notification/useNotification";
import { Discount } from "@/common/service/models/Discount";
import ModalDiscard from "@/components/ModalDiscard/ModalDiscard";
import service from "@/common/service/apis";
import { Money } from "@/common/service/models/Money";
import dayjs from "dayjs";
import TextArea from "antd/es/input/TextArea";

interface ICreateDiscountPanel {
  // getListDiscount: () => void;
}

interface IOptionValue {
  label?: string;
  value?: string | number;
}

const CreateDiscountPanel = (
  props: ICreateDiscountPanel,
  ref: React.Ref<PanelRef>
) => {
  const [type, setType] = useState<string>("Create");
  const [isOpen, setIsOpenPanel] = useState<boolean>(false);
  const [form] = useForm();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { showLoading, closeLoading } = useLoading();
  const [selectedData, setSelectedData] = useState<Discount.DiscountModel>();
  const notification = useNotification();

  const { isDirty, handleFormChange, setIsDirty } = useUnsavedChanges(
    form,
    isOpen
  );

  const [optionMoney, setOptionMoney] = useState<IOptionValue[]>([]);

  const getFullListMoney = async () => {
    try {
      showLoading("GetFullListMoney");
      const { result } = await service.money.getFullListMoney();
      let newData = result.baseDatas.map((item: Money.MoneyModel) => ({
        label: item.title,
        value: item.id,
      }));
      setOptionMoney(newData);
      closeLoading("GetFullListMoney");
    } catch (error) {
      closeLoading("GetFullListMoney");
    }
  };

  useImperativeHandle(ref, () => ({
    openPanel,
  }));

  const openPanel = (data?: Discount.DiscountModel, type?: string) => {
    setIsOpenPanel(true);
    setType(type ?? "Create");
    if (data) {
      const dataDiscountCode = {
        ...data,
        startTime: dayjs(data.startTime),
        endTime: dayjs(data.endTime),
      };

      form.setFieldsValue(dataDiscountCode);
      setSelectedData(data);
    }
    if (type !== "View") {
      getFullListMoney();
    }
  };

  const handleClose = () => {
    if (isDirty) {
      setIsModalVisible(true);
    } else {
      setIsOpenPanel(false);
      form.resetFields();
    }
  };

  const handleSubmit = async () => {
    try {
      showLoading("CreateDiscount");
      await form.validateFields();
      const model = form.getFieldsValue();
      const createModel: Discount.DiscountModel = {
        ...model,
        startTime: dayjs(model.startTime).format(),
        endTime: dayjs(model.endTime).format(),
      };
      const modelEdit: Discount.DiscountModel = {
        ...model,
        id: selectedData?.id,
        startTime: dayjs(model.startTime).format(),
        endTime: dayjs(model.endTime).format(),
      };
      if (type === "Create") {
        await service.discountCode.createDiscountCode(createModel);
      } else {
        await service.discountCode.updateDiscountCode(modelEdit);
      }
      type === "Create"
        ? notification.success("Tạo thành công.")
        : notification.success("Sửa thành công.");

      // getDiscountCode();
      form.resetFields();
      setIsDirty(false);
      setIsOpenPanel(false);

      closeLoading("CreateDiscount");
    } catch (error) {
      closeLoading("CreateDiscount");
    }
  };

  const handleDiscard = () => {
    form.resetFields();
    setIsDirty(false);
    setIsOpenPanel(false);
    setIsModalVisible(false);
  };

  const handleStay = () => {
    setIsModalVisible(false);
  };

  const filterOption = (input: string, option?: IOptionValue) =>
    (option?.label ?? "").toLowerCase().includes(input.toLowerCase()) ||
    ((option as any)?.email || "").toLowerCase().includes(input.toLowerCase());

  return (
    <div>
      <Drawer
        title={
          <span style={{ color: "#12161B" }}>{`${
            type === "View"
              ? "Xem Khuyến Mãi"
              : type === "Create"
              ? "Tạo Khuyến Mãi"
              : "Sửa Khuyến Mãi"
          }`}</span>
        }
        destroyOnClose
        open={isOpen}
        placement="right"
        maskClosable={false}
        closable={false}
        extra={<CloseOutlined onClick={handleClose} />}
        footer={
          <div>
            <Button style={{ marginRight: "8px" }} onClick={handleClose}>
              Đóng
            </Button>
            {type === "Create" ? (
              <Button type="primary" onClick={handleSubmit}>
                Tạo Khuyến Mãi
              </Button>
            ) : (
              type === "Edit" && (
                <Button type="primary" onClick={handleSubmit}>
                  Sửa Khuyến Mãi
                </Button>
              )
            )}
          </div>
        }
        width={520}
      >
        {type === "Create" || type === "Edit" ? (
          <Form layout="vertical" form={form} onValuesChange={handleFormChange}>
            <Form.Item
              rules={[
                { required: true, message: "Vui lòng điền mã giảm giá." },
              ]}
              name="title"
              label="Tên khuyến mãi:"
            >
              <TextArea maxLength={2000} />
            </Form.Item>
            <Form.Item
              rules={[
                {
                  required: true,
                  message: "Vui lòng điền số tiền giảm.",
                },
              ]}
              name="discountCodeNumber"
              label="Số tiền giảm:"
            >
              <Select
                rootClassName={styles.emFilterSelectMultiple}
                placeholder="Chọn loại số tiền"
                options={optionMoney}
                showSearch
                filterOption={filterOption}
              />
            </Form.Item>

            <Form.Item
              rules={[
                {
                  required: true,
                  message: "Vui lòng điền thời gian bắt đầu.",
                },
              ]}
              name="startTime"
              label="Thời gian bắt đầu :"
            >
              <DatePicker
                // format="DD MMM YYYY"
                inputReadOnly={true}
                placeholder="chọn ngày bắt đầu"
                showTime
                showHour
                showMinute
              />
            </Form.Item>

            <Form.Item
              rules={[
                {
                  required: true,
                  message: "Vui lòng điền thời gian kết thúc.",
                },
              ]}
              name="endTime"
              label="Thời gian kết thúc :"
            >
              <DatePicker
                // format="DD MMM YYYY"
                inputReadOnly={true}
                placeholder="Chọn ngày kết thúc"
                showTime
                showHour
                showMinute
              />
            </Form.Item>
            <Form.Item
              rules={[
                {
                  required: true,
                  message: "Vui lòng điền mô tả .",
                },
              ]}
              name="description"
              label="Mô tả:"
            >
              <TextArea maxLength={2000} />
            </Form.Item>
          </Form>
        ) : (
          <div>view</div>
        )}
      </Drawer>
      <ModalDiscard
        openModal={isModalVisible}
        handleDiscard={handleDiscard}
        handleStay={handleStay}
      />
    </div>
  );
};

export default forwardRef(CreateDiscountPanel);
