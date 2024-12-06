"use client";
import Button from "@/app/components/Button";
import Container from "@/app/components/Container";
import { sidebarItems } from "@/app/lib/data";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import { FiPlusCircle } from "react-icons/fi";

const Header = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const router = useRouter();
  const routeName = pathname.split("/")[1];
  // 反转数组，避免路由匹配顺序影响结果
  const { label } = sidebarItems
    .slice()
    .reverse()
    .find((item) => pathname.includes(item.href)) || {
    label: "未知",
  };
  let headerRight: React.ReactNode;

  const UploadBook = () => {
    router.push("/dashboard/book/create");
  };

  const CreateLoan = () => {
    router.push("/dashboard/loan/create");
  };

  // 根据路由设置右侧按钮
  switch (pathname) {
    case "/dashboard/book":
      headerRight = (
        <Button label="新建" icon={FiPlusCircle} onClick={UploadBook} />
      );
      break;
    case "/dashboard/loan":
      headerRight = (
        <Button label="新建" icon={FiPlusCircle} onClick={CreateLoan} />
      );
      break;

    default:
      break;
  }
  return (
    <div className="flex flex-col flex-1  overflow-y-auto">
      <div className="h-[55px] shrink-0 dark:bg-dark bg-white w-full sticky top-0 z-[40]">
        <Container className="flex justify-between items-center h-full">
          <div className="text-[14px] font-semibold">{label}</div>
          <div>{headerRight}</div>
        </Container>
      </div>
      <div className="bg-bg2 flex-1 ">
        <Container className="mt-3">{children}</Container>
      </div>
    </div>
  );
};

export default Header;
