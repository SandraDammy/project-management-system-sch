import React from "react";
import { Link, Outlet } from "react-router-dom";
import Navbar from "../common/navbar/navbar";
import AdminSidebar from "../common/sidebar/adminSidebar";
import Logo from "../../Assets/Image/schLogo.png";

const AdminLayout = () => {
  return (
    <div className="landingPage">
      <header className="navbar">
        <div className="sidebarHeader">
          <Link to="/admin" className="logoWrapper">
            <img src={Logo} alt="Unilag Logo" className="logo" />
            <h1 className="title">University of Lagos</h1>
          </Link>
        </div>
        <AdminSidebar />
        <Navbar />
      </header>
      <div className="container-body">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
