"use client";
import SidebarItem from "@/app/components/SidebarItem";
import { sidebarItems, websiteData } from "@/app/lib/data";
import Link from "next/link";

const Sidebar = () => {
  const { title } = websiteData;
  return (
    <div className="lg:flex flex-col  xl:w-[17vw] w-[22vw] hidden  sticky top-0  overflow-y-auto">
      {/* 标题 */}
      <div className="h-[55px] text-[#d1e8e7] text-xl font-medium bg-primary dark:bg-[#37726d] flex justify-center items-center w-full ">
        <Link href={"/dashboard"}>{title}</Link>
      </div>
      {/* 底部内容 */}
      <div className=" flex-1 w-full gap-1 p-4 bg-[#35393e] flex flex-col dark:bg-[#363838] transition-all ease duration-300">
        {sidebarItems.map((item) => (
          <SidebarItem {...item} key={item.label} />
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
