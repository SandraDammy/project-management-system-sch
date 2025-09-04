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
        <h2>{project.title}</h2>
        <p>{project.description}</p>
        <p><strong>Owner:</strong> {project.owner}</p>
        <p><strong>Created At:</strong> {project.createdAt}</p>
      </div>
    </div>
  );
};

export default ProjectDetailsModal;