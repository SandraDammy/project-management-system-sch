import React from "react";
import Navbar from "../../common/navbar/navbar";
import Sidebar from "../../common/sidebar/sidebar";

const StudentDashboard = () => {
  return (
    <div className="flex h-screen">
      <Sidebar role="teacher" />
      <div className="flex-1 flex flex-col">
        <Navbar />
        <div className="p-6 bg-gray-100 flex-1">
          <h1 className="text-2xl font-bold">Student Dashboard</h1>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;