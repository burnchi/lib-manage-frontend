import Link from "next/link";
import { ReactNode } from "react";

const DashboardBox = ({
  children,
  title,
}: {
  children: ReactNode;
  title: string;
}) => {
  return (
    <div className="bg-bg rounded-sm shadow-sm">
      <div className="flex justify-between items-center p-3">
        <h2 className="text-xl font-bold">{title}</h2>
        <Link href={"/"} className="text-blue-500">
          更多
        </Link>
      </div>
      <div className="p-3">{children}</div>
    </div>
  );
};

export default DashboardBox;
