import React, { useState } from "react";
import styles from "./modal.module.css";
import closeIcon from "../../Assets/Image/close.svg";
import Button from "../common/button/button";
import { post } from "../context/api";
import { baseUrl } from "../context/baseUrl";
import SuccessModal from "../modalMsg/successModal";
import ErrorMsg from "../common/errorMsg/errorMsg";

const ProjectActivityModal = ({ onClose, projectId, projectTitle }) => {
  const [formData, setFormData] = useState({
    chapter: "",
    title: "",
    description: "",
    presentationFile: null,
    image: null,
    video: null,
    music: null,
    document: null,
    codeFile: null,
    links: [],
    projectId: projectId || "",
    projectTitle: projectTitle || "",
    commitMessage: "Add projectId to formData",
  });

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;

    if (
      [
        "presentationFile",
        "document",
        "codeFile",
        "video",
        "music",
        "image",
      ].includes(name) &&
      type === "file"
    ) {
      const file = files[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          const base64String = reader.result.split(",")[1];
          setFormData((prev) => ({
            ...prev,
            [name]: base64String,
          }));
        };
        reader.readAsDataURL(file);
      }
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const newErrors = {};

    if (!formData.title) newErrors.title = "Title is required.";
    if (!formData.description)
      newErrors.description = "Description is required.";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setLoading(false);
      return;
    }

    const payload = {
      ...formData,
    };

    try {
      await post(`${baseUrl}ProjectActivities/AddProjectActivity`, payload);

      setShowSuccessModal(true);
      setFormData({
        chapter: "",
        title: "",
        description: "",
        presentationFile: null,
        image: null,
        video: null,
        music: null,
        document: null,
        codeFile: null,
        links: [],
        projectId: projectId,
        projectTitle: projectTitle,
        commitMessage: "Add projectId to formData",
      });
      setErrors({});
    } catch (error) {
      console.error("Error:", error.response?.data || error.message);
      setErrors({
        submit: "Failed to submit project activity. Please try again.",
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

          {errors.submit && <ErrorMsg message={errors.submit} />}

          <form className={styles.body} onSubmit={handleSubmit}>
            <div className={styles.details}>
              <div className={styles.section}>
                <InputField
                  label="Chapter"
                  placeholder="Enter Chapter"
                  name="chapter"
                  value={formData.chapter}
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
                  value={formData.title}
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
                    name="links"
                    placeholder="https://example.com"
                    value={formData.links[0] || ""}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        links: [e.target.value],
                      }))
                    }
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
                value={formData.description}
                onChange={handleChange}
                placeholder="Describe this chapter's content..."
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

      {showSuccessModal && (
        <SuccessModal
          title="Project Activity created successfully"
          btnTitle="Done"
          btnOnclick={() => (window.location.href = "/")}
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
  <div className={styles.titleText}>
    <label>{label}</label>
    <input type="file" name={name} onChange={onChange} />
  </div>
);

export default ProjectActivityModal;
