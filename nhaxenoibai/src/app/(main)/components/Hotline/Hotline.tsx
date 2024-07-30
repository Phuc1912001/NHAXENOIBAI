import React from "react";
import { message } from "antd";
import styles from "./Hotline.module.scss";
import Image from "next/image";
import iconPhone from "@/common/assets/iconPhone.png";

const Hotline = () => {
  const handleCopyText = () => {
    const phoneNumber = "0329609726";
    navigator.clipboard
      .writeText(phoneNumber)
      .then(() => {
        message.success(`Đã sao chép số Hotline`);
      })
      .catch((error) => {
        message.error("Đã xảy ra lỗi khi sao chép số hotline");
      });
  };

  return (
    <div className={styles.containerHotline} onClick={handleCopyText}>
      <div>
        <Image
          src={iconPhone}
          alt="hotline"
          width={40}
          height={40}
          quality={100}
        />
      </div>
      <div className={styles.textPhone}>0329609726</div>
    </div>
  );
};

export default Hotline;
