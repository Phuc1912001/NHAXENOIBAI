"use client";
import { Button, Popover } from "antd";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import styles from "./Test.module.scss";
import Image from "next/image";
import { LogoutOutlined } from "@ant-design/icons";
import Link from "next/link";
import Hotline from "../Hotline/Hotline";
import avatarDefault from "@/common/assets/defaultAvatar.png";
import iconHome from "@/common/assets/iconHouse.png";
import iconPolicy from "@/common/assets/iconPolicy.png";
import iconPrice from "@/common/assets/iconPrice.png";
import logoBigHead from "@/common/assets/newLogoBigHead.png";
import iconSale from "@/common/assets/sale.png";
const Test = () => {
  const content = (
    <div>
      <p className={styles.wrapperCart}>Thông tin tài khoản</p>
      <p className={styles.wrapperCart}>Chuyến xe của tôi</p>
    </div>
  );

  const pathname = usePathname();

  return (
    <div className={styles.containerHeader}>
      <div>abc</div>

      <div>
        <Popover placement="bottomRight" content={content} trigger={["hover"]}>
          <Image
            src={avatarDefault}
            alt="avatar"
            width={40}
            height={40}
            quality={100}
            className={styles.wrapperAvatar}
          />
        </Popover>
      </div>
    </div>
  );
};

export default Test;
