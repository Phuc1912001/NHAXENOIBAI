import { InfoCircleFilled } from "@ant-design/icons";
import { Button, Divider, Modal } from "antd";
import React from "react";
import styles from "./ModalDiscard.module.scss";

interface IModalDiscard {
  openModal?: boolean;
  handleDiscard?: () => void;
  handleStay?: () => void;
}

const ModalDiscard = (props: IModalDiscard) => {
  const { handleDiscard, handleStay, openModal } = props;
  return (
    <div>
      <Modal
        open={openModal}
        title={
          <div className={styles.wrapperTitle}>
            <InfoCircleFilled
              style={{ color: "#0072d0", fontSize: "1.2rem" }}
            />
            Bỏ qua các cập nhập
          </div>
        }
        zIndex={1001}
        width={415}
        centered
        destroyOnClose
        onCancel={handleStay}
        footer={
          <div className={styles.wrapperButton}>
            <Button onClick={handleDiscard}>Bỏ qua</Button>
            <Button type="primary" onClick={handleStay}>
              Ở Lại
            </Button>
          </div>
        }
      >
        <div className={styles.wrapperContent}>
          Bạn có chắc chắn muốn thoát khỏi bản ghi này? Bạn sẽ mất tất cả các
          thay đổi chưa được lưu.
        </div>
      </Modal>
    </div>
  );
};

export default ModalDiscard;
