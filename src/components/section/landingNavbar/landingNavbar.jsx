import React from "react";
import styles from "./landingNavbar.module.css";
import Input from "../../common/input/input";
import Select from "../../common/select/select";
import { Link } from "react-router-dom";
import RoleDropdown from "../../common/roleDropdown/roleDropdown";
import Logo from "../../../Assets/Image/schLogo.png";

const LandingNavbar = () => {
  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <div className="sidebarHeader">
          <Link to="/" className="logoWrapper">
            <img src={Logo} alt="Unilag Logo" className="logo" />
            <h1 className="title">University of Lagos</h1>
          </Link>
        </div>

        <div className={styles.searchContainer}>
          <Input placeholder="Search projects..." className="input" />
          <Select
            options={[
              { value: "", label: "Select Department" },
              { value: "csc", label: "Computer Science" },
              { value: "eng", label: "Engineering" },
              { value: "bio", label: "Biological Sciences" },
            ]}
          />
        </div>

        <div className={styles.loginButton}>
          <RoleDropdown />
        </div>
      </nav>
    </header>
  );
};

export default LandingNavbar;
