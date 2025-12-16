import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import styles from "./sidebar.module.css";
import Logo from "../../../Assets/Image/schLogo.png";
import Dashboard from "../../../Assets/Image/dashboard.png";
import Profile from "../../../Assets/Image/profile.png";
import {
  IoClose,
  IoMenu,
} from "react-icons/io5";

const LecturerSidebar = () => {
  const [open, setOpen] = useState(false);


  const location = useLocation();
  const navigate = useNavigate();

  const toggleMenu = () => setOpen(!open);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    sessionStorage.clear();
    navigate("/login");
  };

  return (
    <div className={styles.container}>
      {/* Header */}
      <div className={styles.sidebarHeader}>
        <Link to="/lecturer" className={styles.logoWrapper}>
          <img src={Logo} alt="Unilag Logo" className={styles.logo} />
          <h1 className={styles.title}>University of Lagos</h1>
        </Link>
        <div className={styles.hamburger} onClick={toggleMenu}>
          {open ? <IoClose /> : <IoMenu />}
        </div>
      </div>

      {/* Menu */}
      <div className={open ? styles.sidebarMenuActive : styles.sidebarMenu}>
        <ul className={styles.sidebarList}>
          {/* Dashboard */}
          <li className={styles.sidebarItem}>
            <Link
              to="/lecturer"
              className={`${styles.sidebarLink} ${
                location.pathname === "/lecturer" ? styles.active : ""
              }`}
            >
              <img src={Dashboard} alt="Dashboard" className={styles.icon} />
              Dashboard
            </Link>
          </li>

          {/* Project */}
          <li className={styles.sidebarItem}>
            <Link
              to="/lecturer/project"
              className={`${styles.sidebarLink} ${
                location.pathname === "/lecturer/project"
                  ? styles.active
                  : "/lecturer/project"
              }`}
            >
              <img src={Profile} alt="Project" className={styles.icon} />
              Project
            </Link>
          </li>

          {/* Profile */}
          <li className={styles.sidebarItem}>
            <Link
              to=""
              className={`${styles.sidebarLink} ${
                location.pathname === "" ? styles.active : ""
              }`}
            >
              <img src={Profile} alt="Profile" className={styles.icon} />
              Profile & Settings
            </Link>
          </li>

          {/* Logout */}
          <li className={styles.sidebarItem}>
            <button onClick={handleLogout} className={styles.sidebarBtn}>
              <img src={Profile} alt="Logout" className={styles.icon} />
              Logout
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default LecturerSidebar;
