import React from "react";
import styles from "./modal.module.css";
import closeIcon from "../../Assets/Image/close.svg";

const ViewActivityModal = ({ onClose, activity }) => {
  // Helper to check if value is not empty and not "Not provided"
  const isValid = (val) =>
    val && val.toString().toLowerCase().trim() !== "not provided";

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
                {isValid(activity.chapter) && (
                  <div className={styles.titleText}>
                    <p>Chapter</p>
                    <strong>{activity.chapter || "Not provided"}</strong>
                  </div>
                )}
                {isValid(activity.presentationFile) && (
                  <div className={styles.titleText}>
                    <p>Upload Presentation File</p>
                    <strong>
                      {activity.presentationFile || "Not provided"}
                    </strong>
                  </div>
                )}
                {isValid(activity.image) && (
                  <div className={styles.titleText}>
                    <p>Upload Image</p>
                    <strong>{activity.image || "Not provided"}</strong>
                  </div>
                )}
              </div>

              <div className={styles.section}>
                {isValid(activity.title) && (
                  <div className={styles.titleText}>
                    <p>Title</p>
                    <strong>{activity.title || "Not provided"}</strong>
                  </div>
                )}
                {isValid(activity.video) && (
                  <div className={styles.titleText}>
                    <p>Upload Video</p>
                    <strong>{activity.video || "Not provided"}</strong>
                  </div>
                )}
                {isValid(activity.links) && (
                  <div className={styles.titleText}>
                    <p>Link</p>
                    <strong>{activity.links || "Not provided"}</strong>
                  </div>
                )}
              </div>

              <div className={styles.section}>
                {isValid(activity.document) && (
                  <div className={styles.titleText}>
                    <p>Upload Document (PDF)</p>
                    <strong>{activity.document || "Not provided"}</strong>
                  </div>
                )}
                {isValid(activity.music) && (
                  <div className={styles.titleText}>
                    <p>Upload Music</p>
                    <strong>{activity.music || "Not provided"}</strong>
                  </div>
                )}
                {isValid(activity.codeFile) && (
                  <div className={styles.titleText}>
                    <p>Upload Code File</p>
                    <strong>{activity.codeFile || "Not provided"}</strong>
                  </div>
                )}
              </div>
            </div>

            {isValid(activity.description) && (
              <div className={styles.titleText}>
                <p>Description</p>
                <div className={styles.textarea}>
                  {activity.description || "Not provided"}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewActivityModal;
