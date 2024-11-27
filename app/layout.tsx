import TanStackProvider from "@/app/components/TanStackProvider";
import { websiteData } from "@/app/lib/data";
import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const NotoSansSCRegular = localFont({
  src: "./fonts/NotoSansSC-Regular.ttf",
  weight: "100 900",
});
const { title } = websiteData;

export const metadata: Metadata = {
  title,
  description: "用来管理图书馆书本的管理系统",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${NotoSansSCRegular.className}`}>
        <TanStackProvider>{children}</TanStackProvider>
      </body>
    </html>
  );
}
