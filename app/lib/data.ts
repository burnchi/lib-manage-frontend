import { GrHelpBook } from "react-icons/gr";
import { VscDashboard } from "react-icons/vsc";

export const websiteData = {
  title: "📘图书管理系统",
};

export const sidebarItems = [
  {
    label: "仪表盘",
    href: "/dashboard",
    icon: VscDashboard,
  },
  {
    label: "使用文档",
    href: "/dashboard/knowledge",
    icon: GrHelpBook,
  },
  {
    label: "上架书籍",
    href: "/dashboard/upload",
    icon: GrHelpBook,
    title: "上架",
  },
  {
    label: "查询书籍",
    href: "/dashboard/searchbook",
    icon: GrHelpBook,
  },
  {
    label: "借书管理",
    href: "/dashboard/loan",
    icon: GrHelpBook,
    title: "借书",
  },
  {
    label: "借书记录",
    href: "/dashboard/searchloan",
    icon: GrHelpBook,
  },
  {
    label: "个人中心",
    href: "/dashboard/admin",
    icon: GrHelpBook,
    title: "用户",
  },
  {
    label: "账号管理",
    href: "/dashboard/account",
    icon: GrHelpBook,
  },
];
