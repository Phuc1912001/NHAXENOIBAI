import React from "react";
import styles from "./ModalInforBookCar.module.scss";
import { Button, Col, Modal, Row } from "antd";
import { InfoCircleFilled } from "@ant-design/icons";
import { PlaceOption } from "../bookCard.model";
import dayjs from "dayjs";

interface IValueForm {
  startTime?: string;
  fullName?: string;
  phoneNumber?: string;
  note?: string;
  discountCode?: string;
}

interface IModalInforBookCar {
  openModal?: boolean;
  handleCloseModal?: () => void;
  handleSubmit?: () => void;
  destinationValue: PlaceOption | null;
  originValue: PlaceOption | null;
  distance: number;
  duration: string;
  twoWay: boolean;
  totalMoney: number;
  valueForm: IValueForm;
}

const ModalInforBookCar = (props: IModalInforBookCar) => {
  const {
    openModal,
    handleCloseModal,
    handleSubmit,
    originValue,
    destinationValue,
    distance,
    duration,
    twoWay,
    totalMoney,
    valueForm,
  } = props;
  return (
    <div>
      <Modal
        open={openModal}
        title={
          <div className={styles.wrapperTitle}>
            <InfoCircleFilled
              style={{ color: "#0072d0", fontSize: "1.2rem" }}
            />
            Thông tin chuyến xe của bạn
          </div>
        }
        zIndex={1001}
        width={415}
        centered
        destroyOnClose
        maskClosable={false}
        onCancel={handleCloseModal}
        footer={
          <div className={styles.wrapperButton}>
            <Button onClick={handleCloseModal}>Hủy</Button>
            <Button type="primary" onClick={handleSubmit}>
              Đặt xe
            </Button>
          </div>
        }
      >
        <Row gutter={[12, 12]}>
          <Col xs={24}>
            <div>
              <div>Điểm đi:</div>
              <div>{originValue?.label}</div>
            </div>
          </Col>
          <Col xs={24}>
            <div>
              <div>Điểm đến:</div>
              <div>{destinationValue?.label}</div>
            </div>
          </Col>
          <Col xs={24}>
            <div>
              <div>Trong khoảng:</div>
              <div>{duration}</div>
            </div>
          </Col>
          <Col xs={24}>
            <div>
              <div>Khoảng cách:</div>
              <div>{distance}</div>
            </div>
          </Col>

          <Col xs={12}>
            <div>
              <div>Loại xe:</div>
              <div>4 chỗ</div>
            </div>
          </Col>
          <Col xs={12}>
            <div>{twoWay ? "2 chiều" : "1 chiều"}</div>
          </Col>
          <Col xs={24}>
            <div>
              <div>Thơi gian đi:</div>
              <div>{dayjs(valueForm.startTime).format("DD-MM-YYYY HH:mm")}</div>
            </div>
          </Col>
          <Col xs={12}>
            <div></div>
          </Col>
          <Col xs={24}>
            <div>
              <div>Thơi gian đi:</div>
              <div>{dayjs(valueForm.startTime).format("DD-MM-YYYY HH:mm")}</div>
            </div>
          </Col>
        </Row>
      </Modal>
    </div>
  );
};

export default ModalInforBookCar;
