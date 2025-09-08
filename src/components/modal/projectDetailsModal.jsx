import React from "react";
import styles from "./modal.module.css";

const ProjectDetailsModal = ({ project, onClose }) => {
  if (!project) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <button className={styles.closeBtn} onClick={onClose}>
          ✕
        </button>
        {/* <h2>
          <strong>Name:</strong> {project.firstName} {project.lastName}
        </h2> */}
        <p><strong>Email:</strong> {project.email}</p>
        <p><strong>Role:</strong> {project.role}</p>
        {/* <p><strong>Gender:</strong> {project.gender}</p> */}
      </div>
    </div>
  );
};

export default ProjectDetailsModal;
