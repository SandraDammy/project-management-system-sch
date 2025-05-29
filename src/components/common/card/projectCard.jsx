import React from "react";
import styles from "./card.module.css";
import Button from "../button/button";

const ProjectCard = ({ title, department, description, onViewMore }) => {


  return (
    <div className={styles.card}>
      <div className={styles.viewTitle}>
        <h3>{title}</h3>
        <p className={styles.department}>{department}</p>
        <p className={styles.description}>{description}</p>
      </div>
      <div className={styles.viewButton}>
        <Button
          title="View More"
          className="viewButton"
          onClick={onViewMore}
        />
      </div>
    </div>
  );
};

export default ProjectCard;
