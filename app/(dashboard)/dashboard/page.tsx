"use client";
import Box from "@/app/components/Box";
import DashboardBox from "@/app/components/DashboardBox";
import DashBoardCard from "@/app/components/DashboardCard";
import QuickItemCard from "@/app/components/QuickItemCard";
import { quickItems } from "@/app/lib/data";

const DashboardPage = () => {
  const list = ["1", "2", "3", "4"];
  return (
    <div className="space-y-3">
      {/* 卡片组 */}
      <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-3">
        {list.map((item) => (
          <DashBoardCard key={item} num={item} />
        ))}
      </div>
      {/* 最近借书 */}
      <div className="grid lg:grid-cols-2 grid-cols-1 gap-3">
        <DashboardBox title={"最近上架"}>111</DashboardBox>
        <DashboardBox title={"最近借书"}>111</DashboardBox>
      </div>
      {/* 捷径 */}
      <div>
        <Box title={"捷径"} className="p-0">
          {quickItems.map((item) => (
            <QuickItemCard key={item.label} {...item} />
          ))}
        </Box>
      </div>
    </div>
  );
};

export default DashboardPage;
