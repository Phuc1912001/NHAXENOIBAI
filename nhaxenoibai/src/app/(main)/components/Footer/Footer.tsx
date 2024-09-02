import React from "react";
import styles from "./Footer.module.scss";
import { Col, Row } from "antd";

const Footer = () => {
  return (
    <div className={styles.wrapperFooter}>
      <div className={styles.wrapperContent}>
        <Row gutter={[12, 12]}>
          <Col xs={24}>
            <div className={styles.footerTitle}>
              Công ty TNHH Nhà Xe Nội Bài
            </div>
            <div className={styles.desc}>Uy tín đặt lên hàng đầu</div>
          </Col>
          <Col xs={12} className={styles.infoCompany}>
            <div>
              Địa chỉ: số 27 xóm Văn Hóa, thôn Thái Phù, xã Mai Đình, huyện Sóc
              Sơn, thành phố Hà Nội.
            </div>
            <div>SĐT: 0329609726</div>
            <div>Email: phucphuc19012001@gmail.com</div>
            <div>Website: nhaxenoibai.com</div>
          </Col>
          <Col xs={12} className={styles.infoWeb}>
            <div>Đặt xe</div>
            <div>Bảng giá</div>
            <div>Khuyến mãi</div>
            <div>Chính sách</div>
            <div>Hotline: 0329609726</div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Footer;
