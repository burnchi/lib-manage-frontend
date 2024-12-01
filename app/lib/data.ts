import { GrHelpBook } from "react-icons/gr";
import { VscDashboard } from "react-icons/vsc";

export const websiteData = {
  title: "📘图书管理系统",
  defaultPage: 1,
  defaultPageSize: 6,
  pagePerBookButtons: ["6", "9", "12"],
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

export const quickItems = [
  {
    label: "查看教程",
    href: "/dashboard/knowledge",
    icon: GrHelpBook,
    description: "学习如何使用图书管理系统",
  },
  {
    label: "快速借书",
    href: "/dashboard/loan",
    icon: GrHelpBook,
    description: "快速切换到借书管理",
  },
  {
    label: "快速上架",
    href: "/dashboard/upload",
    icon: GrHelpBook,
    description: "快速切换到上架书籍",
  },
  {
    label: "修改资料",
    href: "/dashboard/admin",
    icon: GrHelpBook,
    description: "快速修改个人资料",
  },
];

export const bookItems = [
  {
    id: 1,
    title: "《JavaScript权威指南》",
    category: "计算机",
    publishedAt: "2019-01-01",
    copies_owned: 10,
    author: "李杰",
  },
  {
    id: 2,
    title: "《Python编程从入门到实践》",
    category: "计算机",
    publishedAt: "2019-01-01",
    copies_owned: 10,
    author: "李荣浩",
  },
];
