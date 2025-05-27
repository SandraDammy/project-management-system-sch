import React from "react";
import styles from "./landingNavbar.module.css";
import Button from "../../common/button/button";

const LandingNavbar = () => {
  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <div>Project Logo</div>
        <div>search</div>
        <div>
          <Button title="Login" className="btnLarge" type="button" />
        </div>
      </nav>
    </header>
  );
};

export default LandingNavbar;
