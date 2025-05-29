import React from "react";
import styles from "./project.module.css";
import { useParams } from "react-router-dom";

const ViewProject = () => {
  const { projectName } = useParams();

  // Mock project details – replace with dynamic data later if needed
  const projectDetails = {
    author: "Jane Doe",
    department: "Mass Communication",
    program: "HND Mass Communication",
    date: "April 22, 2025",
    supervisor: "Dr. Emmanuel Okoro",
    type: "Research Project",
  };

  return (
    <div className={styles.project}>
      <div className={styles.banner}>
        <h1>{decodeURIComponent(projectName)}</h1>
      </div>

      <div className={styles.details}>
        <p><strong>Project by:</strong> {projectDetails.author}</p>
        <p><strong>Department:</strong> {projectDetails.department}</p>
        <p><strong>Program:</strong> {projectDetails.program}</p>
        <p><strong>Date:</strong> {projectDetails.date}</p>
        <p><strong>Supervised by:</strong> {projectDetails.supervisor}</p>
        <p><strong>Project Type:</strong> {projectDetails.type}</p>
      </div>
    </div>
  );
};

export default ViewProject;
