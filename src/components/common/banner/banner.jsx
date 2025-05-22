import React from "react";
import styles from "./banner.module.css";

const Banner = ({ title }) => {
  return (
    <div className={styles.banner}>
      <div className={styles.titleBanner}>
        <h1 className={styles.title}>{title}</h1>
      </div>
    </div>
  );
};

export default Banner;
