import React, { useState } from "react";
import styles from "./modal.module.css";
import closeIcon from "../../Assets/Image/close.svg";
import Button from "../common/button/button";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const ProjectActivityModal = ({ onClose }) => {
  const navigate = useNavigate();

  const [chapter, setChapter] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [presentationFile, setPresentationFile] = useState(null);
  const [image, setImage] = useState(null);
  const [video, setVideo] = useState(null);
  const [music, setMusic] = useState(null);
  const [document, setDocument] = useState(null);
  const [codeFile, setCodeFile] = useState(null);
  const [link, setLink] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = new FormData();
      data.append("chapter", chapter);
      data.append("title", title);
      data.append("description", description);
      if (presentationFile) data.append("presentation", presentationFile);
      if (image) data.append("image", image);
      if (video) data.append("video", video);
      if (music) data.append("music", music);
      if (document) data.append("document", document);
      if (codeFile) data.append("codeFile", codeFile);
      if (link) data.append("link", link);

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
          <h2>Create Project Activity</h2>
          <form className={styles.body} onSubmit={handleSubmit}>
            <div className={styles.details}>
              <div className={styles.section}>
                <div className={styles.titleText}>
                  <label>Chapter</label>
                  <input
                    type="text"
                    value={chapter}
                    onChange={(e) => setChapter(e.target.value)}
                    placeholder="e.g. Chapter One"
                    required
                  />
                </div>
                <div className={styles.titleText}>
                  <label>Upload Presentation File</label>
                  <input
                    type="file"
                    accept=".ppt,.pptx,.pdf"
                    onChange={(e) => setPresentationFile(e.target.files[0])}
                  />
                </div>
                <div className={styles.titleText}>
                  <label>Upload Image</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setImage(e.target.files[0])}
                  />
                </div>
              </div>

              <div className={styles.section}>
                <div className={styles.titleText}>
                  <label>Title</label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g. Introduction"
                    required
                  />
                </div>
                <div className={styles.titleText}>
                  <label>Upload Video</label>
                  <input
                    type="file"
                    accept="video/*"
                    onChange={(e) => setVideo(e.target.files[0])}
                  />
                </div>
                <div className={styles.titleText}>
                  <label>Link</label>
                  <input
                    type="url"
                    value={link}
                    onChange={(e) => setLink(e.target.value)}
                    placeholder="https://example.com"
                  />
                </div>
              </div>

              <div className={styles.section}>
                <div className={styles.titleText}>
                  <label>Upload Document (PDF)</label>
                  <input
                    type="file"
                    accept="application/pdf"
                    onChange={(e) => setDocument(e.target.files[0])}
                  />
                </div>
                <div className={styles.titleText}>
                  <label>Upload Music</label>
                  <input
                    type="file"
                    accept="audio/*"
                    onChange={(e) => setMusic(e.target.files[0])}
                  />
                </div>
                <div className={styles.titleText}>
                  <label>Upload Code File</label>
                  <input
                    type="file"
                    onChange={(e) => setCodeFile(e.target.files[0])}
                  />
                </div>
              </div>
            </div>

            <div className={styles.titleText}>
              <label>Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe this chapter's content..."
                required
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

export default ProjectActivityModal;
