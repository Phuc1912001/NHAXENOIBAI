import React from "react";
import styles from "./ModalDelete.module.scss";
import { Button, Modal } from "antd";
import { InfoCircleFilled } from "@ant-design/icons";

interface IModalDelete {
  openModal?: boolean;
  title?: string;
  content?: string;
  btnText?: string;
  handleCancel?: () => void;
  handleDelete?: () => void;
}

const ModalDelete = (props: IModalDelete) => {
  const { openModal, handleCancel, handleDelete, title, content, btnText } =
    props;
  return (
    <div>
      <Modal
        open={openModal}
        title={
          <div className={styles.wrapperTitle}>
            <InfoCircleFilled
              style={{ color: "#0072d0", fontSize: "1.2rem" }}
            />
            {title}
          </div>
        }
        zIndex={1001}
        width={415}
        centered
        destroyOnClose
        maskClosable={false}
        onCancel={handleCancel}
        footer={
          <div className={styles.wrapperButton}>
            <Button onClick={handleCancel}>Hủy</Button>
            <Button type="primary" onClick={handleDelete}>
              {btnText}
            </Button>
          </div>
        }
      >
        <div className={styles.wrapperContent}>{content}</div>
      </Modal>
    </div>
  );
};

export default ModalDelete;
