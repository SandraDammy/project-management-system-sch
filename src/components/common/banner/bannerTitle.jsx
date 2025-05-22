import React from "react";
import { Link } from "react-router-dom"; 
import styles from "./banner.module.css";
import arrowLeft from "../../../Assets/Image/arrowLeft.svg";

const BannerTitle = ({ title, href }) => {
  return (
    <div className={styles.titleBanner}>
      <Link to={href}>
        <img src={arrowLeft} alt="arrowBack" className={styles.icon} />
      </Link>
      <h1 className={styles.title}>{title}</h1>
    </div>
  );
};

export default BannerTitle;
