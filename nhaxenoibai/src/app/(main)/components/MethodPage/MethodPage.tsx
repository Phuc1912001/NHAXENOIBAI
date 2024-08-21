import React from "react";
import styles from "./MethodPage.module.scss";
import { Col, Row } from "antd";
import {
  CreditCardOutlined,
  DashboardOutlined,
  DollarOutlined,
} from "@ant-design/icons";

const MethodPage = () => {
  return (
    <div className={styles.wrapperMethod}>
      <Row gutter={[12, 12]}>
        <Col xs={24} md={12}>
          <div className={styles.textBookCar}>Các Hình Thức Đặt Xe</div>
          <Row gutter={[12, 12]}>
            <Col xs={24}>
              <div className={styles.wrapperItem}>
                <div className={styles.wrapperNumkber}>1</div>
                <div>
                  <div className={styles.wrapperText}>Gọi điện trực tiếp</div>
                  <div>
                    <div>
                      Hotline:{" "}
                      <span
                        style={{
                          color: "#ff4d4f",
                          fontWeight: 700,
                        }}
                      >
                        0329609726
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </Col>
            <Col xs={24}>
              <div className={styles.wrapperItem}>
                <div className={styles.wrapperNumkber}>2</div>
                <div>
                  <div className={styles.wrapperText}>
                    Đặt xe trên trên Website Nhà Xe Nội Bài
                  </div>
                  <div>
                    Truy cập www.nhaxinoibai.net và nhập số điện thoại và địa
                    chỉ của quý khách, chúng tôi sẽ liên lạc lại ngay trong ít
                    phút.
                  </div>
                </div>
              </div>
            </Col>
            <Col xs={24} style={{ display: "flex" }}>
              <div className={styles.wrapperItem}>
                <div className={styles.wrapperNumkber}>3</div>
                <div>
                  <div className={styles.wrapperText}>
                    Chat với tổng đài viên
                  </div>
                  <div></div>
                </div>
              </div>
            </Col>
          </Row>
        </Col>
        <Col xs={24} md={12}>
          <div className={styles.textBookCar}>Các Hình Thức Thanh Toán</div>
          <Row gutter={[12, 12]}>
            <Col xs={24}>
              <div className={styles.wrapperItem}>
                <div className={styles.wrapperNumkber}>
                  <DollarOutlined />
                </div>
                <div>
                  <div className={styles.wrapperText}>Tiền mặt</div>
                  <div>
                    Thanh toán trực tiếp với tài xế sau khi kết thúc hành trình
                  </div>
                </div>
              </div>
            </Col>
            <Col xs={24}>
              <div className={styles.wrapperItem}>
                <div className={styles.wrapperNumkber}>
                  <CreditCardOutlined />
                </div>
                <div>
                  <div className={styles.wrapperText}>Chuyển khoản</div>
                  <div>
                    Quý khách có thể thanh toán bằng cách chuyển khoản vào một
                    trong các tài khoản do công ty chỉ định
                  </div>
                </div>
              </div>
            </Col>
            <Col xs={24}>
              <div className={styles.wrapperItem}>
                <div className={styles.wrapperNumkber}>
                  <DashboardOutlined />
                </div>
                <div>
                  <div className={styles.wrapperText}>Trả sau</div>
                  <div>
                    Chỉ áp dụng cho doanh nghiệp có hợp đồng với chúng tôi.
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default MethodPage;
