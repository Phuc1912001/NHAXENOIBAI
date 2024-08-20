"use client";
import React from "react";
import styles from "./HeaderAdmin.module.scss";
import { usePathname } from "next/navigation";

const HeaderAdmin = () => {
  const pathName = usePathname();

  const genderPathName = () => {
    switch (pathName) {
      case "/admin/dat-xe":
        return "Đặt xe";
      case "/admin/bang-gia":
        return "Bảng Giá";
      case "/admin/khuyen-mai":
        return "Khuyến Mãi";
      case "/admin/ma-giam-gia":
        return "Mã Giảm giá";
      case "/admin/so-tien-giam":
        return "Số tiền giảm";
      case "/admin/overview":
        return "Tổng quan";
      default:
        return "...";
    }
  };

  return (
    <div className={styles.wraperHeader}>
      <div>{genderPathName()}</div>
      <div>account</div>
    </div>
  );
};

export default HeaderAdmin;
