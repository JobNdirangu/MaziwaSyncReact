import React from "react";
import { Outlet } from "react-router-dom";
import DashboardNavBar from "../layout/DashboardNavBar";
import SideBar from "./Sidebar";

const PorterLayout = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <SideBar />

      <div className="flex flex-col flex-1">
        <DashboardNavBar />

        <main className="flex-1 p-6 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default PorterLayout;