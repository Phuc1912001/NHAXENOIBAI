"use client";
import React, { useRef } from "react";
import styles from "./discount.module.scss";
import { PlusCircleOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { PanelRef } from "../bang-gia/priceList.model";

const page = () => {
  // const panelRef = useRef<PanelRef>(null);

  // const openPanel = (data?: A, type?: string) => {
  //   panelRef.current?.openPanel(data, type);
  // };
  return (
    <div>
      <Button icon={<PlusCircleOutlined />}>Tạo Khuyễn Mãi</Button>
    </div>
  );
};

export default page;
