import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import styles from "./sidebar.module.css";
import Logo from "../../../Assets/Image/schLogo.png";
import Dashboard from "../../../Assets/Image/dashboard.png";
import Activity from "../../../Assets/Image/activity.png";
import Profile from "../../../Assets/Image/profile.png";
import { IoClose, IoMenu, IoChevronDown, IoChevronForward } from "react-icons/io5";

const LecturerSidebar = () => {
  const [open, setOpen] = useState(false);
  const [dropdown, setDropdown] = useState({
    projects: false,
  });

  const location = useLocation();
  const navigate = useNavigate();

  const toggleMenu = () => setOpen(!open);

  const toggleDropdown = (section) => {
    setDropdown((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    sessionStorage.clear();
    navigate("/login");
  };

  return (
    <div className={styles.container}>
      {/* Sidebar Header */}
      <div className={styles.sidebarHeader}>
        <Link to="/lecturer" className={styles.logoWrapper}>
          <img src={Logo} alt="Unilag Logo" className={styles.logo} />
          <h1 className={styles.title}>University of Lagos</h1>
        </Link>
        <div className={styles.hamburger} onClick={toggleMenu}>
          {open ? <IoClose /> : <IoMenu />}
        </div>
      </div>

      {/* Sidebar Menu */}
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

          {/* Projects Dropdown */}
          <li
            className={styles.sidebarSubtitle}
            onClick={() => toggleDropdown("projects")}
          >
            <img src={Activity} alt="Project" className={styles.icon} />
            Projects
            {dropdown.projects ? <IoChevronDown /> : <IoChevronForward />}
          </li>

          {dropdown.projects && (
            <>
              <li className={styles.sidebarItem}>
                <Link
                  to="/lecturer/projects/all"
                  className={`${styles.sidebarLink} ${
                    location.pathname === "/lecturer/projects/all" ? styles.active : ""
                  }`}
                >
                  All Projects
                </Link>
              </li>
              <li className={styles.sidebarItem}>
                <Link
                  to="/lecturer/projects/student"
                  className={`${styles.sidebarLink} ${
                    location.pathname === "/lecturer/projects/student" ? styles.active : ""
                  }`}
                >
                  Student Projects
                </Link>
              </li>
            </>
          )}

          {/* Profile */}
          <li className={styles.sidebarItem}>
            <Link
              to="/lecturer/profile"
              className={`${styles.sidebarLink} ${
                location.pathname === "/lecturer/profile" ? styles.active : ""
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
