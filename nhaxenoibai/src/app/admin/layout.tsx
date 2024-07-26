"use client";
import { LoadingProvider } from "@/common/context/useLoading";
import StyledComponentsRegistry from "@/lib/AntdRegistry";
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
        <StyledComponentsRegistry>
          <LoadingProvider>
            <LayoutAdmin>{children}</LayoutAdmin>
          </LoadingProvider>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
};

export default RootLayout;
