import { AntdRegistry } from "@ant-design/nextjs-registry";
import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import DefaultLayout from "./DefaultLayout";
import "@/common/scss/index.scss";
import "./globals.css";
import { ConfigProvider } from "antd";
const outfit = Outfit({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Nhà xe Nội Bài - Dịch vụ vận chuyển chuyên nghiệp, uy tín",
  description:
    "Nhà xe Nội Bài cung cấp dịch vụ vận chuyển nội thành Hà Nội chuyên nghiệp, uy tín và giá cả hợp lý. Đặt xe dễ dàng, an toàn và nhanh chóng. Liên hệ ngay để đặt xe!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={outfit.className}>
        <AntdRegistry>
          <DefaultLayout>{children}</DefaultLayout>
        </AntdRegistry>
      </body>
    </html>
  );
}
