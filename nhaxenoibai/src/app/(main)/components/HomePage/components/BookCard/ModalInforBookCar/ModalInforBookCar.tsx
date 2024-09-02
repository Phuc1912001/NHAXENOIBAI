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
  totalAmount: number;
  discountMoney?: number;
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
    discountMoney,
    totalAmount,
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
            {`Chuyến xe của ${valueForm.fullName}`}
          </div>
        }
        zIndex={1001}
        centered
        destroyOnClose
        maskClosable={false}
        onCancel={handleCloseModal}
        rootClassName={styles.creatLogModal}
        footer={
          <div className={styles.wrapperButton}>
            <div className={styles.cancelBtn}>
              <Button onClick={handleCloseModal}>Hủy</Button>
            </div>
            <div className={styles.submitBtn}>
              <Button type="primary" onClick={handleSubmit}>
                Đặt xe
              </Button>
            </div>
          </div>
        }
      >
        <div className={`${styles.logModal} nxsb-scrollbar`}>
          <Row gutter={[6, 4]}>
            <Col xs={24}>
              <div className={styles.wrapperOrigin}>
                <div className={styles.title}>Điểm đi:</div>
                <div>{originValue?.label}</div>
              </div>
            </Col>
            <Col xs={24}>
              <div className={styles.wrapperOrigin}>
                <div className={styles.title}>Điểm đến:</div>
                <div>{destinationValue?.label}</div>
              </div>
            </Col>
            <Col xs={24} md={12}>
              <div className={styles.wrapperDuration}>
                <div className={styles.title}>Trong khoảng:</div>
                <div>{duration}</div>
              </div>
            </Col>
            <Col xs={24} md={12}>
              <div className={styles.wrapperDuration}>
                <div className={styles.title}>Khoảng cách:</div>
                {distance ? `${(distance / 1000).toFixed(2)} km` : "0 km"}
              </div>
            </Col>

            <Col xs={12}>
              <div className={styles.wrapperDuration}>
                <div className={styles.title}>Loại xe:</div>
                <div>4 chỗ</div>
              </div>
            </Col>
            <Col xs={12}>
              <div className={styles.wrapperDuration}>
                {twoWay ? "2 chiều" : "1 chiều"}
              </div>
            </Col>
            <Col xs={12}>
              <div className={styles.wrapperDuration}>
                <div className={styles.title}>Thời gian đi:</div>
                <div>
                  {dayjs(valueForm.startTime).format("DD-MM-YYYY HH:mm")}
                </div>
              </div>
            </Col>
            <Col xs={12}>
              <div className={styles.wrapperDuration}>
                <div className={styles.title}>Số điện thoại:</div>
                <div>{valueForm.phoneNumber}</div>
              </div>
            </Col>

            {valueForm.discountCode && (
              <Col xs={24}>
                <div className={styles.wrapperDuration}>
                  <div className={styles.title}>Mã Giảm giá:</div>
                  <div>{valueForm.discountCode}</div>
                </div>
              </Col>
            )}

            {valueForm.note && (
              <Col xs={24}>
                <div className={styles.wrapperNote}>
                  <div className={styles.title}>Ghi chú:</div>
                  <div>{valueForm.note}</div>
                </div>
              </Col>
            )}
            <Col xs={24} className={styles.wrapperPayment}>
              {discountMoney !== undefined &&
                discountMoney !== null &&
                discountMoney > 0 && (
                  <div>
                    <div className={styles.wrapperTotalAmount}>
                      <div>Thành tiền :</div>
                      <div
                        className={discountMoney ? styles.textTotalAmount : ""}
                      >
                        {totalAmount.toLocaleString("vi-VN")} đ
                      </div>
                    </div>
                    <div className={styles.wrapperDiscountCode}>
                      <div>Số tiền giảm:</div>
                      <div>{discountMoney.toLocaleString("vi-VN")} đ</div>
                    </div>
                  </div>
                )}

              <div className={styles.wrapperTotalMoney}>
                <div>Đơn giá:</div>
                <div>{totalMoney.toLocaleString("vi-VN")} đ</div>
              </div>
            </Col>
          </Row>
        </div>
      </Modal>
    </div>
  );
};

export default ModalInforBookCar;
