import React, { useState } from "react";
import styles from "./modal.module.css";
import closeIcon from "../../Assets/Image/close.svg";
import Button from "../common/button/button";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const ProjectCommitModal = ({ onClose, activity = {} }) => {
  const navigate = useNavigate();
  const [commit, setCommit] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = new FormData();
      data.append("commit", commit);

      const response = await fetch("/api/project-activity", {
        method: "POST",
        body: data,
      });

      if (!response.ok) {
        throw new Error("Failed to submit project activity.");
      }

      toast.success("Project activity submitted successfully!", {
        position: "top-right",
      });

      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (err) {
      toast.error("Error submitting project. Please try again.", {
        position: "top-right",
      });
    } finally {
      setLoading(false);
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
                <div className={styles.titleText}>
                  <p>Chapter</p>
                  <strong>{activity.chapter || "Not provided"}</strong>
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
                  <p>Link</p>
                  <strong>
                    {activity.link || "Not provided"}
                  </strong>
                </div>
              </div>
              <div className={styles.section}>
                <div className={styles.titleText}>
                  <p>Upload Document</p>
                  <strong>{activity.file || "Not provided"}</strong>
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
              <label>Commit Message</label>
              <input
                type="text"
                value={commit}
                onChange={(e) => setCommit(e.target.value)}
                placeholder="e.g. Added intro chapter"
              />
            </div>

            <div className={styles.btn}>
              <Button
                title={loading ? "Submitting..." : "Submit"}
                className="createLarge"
                disabled={loading}
                type="submit"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProjectCommitModal;
