import React, { useState } from "react";
import styles from "./modal.module.css";
import closeIcon from "../../Assets/Image/close.svg";
import Button from "../common/button/button";
import { post } from "../context/api";
import { baseUrl } from "../context/baseUrl";
import SuccessModal from "../modalMsg/successModal";
import ErrorMsg from "../common/errorMsg/errorMsg";

const ProjectActivityModal = ({ onClose, projectId, projectTitle }) => {
  const [chapter, setChapter] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [presentationFile, setPresentationFile] = useState(null);
  const [image, setImage] = useState(null);
  const [video, setVideo] = useState(null);
  const [music, setMusic] = useState(null);
  const [document, setDocument] = useState(null);
  const [codeFile, setCodeFile] = useState(null);
  const [links, setLinks] = useState([]);

  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files && files[0]) {
      const file = files[0];
      if (name === "presentationFile") setPresentationFile(file);
      else if (name === "image") setImage(file);
      else if (name === "video") setVideo(file);
      else if (name === "music") setMusic(file);
      else if (name === "document") setDocument(file);
      else if (name === "codeFile") setCodeFile(file);
    } else {
      if (name === "chapter") setChapter(value);
      else if (name === "title") setTitle(value);
      else if (name === "description") setDescription(value);
    }
  };

  const handleLinkChange = (e, index) => {
    const newLinks = [...links];
    newLinks[index] = e.target.value;
    setLinks(newLinks);
  };

  const safeAppendFile = (formData, fieldName, file) => {
    if (file && file instanceof File && file.size > 0) {
      formData.append(fieldName, file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const newErrors = {};

    if (!title) newErrors.title = "Title is required.";
    if (!description) newErrors.description = "Description is required.";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setIsLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append("Chapter", chapter);
    formData.append("Title", title);
    formData.append("Description", description);
    formData.append("ProjectId", projectId);
    formData.append("ProjectTitle", projectTitle);
    formData.append("CommitMessage", "Add projectId to formData");

    safeAppendFile(formData, "PresentationFile", presentationFile);
    safeAppendFile(formData, "Image", image);
    safeAppendFile(formData, "Video", video);
    safeAppendFile(formData, "Music", music);
    safeAppendFile(formData, "Document", document);
    safeAppendFile(formData, "CodeFile", codeFile);

    if (links.length > 0 && links[0]) {
      formData.append("Links", links[0]);
    }

    // Debugging: Log FormData contents
    for (let [key, value] of formData.entries()) {
      console.log(`${key}:`, value);
    }

    try {
      await post(`${baseUrl}ProjectActivities/AddProjectActivity`, formData);
      setShowSuccessModal(true);
      setChapter("");
      setTitle("");
      setDescription("");
      setPresentationFile(null);
      setImage(null);
      setVideo(null);
      setMusic(null);
      setDocument(null);
      setCodeFile(null);
      setLinks([]);
      setErrors({});
    } catch (error) {
      console.error("Submission error:", error);
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
          <h2>Add Project Activity</h2>
          {errors.submit && <ErrorMsg message={errors.submit} />}

          <form className={styles.body} onSubmit={handleSubmit}>
            <div className={styles.details}>
              <div className={styles.section}>
                <InputField
                  label="Chapter"
                  placeholder="Enter Chapter"
                  name="chapter"
                  value={chapter}
                  onChange={handleChange}
                />
                <FileInput
                  label="Upload Presentation File"
                  name="presentationFile"
                  onChange={handleChange}
                />
                <FileInput
                  label="Upload Image"
                  name="image"
                  onChange={handleChange}
                />
              </div>

              <div className={styles.section}>
                <InputField
                  label="Title"
                  placeholder="Enter Title"
                  name="title"
                  value={title}
                  onChange={handleChange}
                  error={errors.title}
                />
                <FileInput
                  label="Upload Video"
                  name="video"
                  onChange={handleChange}
                />
                <div className={styles.titleText}>
                  <label>Link</label>
                  <input
                    type="text"
                    placeholder="https://example.com"
                    value={links[0] || ""}
                    onChange={(e) => handleLinkChange(e, 0)}
                  />
                </div>
              </div>

              <div className={styles.section}>
                <FileInput
                  label="Upload Document (PDF)"
                  name="document"
                  onChange={handleChange}
                />
                <FileInput
                  label="Upload Music"
                  name="music"
                  onChange={handleChange}
                />
                <FileInput
                  label="Upload Code File"
                  name="codeFile"
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className={styles.titleText}>
              <label>
                Description
                {errors.description && (
                  <span className={styles.error}> ({errors.description})</span>
                )}
              </label>
              <textarea
                name="description"
                value={description}
                onChange={handleChange}
                placeholder="Describe this chapter's content..."
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
          title="Project Activity created successfully"
          btnTitle="Done"
          btnOnclick={() => (window.location.href = "/student/project")}
        />
      )}
    </div>
  );
};

const InputField = ({
  label,
  name,
  value,
  onChange,
  placeholder,
  disabled,
  error,
}) => (
  <div className={styles.titleText}>
    <label>
      {label}
      {error && <span className={styles.error}> ({error})</span>}
    </label>
    <input
      type="text"
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      disabled={disabled}
    />
  </div>
);

const FileInput = ({ label, name, onChange }) => (
  <div className={styles.titleFile}>
    <label>{label}</label>
    <input type="file" name={name} onChange={onChange} />
  </div>
);

export default ProjectActivityModal;
