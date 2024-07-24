"use client";
import { PlusCircleOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { useState } from "react";
import CreatePricePanel from "./components/CreatePricePanel/CreatePricePanel";

const Page = () => {
  const [openPanelCreate, setOpenPanelCreate] = useState<boolean>(false);

  const handleOpenPanelCreate = () => {
    setOpenPanelCreate(true);
  };

  const handleClosePanel = () => {
    setOpenPanelCreate(false);
  };

  return (
    <div>
      <Button icon={<PlusCircleOutlined />} onClick={handleOpenPanelCreate}>
        Tạo Giá Xe
      </Button>
      <CreatePricePanel
        openPanelCreate={openPanelCreate}
        handleClosePanel={handleClosePanel}
      />
    </div>
  );
};

export default Page;
