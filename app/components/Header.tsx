"use client";
import Container from "@/app/components/Container";
import { sidebarItems } from "@/app/lib/data";
import { usePathname } from "next/navigation";
import React from "react";

const Header = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const routeName = pathname.split("/")[1];
  const { label } = sidebarItems.find((item) => item.href === pathname) || {
    label: "未知",
  };
  return (
    <div className="flex flex-col flex-1  overflow-y-auto">
      <div className="h-[55px] shrink-0 dark:bg-dark bg-white w-full sticky top-0 z-[40]">
        <Container className="flex justify-between items-center h-full">
          <div className="text-[14px] font-semibold">{label}</div>
          <div>xxx</div>
        </Container>
      </div>
      <div className="bg-[#F0F3F8] flex-1 ">
        <Container className="mt-3">{children}</Container>
      </div>
    </div>
  );
};

export default Header;
