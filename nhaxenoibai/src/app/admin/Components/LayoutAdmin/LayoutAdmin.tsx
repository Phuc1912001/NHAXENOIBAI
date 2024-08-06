"use client";

import { Affix, Layout } from "antd";
import React from "react";
import LeftNav from "../LeftNav/LeftNav";
import LogoAdmin from "../LogoAdmin/LogoAdmin";
import { useLoading } from "@/common/context/useLoading";
import LazyLoading from "@/components/LazyLoading/LazyLoading";
import styles from "./LayoutAdmin.module.scss";
const { Header, Content, Sider } = Layout;

const LayoutAdmin = ({ children }: A) => {
  const { isLoading } = useLoading();

  return (
    <div>
      <Layout>
        <Sider
          className={styles.masterSider}
          style={{
            overflow: "auto",
            height: "100vh",
            position: "fixed",
            left: 0,
            top: 0,
            bottom: 0,
            transition: "none 0s ease 0s",
            backgroundColor: "#fff",
          }}
          collapsible
          collapsed={false}
          width={221}
          trigger={null}
        >
          <LogoAdmin />
          <LeftNav />
        </Sider>
        <Layout className={styles.siteLayout}>
          <Affix className={styles.siteLayoutAffix} offsetTop={0}>
            <Header
              style={{
                padding: 0,
                background: "#fff",
                borderBottom: `1px solid #EEF2F5`,
              }}
            >
              header
            </Header>
          </Affix>
          <Content className={styles.content}>{children}</Content>
        </Layout>
      </Layout>
      {isLoading && <LazyLoading />}
    </div>
  );
};

export default LayoutAdmin;
