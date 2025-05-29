import React from "react";
import styles from "../pages/project/project.module.css";
import LandingBanner from "../section/landingBanner/landingBanner";
import ExploreProject from "../section/exploreProject/exploreProject";
import Button from "../common/button/button";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();

  const handleAllProject = () => {
    navigate("/projects");
  };
  return (
    <div className={styles.project}>
      <section className={styles.banner}>
        <LandingBanner />
      </section>

      <main className={styles.landingBody}>
        <h2>Explore Projects</h2>
        <p>
          Browse through project categories, research fields, and recent works.
        </p>
        <ExploreProject />
        <Button
          title="BROWSE ALL PROJECT"
          className="searchButton"
          onClick={handleAllProject}
        />
      </main>
    </div>
  );
};

export default LandingPage;
