import React, { useState } from "react";
import styles from "./CreatePricePanel.module.scss";
import { Button, Drawer, Form, Input, Modal } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import { useForm } from "antd/es/form/Form";
import { useUnsavedChanges } from "@/common/hook/useUnsavedChanges";
import ModalDiscard from "@/components/ModalDiscard/ModalDiscard";
import service from "@/common/service/apis";
import { useLoading } from "@/common/context/useLoading";

interface ICreatePricePanel {
  openPanelCreate: boolean;
  handleClosePanel: () => void;
}

const CreatePricePanel = (props: ICreatePricePanel) => {
  const { openPanelCreate, handleClosePanel } = props;
  const [form] = useForm();
  const { isDirty, handleFormChange, setIsDirty } = useUnsavedChanges(
    form,
    openPanelCreate
  );
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { showLoading, closeLoading } = useLoading();

  const handleClose = () => {
    if (isDirty) {
      setIsModalVisible(true);
    } else {
      handleClosePanel();
    }
  };

  const handleDiscard = () => {
    form.resetFields();
    setIsDirty(false);
    handleClosePanel();
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
      await service.price.createPrice(model);
      form.resetFields();
      setIsDirty(false);
      handleClosePanel();
      closeLoading("createPrice");
    } catch (error) {
      closeLoading("createPrice");
    }
  };

  return (
    <div>
      <Drawer
        title={<span style={{ color: "#12161B" }}>Tạo Giá Xe</span>}
        destroyOnClose
        open={openPanelCreate}
        placement="right"
        maskClosable={false}
        closable={false}
        extra={<CloseOutlined onClick={handleClose} />}
        footer={
          <div>
            <Button style={{ marginRight: "8px" }} onClick={handleClose}>
              Đóng
            </Button>
            <Button type="primary" onClick={handleSubmit}>
              Tạo Giá Xe
            </Button>
          </div>
        }
        width={520}
      >
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
      </Drawer>
      <ModalDiscard
        openModal={isModalVisible}
        handleDiscard={handleDiscard}
        handleStay={handleStay}
      />
    </div>
  );
};

export default CreatePricePanel;
