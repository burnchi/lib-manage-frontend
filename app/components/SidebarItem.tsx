"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { IconType } from "react-icons";
import { twMerge } from "tailwind-merge";

interface SidebarItemProps {
  label: string;
  href: string;
  icon: IconType;
  title?: string;
}
const SidebarItem = ({ label, href, icon: Icon, title }: SidebarItemProps) => {
  const pathname = usePathname();
  return (
    <>
      {title && (
        <h1 className="text-neutral-500 dark:text-[#9e9486] text-sm px-3 py-1 mt-5">
          {title}
        </h1>
      )}
      <Link
        href={href}
        className={twMerge(
          "flex items-center gap-2 text-sm group dark:hover:bg-[#2e302f] hover:bg-[#2a2e32] px-3 py-2 rounded-sm",
          pathname === href && "dark:bg-[#2e302f] bg-[#2a2e32]",
        )}
        // onClick={closeModal}
      >
        <Icon size={18} className="text-neutral-500  dark:text-[#C3BCB1]" />
        <span
          className={twMerge(
            "text-white/60 group-hover:text-white dark:text-[#C3BCB1] dark:group-hover:text-white/80",
            pathname === href && "text-white dark:text-white/80",
          )}
        >
          {label}
        </span>
      </Link>
    </>
  );
};

export default SidebarItem;
