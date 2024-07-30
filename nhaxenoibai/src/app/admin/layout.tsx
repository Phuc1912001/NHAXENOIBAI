"use client";
import { LoadingProvider } from "@/common/context/useLoading";
import StyledComponentsRegistry from "@/lib/AntdRegistry";
import { Outfit } from "next/font/google";
import { FC } from "react";
import LayoutAdmin from "./Components/LayoutAdmin/LayoutAdmin";
import "./globals.css";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { DeviceProvider } from "@/common/context/useDevice";
import "@/common/scss/index.scss";

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
