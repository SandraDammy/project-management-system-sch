import React from "react";
import StudentSidebar from "../common/sidebar/studentSidebar";
import Navbar from "../common/navbar/navbar";
import { Outlet } from "react-router-dom";

const StudentLayout = () => {
  return (
    <div className="container">
      <div className="container-side">
        <StudentSidebar />
      </div>
      <div className="container-body">
        Student Page
        <Navbar />
        <Outlet />
      </div>
    </div>
  );
};

export default StudentLayout;
