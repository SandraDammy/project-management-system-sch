import React from "react";
import styles from "./card.module.css";
import Button from "../button/button";

const ProjectCard = ({
  title,
  faculty,
  department,
  description,
  onViewMore,
}) => {
  return (
    <div className={styles.card}>
      <div className={styles.viewTitle}>
        <h3>{title}</h3>
        <div className={styles.projectName}>
          <p className={styles.faculty}>({faculty})</p>
          <p className={styles.department}>{department}</p>
        </div>
        <p className={styles.description}>{description}</p>
      </div>
      <div className={styles.viewButton}>
        <Button title="View More" className="viewButton" onClick={onViewMore} />
      </div>
    </div>
  );
};

export default ProjectCard;
