import React, { useState } from "react";
import styles from "./modal.module.css";
import closeIcon from "../../Assets/Image/close.svg";
import Button from "../common/button/button";
import { put } from "../context/api";
import { baseUrl } from "../context/baseUrl";
import SuccessModal from "../modalMsg/successModal";

const ProjectCommitModal = ({ onClose, activity = {} }) => {
  const isValid = (val) =>
    val && val.toString().toLowerCase().trim() !== "not provided";

  const [commitMessage, setCommitMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const newErrors = {};
    if (!commitMessage.trim()) {
      newErrors.commitMessage = "Commit message is required.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setIsLoading(false);
      return;
    }

    const mainData = {
      projectActivityId: activity.id,
      CommitMessage: commitMessage,
    };

    try {
      await put(
        `${baseUrl}ProjectActivities/UpdateProjectActivity/projectActivityId?projectActivityId=${activity.id}`,
        mainData
      );
      setShowSuccessModal(true);
      setCommitMessage("");
      setErrors({});
    } catch (error) {
      console.error("Error updating project activity:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalBody}>
        <div className={styles.close} onClick={onClose}>
          <img src={closeIcon} alt="Close Icon" width="32" height="32" />
        </div>

        <div className={styles.modalContainer}>
          <h2>View Project Activity</h2>
          <form className={styles.body} onSubmit={handleSubmit}>
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
                {isValid(activity.link || (activity.links && activity.links[0])) && (
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
                <div className={styles.textarea}>
                  {activity.description}
                </div>
              </div>
            )}

            <div className={styles.titleText}>
              <label>
                Commit Message
                {errors.commitMessage && (
                  <span className={styles.error}> ({errors.commitMessage})</span>
                )}
              </label>
              <input
                type="text"
                value={commitMessage}
                onChange={(e) => setCommitMessage(e.target.value)}
                placeholder="e.g. Added intro chapter"
              />
            </div>

            <div className={styles.btn}>
              <Button
                title={isLoading ? "Submitting..." : "Submit"}
                className="createLarge"
                disabled={isLoading}
                type="submit"
              />
            </div>
          </form>
        </div>
      </div>

      {showSuccessModal && (
        <SuccessModal
          title="Project Activity updated successfully"
          btnTitle="Done"
          btnOnclick={() =>
            (window.location.href = `/lecturer/project/projectProfile/${activity.projectId}`)
          }
        />
      )}
    </div>
  );
};

export default ProjectCommitModal;
