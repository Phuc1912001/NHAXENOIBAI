import React, { forwardRef, useImperativeHandle, useState } from "react";
import styles from "./CreateDiscountPanel.module.scss";
import { Button, Drawer, Form, Input } from "antd";
import { PanelRef } from "../../discount.model";
import { CloseOutlined } from "@ant-design/icons";
import { useForm } from "antd/es/form/Form";
import { useUnsavedChanges } from "@/common/hook/useUnsavedChanges";
import { useLoading } from "@/common/context/useLoading";
import { useNotification } from "@/components/Notification/useNotification";
import { Discount } from "@/common/service/models/Discount";
import ModalDiscard from "@/components/ModalDiscard/ModalDiscard";

interface ICreateDiscountPanel {
  // getListDiscount: () => void;
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

  useImperativeHandle(ref, () => ({
    openPanel,
  }));

  const openPanel = (data?: Discount.DiscountModel, type?: string) => {
    console.log("type", type);

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

  const handleSubmit = async () => {
    try {
      showLoading("createDiscount");
      await form.validateFields();
      const model = form.getFieldsValue();

      const modelEdit: Discount.DiscountModel = {
        id: selectedData?.id,
        ...model,
      };
      //   if (type === "Create") {
      //     await service.price.createPrice(model);
      //   } else {
      //     await service.price.UpdatePrice(modelEdit);
      //   }
      type === "Create"
        ? notification.success("Tạo thành công.")
        : notification.success("Sửa thành công.");

      //   getListPrice();
      form.resetFields();
      setIsDirty(false);
      setIsOpenPanel(false);

      closeLoading("createDiscount");
    } catch (error) {
      closeLoading("createDiscount");
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

export default forwardRef(CreateDiscountPanel);
