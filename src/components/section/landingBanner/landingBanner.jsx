import React from "react";
import styles from "./landingBanner.module.css";
import Input from "../../common/input/input";
import Button from "../../common/button/button";

const LandingBanner = () => {
  const handleSearch = () => {};
  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Project Topics & Research Materials</h1>

      <div className={styles.searchWrapper}>
        <Input
          className="searchInput"
          placeholder="Search for project topics, research, case studies..."
        />
        <Button
          className="searchButton"
          title="Search"
          onClick={handleSearch}
        />
      </div>

      <p className={styles.description}>
        Discover a wide range of topics and materials for academic projects,
        research work, case studies, and practical assignments. Whether you're
        working on a final year project, a research proposal, or any
        professional or academic initiative, explore curated content to support
        your goals across various disciplines.
      </p>
    </div>
  );
};

export default LandingBanner;
