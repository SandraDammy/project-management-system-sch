import React from "react";
import styles from "./landingNavbar.module.css";
import Input from "../../common/input/input";
import Select from "../../common/select/select";
import { Link} from "react-router-dom";
import RoleDropdown from "../../common/roleDropdown/roleDropdown";

const LandingNavbar = () => {

  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <Link to="/" className={styles.logo}>
          UNILAG Projects
        </Link>

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
