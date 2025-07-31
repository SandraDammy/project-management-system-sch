import React, { useState } from "react";
import styles from "./sidebar.module.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { IoClose, IoMenu } from "react-icons/io5";

const AdminSidebar = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear auth (adjust as needed)
    localStorage.removeItem("authToken");
    sessionStorage.clear();

    // Redirect to login
    navigate("/login");
  };

  const toggleMenu = () => setOpen(!open);
  return (
    <div className={styles.navbar}>
      <div className={styles.navbarHeader}>
        <div className={styles.hamburger} onClick={toggleMenu}>
          {open ? <IoClose /> : <IoMenu />}
        </div>
      </div>

      <div className={open ? styles.navbarMenuActive : styles.navbarMenu}>
        <ul className={styles.navbarList}>
          <li className={styles.sidebarItem}>
            <Link
              to="/admin"
              className={`${styles.sidebarLink} ${
                location.pathname === "/admin" ? styles.active : ""
              }`}
            >
              All Project
            </Link>
          </li>

          <li className={styles.sidebarItem}>
            <Link
              to="/admin/user"
              className={`${styles.sidebarLink} ${
                location.pathname === "/admin/user" ? styles.active : ""
              }`}
            >
              Users
            </Link>
          </li>

          <li className={styles.sidebarItem}>
            <Link
              to="/admin/faculty"
              className={`${styles.sidebarLink} ${
                location.pathname === "/admin/faculty" ? styles.active : ""
              }`}
            >
              Faculty
            </Link>
          </li>

          <li className={styles.sidebarItem}>
            <button onClick={handleLogout} className={styles.sidebarBtn}>
              Logout
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default AdminSidebar;
