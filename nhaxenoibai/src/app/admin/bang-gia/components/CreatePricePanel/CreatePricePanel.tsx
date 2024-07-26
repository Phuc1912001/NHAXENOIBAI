import React, { forwardRef, useImperativeHandle, useState } from "react";
import styles from "./CreatePricePanel.module.scss";
import { Button, Drawer, Form, Input, Modal } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import { useForm } from "antd/es/form/Form";
import { useUnsavedChanges } from "@/common/hook/useUnsavedChanges";
import ModalDiscard from "@/components/ModalDiscard/ModalDiscard";
import service from "@/common/service/apis";
import { useLoading } from "@/common/context/useLoading";
import { PanelRef } from "../../priceList.model";
import { Price } from "@/common/service/models/Price";
import { useNotification } from "@/components/Notification/useNotification";

interface ICreatePricePanel {
  getListPrice: () => void;
}

const CreatePricePanel = (
  props: ICreatePricePanel,
  ref: React.Ref<PanelRef>
) => {
  const { getListPrice } = props;
  const [form] = useForm();
  const [isOpen, setIsOpenPanel] = useState<boolean>(false);
  const { isDirty, handleFormChange, setIsDirty } = useUnsavedChanges(
    form,
    isOpen
  );
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [type, setType] = useState<string>("Create");
  const [selectedData, setSelectedData] = useState<Price.PriceModel>();
  const notification = useNotification();

  const { showLoading, closeLoading } = useLoading();

  useImperativeHandle(ref, () => ({
    openPanel,
  }));

  const openPanel = (data?: Price.PriceModel, type?: string) => {
    setIsOpenPanel(true);
    setType(type ?? "Create");
    if (data) {
      form.setFieldsValue(data);
      setSelectedData(data);
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
      showLoading("createPrice");
      await form.validateFields();
      const model = form.getFieldsValue();

      const modelEdit: Price.PriceModel = {
        id: selectedData?.id,
        ...model,
      };
      if (type === "Create") {
        await service.price.createPrice(model);
      } else {
        await service.price.UpdatePrice(modelEdit);
      }
      type === "Create"
        ? notification.success("Tạo thành công.")
        : notification.success("Sửa thành công.");

      getListPrice();
      form.resetFields();
      setIsDirty(false);
      setIsOpenPanel(false);

      closeLoading("createPrice");
    } catch (error) {
      closeLoading("createPrice");
    }
  };

  return (
    <div>
      <Drawer
        title={
          <span style={{ color: "#12161B" }}>{`${
            type === "View"
              ? "Xem Giá Xe"
              : type === "Create"
              ? "Tạo Giá Xe"
              : "Sửa Giá Xe"
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
                Tạo Giá Xe
              </Button>
            ) : (
              type === "Edit" && (
                <Button type="primary" onClick={handleSubmit}>
                  Sửa Giá Xe
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
              rules={[{ required: true, message: "Vui lòng điền loại xe." }]}
              name="carType"
              label="Loại Xe :"
            >
              <Input maxLength={200} />
            </Form.Item>

            <Form.Item
              rules={[
                {
                  required: true,
                  message: "Vui lòng điền giá Hà Nội -> Nội Bài.",
                },
              ]}
              name="fromHanoiToNoiBai"
              label="Hà Nội -> Nội Bài:"
            >
              <Input maxLength={200} />
            </Form.Item>

            <Form.Item
              rules={[
                {
                  required: true,
                  message: "Vui lòng điền giá Nội Bài -> Hà Nội.",
                },
              ]}
              name="fromNoiBaiToHanoi"
              label="Nội Bài -> Hà Nội :"
            >
              <Input maxLength={200} />
            </Form.Item>

            <Form.Item
              rules={[
                {
                  required: true,
                  message: "Vui lòng điền giá hai chiều.",
                },
              ]}
              name="toWay"
              label="Hai Chiều :"
            >
              <Input maxLength={200} />
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

export default forwardRef(CreatePricePanel);
