"use client";
import { useRef } from "react";
import styles from "./discount.module.scss";
import { PlusCircleOutlined } from "@ant-design/icons";
import { Button } from "antd";
import CreateDiscountPanel from "./components/CreateDiscountPanel/CreateDiscountPanel";
import { PanelRef } from "./discount.model";

const Page = () => {
  const panelRef = useRef<PanelRef>(null);

  const openPanel = (data?: A, type?: string) => {
    panelRef.current?.openPanel(data, type);
  };

  return (
    <div>
      <Button icon={<PlusCircleOutlined />} onClick={() => openPanel()}>
        Tạo Khuyến Mãi
      </Button>
      <CreateDiscountPanel ref={panelRef} />
    </div>
  );
};

export default Page;
