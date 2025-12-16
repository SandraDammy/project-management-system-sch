import React, { useState } from "react";
import styles from "./modal.module.css";
import closeIcon from "../../Assets/Image/close.svg";
import Button from "../common/button/button";
import ReviewProjectModal from "../modalMsg/reviewProjectModal";
import CompleteProjectModal from "../modalMsg/completeProjectModal";
import PostProjectModal from "../modalMsg/postProjectModal";

const ProjectCommitModal = ({ onClose, activity = {} }) => {
  const isValid = (val) =>
    val && val.toString().toLowerCase().trim() !== "not provided";

  const [showCompleteProjectModal, setShowCompleteProjectModal] =
    useState(false);
  const [showPostProjectModal, setShowPostProjectModal] = useState(false);
  const [showReviewProjectModal, setShowReviewProjectModal] = useState(false);

  const handleReviewProject = () => {
    setShowReviewProjectModal(true);
  };

  const handleCompleteProject = () => {
    setShowCompleteProjectModal(true);
  };

  const handlePostProject = () => {
    setShowPostProjectModal(true);
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalBody}>
        <div className={styles.close} onClick={onClose}>
          <img src={closeIcon} alt="Close Icon" width="32" height="32" />
        </div>

        <div className={styles.modalContainer}>
          <h2>View Project Activity</h2>
          <form className={styles.body}>
            <div className={styles.details}>
              <div className={styles.section}>
                {isValid(activity.chapter) && (
                  <div className={styles.titleText}>
                    <p>Chapter</p>
                    <strong>{activity.chapter}</strong>
                  </div>
                )}
                {isValid(activity.presentationFile) && (
                  <div className={styles.titleText}>
                    <p>Upload Presentation File</p>
                    <strong>{activity.presentationFile}</strong>
                  </div>
                )}
                {isValid(activity.image) && (
                  <div className={styles.titleText}>
                    <p>Upload Image</p>
                    <strong>{activity.image}</strong>
                  </div>
                )}
              </div>

              <div className={styles.section}>
                {isValid(activity.title) && (
                  <div className={styles.titleText}>
                    <p>Title</p>
                    <strong>{activity.title}</strong>
                  </div>
                )}
                {isValid(activity.video) && (
                  <div className={styles.titleText}>
                    <p>Upload Video</p>
                    <strong>{activity.video}</strong>
                  </div>
                )}
                {isValid(activity.link || activity.links?.[0]) && (
                  <div className={styles.titleText}>
                    <p>Link</p>
                    <strong>{activity.link || activity.links?.[0]}</strong>
                  </div>
                )}
              </div>

              <div className={styles.section}>
                {isValid(activity.document) && (
                  <div className={styles.titleText}>
                    <p>Upload Document (PDF)</p>
                    <strong>{activity.document}</strong>
                  </div>
                )}
                {isValid(activity.music) && (
                  <div className={styles.titleText}>
                    <p>Upload Music</p>
                    <strong>{activity.music}</strong>
                  </div>
                )}
                {isValid(activity.codeFile) && (
                  <div className={styles.titleText}>
                    <p>Upload Code File</p>
                    <strong>{activity.codeFile}</strong>
                  </div>
                )}
              </div>
            </div>

            {isValid(activity.description) && (
              <div className={styles.titleText}>
                <p>Description</p>
                <div className={styles.textarea}>{activity.description}</div>
              </div>
            )}

            <div className={styles.btn}>
              <Button
                title="Review the project"
                className="createLarge"
                onClick={handleReviewProject}
              />
              <Button
                title="Submit Completed Project"
                className="createLarge"
                onClick={handleCompleteProject}
              />
              <Button
                title="Post Project"
                className="createLarge"
                onClick={handlePostProject}
              />
            </div>
          </form>
        </div>
      </div>

      {showCompleteProjectModal && (
        <CompleteProjectModal id={activity.id} onClose={onClose} />
      )}

      {showReviewProjectModal && (
        <ReviewProjectModal id={activity.id} onClose={onClose} />
      )}

      {showPostProjectModal && (
        <PostProjectModal id={activity.id} onClose={onClose} />
      )}
    </div>
  );
};

export default ProjectCommitModal;
