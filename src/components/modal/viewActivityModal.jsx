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
                  <strong>{activity.chapter || "Not provided"}</strong>
                </div>
                <div className={styles.titleText}>
                  <p>Upload Presentation File</p>
                  <strong>{activity.presentationFile || "Not provided"}</strong>
                </div>
                <div className={styles.titleText}>
                  <p>Upload Image</p>
                  <strong>{activity.image || "Not provided"}</strong>
                </div>
              </div>
              <div className={styles.section}>
                <div className={styles.titleText}>
                  <p>Title</p>
                  <strong>{activity.title || "Not provided"}</strong>
                </div>
                <div className={styles.titleText}>
                  <p>Upload Video</p>
                  <strong>{activity.video || "Not provided"}</strong>
                </div>
                <div className={styles.titleText}>
                  <p>Link</p>
                  <strong>{activity.link || "Not provided"}</strong>

                  {/* <strong>
                    {Array.isArray(activity.link) && activity.link.length > 0
                      ? activity.link.join(", ")
                      : "Not provided"}
                  </strong> */}
                </div>
              </div>
              <div className={styles.section}>
                <div className={styles.titleText}>
                  <p>Upload Document (PDF)</p>
                  <strong>{activity.document || "Not provided"}</strong>
                </div>
                <div className={styles.titleText}>
                  <p>Upload Music</p>
                  <strong>{activity.music || "Not provided"}</strong>
                </div>
                <div className={styles.titleText}>
                  <p>Upload Code File</p>
                  <strong>{activity.codeFile || "Not provided"}</strong>
                </div>
              </div>
            </div>

            <div className={styles.titleText}>
              <p>Description</p>
              <div className={styles.textarea}>
                {activity.description || "Not provided"}
              </div>
            </div>
            <div className={styles.titleText}>
              <p>Commit Message</p>
              <div className={styles.textarea}>
                {activity.commit || "Not provided"}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewActivityModal;
