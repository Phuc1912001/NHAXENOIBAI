"use client";
import {
  AppstoreAddOutlined,
  AuditOutlined,
  BarChartOutlined,
  ReconciliationOutlined,
  RollbackOutlined,
  TruckOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Menu } from "antd";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";
import styles from "./LeftNav.module.scss";

type MenuItem = Required<MenuProps>["items"][number];

const LeftNav: React.FC = () => {
  const pathName = usePathname();

  // Determine initial selectedKey based on pathName
  const getSelectedKey = useCallback(() => {
    if (pathName.startsWith("/admin/dat-xe")) return ["2"];
    if (pathName.startsWith("/admin/bang-gia")) return ["3"];
    if (pathName.startsWith("/admin/khuyen-mai")) return ["4"];
    if (pathName.startsWith("/admin/chinh-sach")) return ["5"];
    return ["1"]; // Default key if none of the conditions match
  }, [pathName]);

  const [selectedKey, setSelectedKey] = useState<string[]>(getSelectedKey);

  useEffect(() => {
    setSelectedKey(getSelectedKey());
  }, [getSelectedKey]);

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

  return (
    <Menu
      className={styles.LeftNav}
      selectedKeys={selectedKey} // Use selectedKeys instead of defaultSelectedKeys
      mode="inline"
      items={items}
    />
  );
};

export default LeftNav;
