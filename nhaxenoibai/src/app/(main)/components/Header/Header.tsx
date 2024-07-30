"use client";
import React from "react";
import styles from "./Header.module.scss";
import logoBigHead from "@/common/assets/newLogoBigHead.png";
import Image from "next/image";
import iconHome from "@/common/assets/iconHouse.png";
import iconPrice from "@/common/assets/iconPrice.png";
import iconSale from "@/common/assets/sale.png";
import iconPolicy from "@/common/assets/iconPolicy.png";
import avatarDefault from "@/common/assets/defaultAvatar.png";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Hotline from "../Hotline/Hotline";
import { Divider, Popover } from "antd";
import { LogoutOutlined } from "@ant-design/icons";

const Header = () => {
  const pathname = usePathname();
  const content = (
    <div className={styles.wrapperContent}>
      <div className={styles.wrapperCart}>Thông tin tài khoản</div>
      <div className={styles.wrapperCart}>Chuyên của tôi </div>
      <div className={styles.wrapperCart}>
        <Link href={"/admin/overview"}> Quản Lý Nhà Xe</Link>
      </div>
      <hr className="mt-2 mb-2" />
      <div className={styles.wrapperLogout}>
        <div>Đăng xuất</div>
        <div className={styles.iconLogout}>
          <LogoutOutlined />
        </div>
      </div>
    </div>
  );
  return (
    <div className={styles.containerHeader}>
      <div className={styles.wrapperLeft}>
        <Link href={"/"}>
          <div className={styles.wrapperLogo}>
            <Image
              src={logoBigHead}
              alt="logo"
              width={80}
              height={80}
              quality={100}
            />
            <div className={styles.logoTextContainer}>
              <div className={styles.mainTitle}>Nhà xe Nội Bài</div>
              <div className={styles.subtitle}>Uy tín đặt lên hàng đầu</div>
            </div>
          </div>
        </Link>
        <div className={styles.wrapperItem}>
          <Link href="/">
            <div
              className={`${styles.itemHome} ${
                pathname === "/" ? styles.activeHome : ""
              }`}
            >
              <Image src={iconHome} alt="Trang chu" width={32} height={32} />
              <div>Trang chủ</div>
            </div>
          </Link>
          <Link href="/bang-gia">
            <div
              className={`${styles.itemPrice} ${
                pathname === "/bang-gia" ? styles.activePrice : ""
              }`}
            >
              <Image src={iconPrice} alt="Bang gia" width={32} height={32} />
              <div>Bảng giá</div>
            </div>
          </Link>
          <Link href="/khuyen-mai">
            <div
              className={`${styles.itemDiscount} 
                ${pathname === "/khuyen-mai" ? styles.activeDiscount : ""}
              `}
            >
              <Image
                src={iconSale}
                alt="Khuyen mai"
                width={22}
                height={22}
                quality={100}
              />
              <div>Khuyến mại</div>
            </div>
          </Link>
          <Link href="/chinh-sach">
            <div
              className={` ${styles.itemPolicy} ${
                pathname === "/chinh-sach" ? styles.activePolicy : ""
              }`}
            >
              <Image
                src={iconPolicy}
                alt="Chinh sach"
                width={22}
                height={22}
                quality={100}
              />
              <div>Chính sách</div>
            </div>
          </Link>
        </div>
        <div>
          <Hotline />
        </div>
      </div>

      <div>
        <Popover placement="bottomRight" content={content} trigger={["click"]}>
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

export default Header;
