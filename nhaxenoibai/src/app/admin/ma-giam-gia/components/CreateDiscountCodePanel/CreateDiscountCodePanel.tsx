"use client";
import React, { forwardRef, useImperativeHandle, useState } from "react";
import styles from "./CreateDiscountCodePanel.module.scss";
import { PanelRefDiscountCode } from "../../discountCode.model";
import { useForm } from "antd/es/form/Form";
import { DiscountCode } from "@/common/service/models/DiscountCode";
import { Button, DatePicker, Drawer, Form, Input, Select } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import { useUnsavedChanges } from "@/common/hook/useUnsavedChanges";
import ModalDiscard from "@/components/ModalDiscard/ModalDiscard";
import { useLoading } from "@/common/context/useLoading";
import { useNotification } from "@/components/Notification/useNotification";
import service from "@/common/service/apis";
import { Money } from "@/common/service/models/Money";
import dayjs from "dayjs";

interface ICreateDiscountCodePanel {
  getDiscountCode: () => void;
}

interface IOptionValue {
  label?: string;
  value?: string | number;
}
const CreateDiscountCodePanel = (
  props: ICreateDiscountCodePanel,
  ref: React.Ref<PanelRefDiscountCode>
) => {
  const { getDiscountCode } = props;
  const [form] = useForm();
  const [isOpen, setIsOpenPanel] = useState<boolean>(false);
  const [type, setType] = useState<string>("Create");
  const notification = useNotification();
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const { isDirty, handleFormChange, setIsDirty } = useUnsavedChanges(
    form,
    isOpen
  );
  const [selectedData, setselectedData] =
    useState<DiscountCode.DiscountCodeModel>();
  const [dataMoney, setDataMoney] = useState<Money.MoneyModel[]>([]);
  const [optionMoney, setOptionMoney] = useState<IOptionValue[]>([]);

  const { showLoading, closeLoading } = useLoading();

  const getFullListMoney = async () => {
    try {
      showLoading("GetFullListMoney");
      const { result } = await service.money.getFullListMoney();
      setDataMoney(result.baseDatas);
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

  const openPanel = (data?: DiscountCode.DiscountCodeModel, type?: string) => {
    setIsOpenPanel(true);
    setType(type ?? "Create");
    if (data) {
      const dataDiscountCode = {
        ...data,
        startTime: dayjs(data.startTime),
        endTime: dayjs(data.endTime),
      };

      form.setFieldsValue(dataDiscountCode);
      setselectedData(data);
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

  const handleDiscard = () => {
    form.resetFields();
    setIsDirty(false);
    setIsOpenPanel(false);
    setIsModalVisible(false);
  };

  const handleStay = () => {
    setIsModalVisible(false);
  };

  const handleSubmit = async () => {
    try {
      showLoading("CreateDiscountCode");
      await form.validateFields();
      const model = form.getFieldsValue();
      const createModel: DiscountCode.DiscountCodeModel = {
        ...model,
        startTime: dayjs(model.startTime).format(),
        endTime: dayjs(model.endTime).format(),
      };
      const modelEdit: DiscountCode.DiscountCodeModel = {
        id: selectedData?.id,
        ...model,
      };
      if (type === "Create") {
        await service.discountCode.createDiscountCode(createModel);
      } else {
        await service.discountCode.updateDiscountCode(modelEdit);
      }
      type === "Create"
        ? notification.success("Tạo thành công.")
        : notification.success("Sửa thành công.");

      getDiscountCode();
      form.resetFields();
      setIsDirty(false);
      setIsOpenPanel(false);

      closeLoading("CreateDiscountCode");
    } catch (error) {
      closeLoading("CreateDiscountCode");
    }
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
              ? "Xem Mã giảm"
              : type === "Create"
              ? "Tạo Mã Giảm "
              : "Sửa Mã Giảm "
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
                Tạo Mã Giảm
              </Button>
            ) : (
              type === "Edit" && (
                <Button type="primary" onClick={handleSubmit}>
                  Sửa Mã Giảm
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
              label="Mã Giảm giá:"
            >
              <Input maxLength={200} />
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
                  message: "Vui lòng điền mô tả .",
                },
              ]}
              name="description"
              label="Mô tả:"
            >
              <Input maxLength={200} />
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

export default forwardRef(CreateDiscountCodePanel);
