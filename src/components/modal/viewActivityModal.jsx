import React, { useState } from "react";
import styles from "./modal.module.css";
import closeIcon from "../../Assets/Image/close.svg";
import Button from "../common/button/button";
import SuccessModal from "../modalMsg/successModal";
import { toast } from "react-toastify";
import { put } from "../context/api";
import { baseUrl } from "../context/baseUrl";

const ViewActivityModal = ({ onClose, activity }) => {
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const isValid = (val) =>
    val && val.toString().toLowerCase().trim() !== "not provided";

  const handlePostProject = async () => {
    setIsLoading(true);
    try {
      await put(
        `${baseUrl}Projects/UpdateProject/${activity?.projectId}`,
        {
          projectStatus: "Posted",
        }
      );

      setShowSuccessModal(true); // ✅ show success only after success
      toast.success("Project successfully posted!");
    } catch (error) {
      console.error("Failed to post project:", error);
      toast.error("Something went wrong. Try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDone = () => {
    setShowSuccessModal(false);
    onClose(); // ✅ close ALL modals
  };

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

                {isValid(activity.links) && (
                  <div className={styles.titleText}>
                    <p>Link</p>
                    <strong>{activity.links}</strong>
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
                title={isLoading ? "Posting..." : "Post Project"}
                className="createLarge"
                onClick={handlePostProject}
                disabled={isLoading}
              />
            </div>
          </div>
        </div>
      </div>

      {showSuccessModal && (
        <SuccessModal
          title="Post project successful"
          btnTitle="Done"
          btnOnclick={handleDone}
        />
      )}
    </div>
  );
};

export default ViewActivityModal;
