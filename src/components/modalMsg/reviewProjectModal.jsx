import React, { useState } from "react";
import styles from "./modalMsg.module.css";
import ArrowBack from "../../Assets/Image/ArrowBack.svg";
import Button from "../common/button/button";
import SuccessModal from "./successModal";
import { put } from "../context/api";
import { baseUrl } from "../context/baseUrl";

const ReviewProjectModal = ({ onClose, id}) => {
  const [commitMessage, setCommitMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [errors, setErrors] = useState({});

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    const newErrors = {};

    if (!commitMessage) {
      newErrors.commitMessage = "Review message is required";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setIsLoading(false);
      return;
    }

    const mainData = {
      projectActivityId: id,
      CommitMessage: commitMessage,
      ActivityStatus: "Review",
    };

    try {
      await put(
        `${baseUrl}ProjectActivities/UpdateProjectActivity/projectActivityId?projectActivityId=${id}`,
        mainData
      );
      setShowSuccessModal(true);
      setCommitMessage("");
      setErrors({});
    } catch (error) {
      console.error("Error submitting review:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDone = () => {
    setShowSuccessModal(false);
    onClose();
  };

  return (
    <div className={styles.modal}>
      <div className={styles.wrapper}>
        <div className={styles.close} onClick={onClose}>
          <img src={ArrowBack} alt="Back" width="28" height="28" />
          <h2>Review Project</h2>
        </div>
        <div className={styles.modalContainer}>
          <form className={styles.body} onSubmit={handleSubmit}>
            <div className={styles.bodyCommit}>
              <textarea
                name="commitMessage"
                placeholder="Enter your message"
                value={commitMessage}
                onChange={(e) => setCommitMessage(e.target.value)}
                className={styles.textarea}
              />
              {errors.commitMessage && (
                <p className={styles.error}>{errors.commitMessage}</p>
              )}
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
          title="Review request successful"
          btnTitle="Done"
          btnOnclick={handleDone}
        />
      )}
    </div>
  );
};

export default ReviewProjectModal;
