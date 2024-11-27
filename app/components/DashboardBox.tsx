import H2 from "@/app/components/H2";
import H6 from "@/app/components/H6";
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
      <div className="flex justify-between items-center p-primary">
        <H2>{title}</H2>
        <Link href={"/"}>
          <H6>更多</H6>
        </Link>
      </div>
      <div className="p-primary">{children}</div>
    </div>
  );
};

export default DashboardBox;
