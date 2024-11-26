import DashboardBox from "@/app/components/DashboardBox";
import DashBoardCard from "@/app/components/DashboardCard";

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
        <DashboardBox title={"最近借书"}>111</DashboardBox>
        <DashboardBox title={"最近借书"}>111</DashboardBox>
      </div>
    </div>
  );
};

export default DashboardPage;
