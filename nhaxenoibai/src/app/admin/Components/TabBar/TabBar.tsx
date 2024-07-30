import React from "react";
import styles from "./TabBar.module.scss";
import { Button, Tooltip } from "antd";
import { FilterOutlined, PlusCircleOutlined } from "@ant-design/icons";
import Search from "antd/es/input/Search";
import { useDevice } from "@/common/context/useDevice";
import { EDeviceType } from "@/common/enum/EDevice";

interface ITabBar {
  openPanel?: (data?: A, type?: string) => void;
  btnText?: string;
  onSearch?: (value: string) => void;
  placeholderSearch?: string;
  handleOpenFilter?: () => void;
}

const TabBar = (props: ITabBar) => {
  const { openPanel, btnText, onSearch, placeholderSearch, handleOpenFilter } =
    props;
  const { type } = useDevice();
  const isMobile = type === EDeviceType.Mobile;

  return (
    <div className={styles.wrapperTabBar}>
      <div className={styles.wrapperLeftSide}>
        <Button icon={<PlusCircleOutlined />} onClick={() => openPanel?.()}>
          {btnText}
        </Button>
        <Tooltip
          title={isMobile ? "" : <span style={{ color: "#222" }}>Bộ Lọc</span>}
          color={"#fff"}
        >
          <Button
            icon={<FilterOutlined />}
            onClick={() => handleOpenFilter?.()}
          ></Button>
        </Tooltip>
      </div>

      <div className={styles.wrapperRightSide}>
        <Search
          placeholder={placeholderSearch}
          onSearch={onSearch}
          style={{ width: 250 }}
          size="large"
          allowClear
        />
      </div>
    </div>
  );
};

export default TabBar;
