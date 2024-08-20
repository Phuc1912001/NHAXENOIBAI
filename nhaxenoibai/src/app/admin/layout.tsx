"use client";
import { DeviceProvider } from "@/common/context/useDevice";
import { LoadingProvider } from "@/common/context/useLoading";
import "@/common/scss/index.scss";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { Outfit } from "next/font/google";
import { FC } from "react";
import LayoutAdmin from "./Components/LayoutAdmin/LayoutAdmin";
import "./globals.css";

const outfit = Outfit({ subsets: ["latin"] });

interface RootLayoutProps {
  children: React.ReactNode;
}

const RootLayout: FC<RootLayoutProps> = ({ children }) => {
  return (
    <html lang="en">
      <body className={outfit.className}>
        <AntdRegistry>
          <DeviceProvider>
            <LoadingProvider>
              <LayoutAdmin>{children}</LayoutAdmin>
            </LoadingProvider>
          </DeviceProvider>
        </AntdRegistry>
      </body>
    </html>
  );
};

export default RootLayout;
