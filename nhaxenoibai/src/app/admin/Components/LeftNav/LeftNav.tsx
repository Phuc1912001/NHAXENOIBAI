import React from "react";
import {
  AppstoreAddOutlined,
  AppstoreOutlined,
  AuditOutlined,
  BarChartOutlined,
  MailOutlined,
  ReconciliationOutlined,
  RollbackOutlined,
  SettingOutlined,
  TruckOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Menu } from "antd";
import styles from "./LeftNav.module.scss";
import Link from "next/link";

type MenuItem = Required<MenuProps>["items"][number];

const LeftNav: React.FC = () => {
  const items: MenuItem[] = [
    {
      key: "1",
      label: <Link href="/admin/overview">Tổng hợp</Link>,
      icon: <BarChartOutlined />,
    },
    {
      key: "2",
      label: <Link href="/admin/dat-xe">Đặt xe</Link>,
      icon: <TruckOutlined />,
    },
    {
      key: "3",
      label: <Link href="/admin/bang-gia">Bảng Giá</Link>,
      icon: <ReconciliationOutlined />,
    },
    {
      key: "4",
      label: <Link href="/admin/khuyen-mai">Khuyến mãi</Link>,
      icon: <AppstoreAddOutlined />,
    },
    {
      key: "5",
      label: <Link href="/admin/chinh-sach">Chính sách</Link>,
      icon: <AuditOutlined />,
    },
    {
      type: "divider",
    },
    {
      key: "6",
      label: <Link href="/">Trở về</Link>,
      icon: <RollbackOutlined />,
    },
  ];
  const onClick: MenuProps["onClick"] = (e) => {
    console.log("click ", e);
  };

  return (
    <Menu
      className={styles.LeftNav}
      onClick={onClick}
      //   style={{ width: 256 }}
      defaultSelectedKeys={["1"]}
      mode="inline"
      items={items}
    />
  );
};

export default LeftNav;
