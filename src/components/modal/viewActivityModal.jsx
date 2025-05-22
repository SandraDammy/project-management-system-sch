import React from "react";
import styles from "./modal.module.css";
import closeIcon from "../../Assets/Image/close.svg";

const ViewActivityModal = ({ onClose, activity }) => {
  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalBody}>
        <div className={styles.close} onClick={onClose}>
          <img src={closeIcon} alt="Close Icon" width="32" height="32" />
        </div>
        <div className={styles.modalContainer}>
          <h2>View Project Activity</h2>
          <div className={styles.body}>
            <div className={styles.details}>
              <div className={styles.section}>
                <div className={styles.titleText}>
                  <p>Chapter</p>
                  <strong>{activity.chapter}</strong>
                </div>
                <div className={styles.titleText}>
                  <p>Upload Image</p>
                  <strong>{activity.image}</strong>
                </div>
              </div>
              <div className={styles.section}>
                <div className={styles.titleText}>
                  <p>Title</p>
                  <strong>{activity.title}</strong>
                </div>
                <div className={styles.titleText}>
                  <p>Link</p>
                  <strong>{activity.link}</strong>
                </div>
              </div>
              <div className={styles.section}>
                <div className={styles.titleText}>
                  <p>Upload Document</p>
                  <strong>{activity.file}</strong>
                </div>
                <div className={styles.titleText}>
                  <p>Upload Code File</p>
                  <strong>{activity.codeFile}</strong>
                </div>
              </div>
            </div>

            <div className={styles.titleText}>
              <p>Description</p>
              <div className={styles.textarea}>{activity.description}</div>
            </div>
            <div className={styles.titleText}>
              <p>Commit Message</p>
              <div className={styles.textarea}>{activity.commit}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewActivityModal;
