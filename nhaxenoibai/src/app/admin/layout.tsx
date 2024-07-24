"use client";
import { LoadingProvider } from "@/common/context/useLoading";
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
          <LoadingProvider>
            <LayoutAdmin>{children}</LayoutAdmin>
          </LoadingProvider>
        </AntdRegistry>
      </body>
    </html>
  );
};

export default RootLayout;
