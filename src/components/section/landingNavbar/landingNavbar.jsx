import React from "react";
import styles from "./landingNavbar.module.css";
import Button from "../../common/button/button";
import Input from "../../common/input/input";
import Select from "../../common/select/select";
import { useNavigate } from "react-router-dom";

const LandingNavbar = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/login");
  };

  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <div className={styles.logo}>UNILAG Projects</div>

        <div className={styles.searchContainer}>
          <Input placeholder="Search projects..."  className="input"/>
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
          <Button title="Login" className="btnLarge" onClick={handleLogin} />
        </div>
      </nav>
    </header>
  );
};

export default LandingNavbar;
