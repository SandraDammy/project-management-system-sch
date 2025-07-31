import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom"; // ✅ Import useLocation
import styles from "./sidebar.module.css";
import Logo from "../../../Assets/Image/schLogo.png";
import Dashboard from "../../../Assets/Image/dashboard.png";
import Activity from "../../../Assets/Image/activity.png";
import Profile from "../../../Assets/Image/profile.png";
import { IoClose, IoMenu } from "react-icons/io5";

const LecturerSidebar = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation(); // ✅ Get current location path

  const toggleMenu = () => setOpen(!open);

    const navigate = useNavigate();

  const handleLogout = () => {
    // Clear auth (adjust as needed)
    localStorage.removeItem("authToken");
    sessionStorage.clear();

    // Redirect to login
    navigate("/login");
  };

  return (
    <div className={styles.container}>
      <div className={styles.sidebarHeader}>
        <Link to="/lecturer" className={styles.logoWrapper}>
          <img src={Logo} alt="Unilag Logo" className={styles.logo} />
          <h1 className={styles.title}>University of Lagos</h1>
        </Link>
        <div className={styles.hamburger} onClick={toggleMenu}>
          {open ? <IoClose /> : <IoMenu />}
        </div>
      </div>

      <div className={open ? styles.sidebarMenuActive : styles.sidebarMenu}>
        <ul className={styles.sidebarList}>
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

          <li className={styles.sidebarItem}>
            <Link
              to="/lecturer/project"
              className={`${styles.sidebarLink} ${
                location.pathname === "/lecturer/project" ? styles.active : ""
              }`}
            >
              <img src={Activity} alt="Project" className={styles.icon} />
              My Project
            </Link>
          </li>

          <li className={styles.sidebarItem}>
            <Link
              to=""
              // to="lecturer/profile"
              className={`${styles.sidebarLink} ${
                location.pathname === "" ? styles.active : ""
                // location.pathname === "lecturer/profile" ? styles.active : ""
              }`}
            >
              <img src={Profile} alt="Profile" className={styles.icon} />
              Profile & Settings
            </Link>
          </li>

          <li className={styles.sidebarItem}>
            <button onClick={handleLogout} className={styles.sidebarBtn}>
              <img src={Profile} alt="Profile" className={styles.icon} />
              Logout
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default LecturerSidebar;
