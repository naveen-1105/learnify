'use client'
import AllUsers from "../../components/Admin/AllUsers";
import React from "react";
import AdminProtected from "../../../hooks/useAdminProtected";
import DashBoard from "../../components/Admin/DashBoard";
import Sidebar from "../../components/Admin/Sidebar";

const page = () => {
  return (
    <>
      <AdminProtected>
        <div className="flex h-[200vh]">
          <div className="1500px:w-[16%] w-1/5">
            <Sidebar />
          </div>
          <div className="w-[85%]">
            <DashBoard />
            <AllUsers isTeam={true} />
          </div>
        </div>
      </AdminProtected>
    </>
  );
};

export default page;
