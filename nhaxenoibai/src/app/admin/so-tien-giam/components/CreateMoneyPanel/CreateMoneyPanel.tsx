"uss client";
import React, { forwardRef, useImperativeHandle, useState } from "react";
import styles from "./CreateMoneyPanel.module.scss";
import { PanelRefMoney } from "../../money.model";
import { useForm } from "antd/es/form/Form";
import { useNotification } from "@/components/Notification/useNotification";
import { useUnsavedChanges } from "@/common/hook/useUnsavedChanges";
import { Money } from "@/common/service/models/Money";
import { useLoading } from "@/common/context/useLoading";
import { Button, Drawer, Form, Input, InputNumber } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import ModalDiscard from "@/components/ModalDiscard/ModalDiscard";
import service from "@/common/service/apis";

interface ICreateMoneyPanel {
  getListMoney: () => void;
}

const CreateMoneyPanel = (
  props: ICreateMoneyPanel,
  ref: React.Ref<PanelRefMoney>
) => {
  const { getListMoney } = props;
  const [form] = useForm();
  const [isOpen, setIsOpenPanel] = useState<boolean>(false);
  const [type, setType] = useState<string>("Create");
  const notification = useNotification();
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const { isDirty, handleFormChange, setIsDirty } = useUnsavedChanges(
    form,
    isOpen
  );
  const [selectedData, setSelectedData] = useState<Money.MoneyModel>();
  const { showLoading, closeLoading } = useLoading();
  useImperativeHandle(ref, () => ({
    openPanel,
  }));

  const openPanel = (data?: Money.MoneyModel, type?: string) => {
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
      showLoading("CreateMoney");
      await form.validateFields();
      const model = form.getFieldsValue();

      const modelEdit: Money.MoneyModel = {
        id: selectedData?.id,
        ...model,
      };
      if (type === "Create") {
        await service.money.createMoney(model);
      } else {
        await service.money.updateMoney(modelEdit);
      }
      type === "Create"
        ? notification.success("Tạo thành công.")
        : notification.success("Sửa thành công.");

      getListMoney();
      form.resetFields();
      setIsDirty(false);
      setIsOpenPanel(false);

      closeLoading("CreateMoney");
    } catch (error) {
      closeLoading("CreateMoney");
    }
  };

  return (
    <div>
      <Drawer
        title={
          <span style={{ color: "#12161B" }}>{`${
            type === "View"
              ? "Xem Số Tiền "
              : type === "Create"
              ? "Tạo Số tiền"
              : "Sửa Số tiền"
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
                Tạo Số tiền
              </Button>
            ) : (
              type === "Edit" && (
                <Button type="primary" onClick={handleSubmit}>
                  Sửa Số tiền
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
                {
                  required: true,
                  message: "Vui lòng điền số tiền theo chữ số.",
                },
              ]}
              name="title"
              label="Số tiền(Chữ số): "
            >
              <Input maxLength={200} />
            </Form.Item>

            <Form.Item
              rules={[
                {
                  required: true,
                  message: "Vui lòng điền số tiền .",
                },
              ]}
              name="money"
              label="Số tiền: "
            >
              <InputNumber min={1} type="number" />
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

export default forwardRef(CreateMoneyPanel);
