import Header from "@/app/components/Header";
import Sidebar from "@/app/components/Sidebar";
import React from "react";

const Dashboardlayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex h-screen w-screen overflow-hidden">
      <Sidebar />
      <Header>{children}</Header>
    </div>
  );
};

export default Dashboardlayout;
