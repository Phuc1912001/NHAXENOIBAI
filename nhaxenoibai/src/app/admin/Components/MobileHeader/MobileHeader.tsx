import React, { useState } from "react";
import styles from "./MobileHeader.module.scss";
import { Affix, Drawer } from "antd";
import { UnorderedListOutlined } from "@ant-design/icons";
import LeftNav from "../LeftNav/LeftNav";

export interface IMobileHeader {
  children?: React.ReactNode;
  title?: React.ReactNode;
  className?: string;
}

const MobileHeader = (props: IMobileHeader) => {
  const [open, setOpen] = useState<boolean>(false);
  const { children, title } = props;
  const onClose = () => {
    setOpen(false);
  };
  const openMenu = () => {
    setOpen(true);
  };
  return (
    <>
      <Affix offsetTop={0} className={styles.mobileHeaderWrap}>
        <div className={`${styles.mobileHeader}`}>
          <div className="mobile-header-left">
            <button
              type="button"
              className="mobile-header-left-btn"
              onClick={openMenu}
            >
              <UnorderedListOutlined style={{ fontSize: "24px" }} />
            </button>
            <div className="mobile-header-left-text">{title}</div>
          </div>
          <div className="mobile-header-right">{children}</div>
        </div>
      </Affix>

      <Drawer
        placement="left"
        width={220}
        closable={false}
        onClose={onClose}
        open={open}
        className={styles.mobileLeftNav}
      >
        <LeftNav />
      </Drawer>
    </>
  );
};

export default MobileHeader;
