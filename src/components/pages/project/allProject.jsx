import React from "react";
import styles from "./project.module.css";
import AllProjects from "../../section/exploreProject/allProjects";

const AllProject = () => {
  return (
    <div className={styles.landingBody}>
      <AllProjects />
    </div>
  );
};

export default AllProject;
