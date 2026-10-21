import React, { useEffect, useState } from "react";
import styles from "./modal.module.css";
import closeIcon from "../../Assets/Image/close.svg";
import Button from "../common/button/button";
import { baseUrl } from "../context/baseUrl";
import SuccessModal from "../modalMsg/successModal";
import ErrorMsg from "../common/errorMsg/errorMsg";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ProjectActivityModal = ({ onClose, projectId, projectTitle }) => {
  const [formData, setFormData] = useState({
    chapter: "",
    title: "",
    description: "",
    document: null,
    presentationFile: null,
    codeFile: null,
    image: null,
    video: null,
    music: null,
    links: [""],
  });

  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;

    if (name === "links") {
      setFormData((prev) => ({
        ...prev,
        links: [value],
      }));
      return;
    }

    if (type === "file") {
      const file = files[0];
      if (!file) return;

      const allowedTypes = {
        document: ["application/pdf"],
        presentationFile: ["application/pdf"],
        image: ["application/pdf"],
        video: ["video/mp4"],
        music: ["audio/mpeg", "audio/mp3"],
        codeFile: ["application/zip", "application/x-zip-compressed"],
      };

      const maxSizeMB = 10;
      const isValidType = allowedTypes[name]?.includes(file.type);

      if (!isValidType) {
        alert(`Invalid file type for ${name}.`);
        return;
      }

      if (file.size > maxSizeMB * 1024 * 1024) {
        alert(`File size for ${name} exceeds ${maxSizeMB}MB.`);
        return;
      }

      setFormData((prev) => ({
        ...prev,
        [name]: file,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const validateForm = () => {
    let newErrors = {};
    if (!formData.chapter) newErrors.chapter = "Chapter is required";
    if (!formData.title) newErrors.title = "Title is required";
    if (!formData.description)
      newErrors.description = "Description is required";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);

    const payload = new FormData();
    payload.append("Chapter", formData.chapter);
    payload.append("Title", formData.title);
    payload.append("Description", formData.description);
    payload.append("Document", formData.document);
    payload.append("PresentationFile", formData.presentationFile);
    payload.append("CodeFile", formData.codeFile);
    payload.append("Image", formData.image);
    payload.append("Video", formData.video);
    payload.append("Music", formData.music);
    payload.append("Links", JSON.stringify(formData.links));
    payload.append("ProjectId", projectId);
    payload.append("ProjectTitle", projectTitle);

    try {
      const response = await axios.post(
        `${baseUrl}ProjectActivities/AddProjectActivity`,
        payload,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${user?.token}`,
          },
        }
      );
      console.log("Response:", response.data);
      setShowSuccessModal(true);
    } catch (error) {
      console.error("Error:", error);
      setErrors({ submit: "Something went wrong. Try again." });
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
                <div className={styles.titleText}>
                  <label htmlFor="chapter">
                    Chapter
                    {errors.chapter && (
                      <span className={styles.error}> ({errors.chapter})</span>
                    )}
                  </label>
                  <input
                    type="text"
                    id="chapter"
                    name="chapter"
                    placeholder="Enter project stage"
                    value={formData.chapter}
                    onChange={handleChange}
                  />
                </div>

                <div className={styles.titleFile}>
                  <label htmlFor="presentationFile">
                    Upload Presentation (PDF Only)
                  </label>
                  <input
                    type="file"
                    accept=".pdf"
                    name="presentationFile"
                    id="presentationFile"
                    onChange={handleChange}
                  />
                </div>

                <div className={styles.titleFile}>
                  <label htmlFor="image">Upload Doc Images (PDF Only)</label>
                  <input
                    type="file"
                    accept=".pdf"
                    name="image"
                    id="image"
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className={styles.section}>
                <div className={styles.titleText}>
                  <label htmlFor="title">
                    Title
                    {errors.title && (
                      <span className={styles.error}> ({errors.title})</span>
                    )}
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    placeholder="Enter title"
                    value={formData.title}
                    onChange={handleChange}
                  />
                </div>

                <div className={styles.titleFile}>
                  <label htmlFor="video">Upload Video (MP4 Only)</label>
                  <input
                    type="file"
                    accept="video/mp4"
                    name="video"
                    id="video"
                    onChange={handleChange}
                  />
                </div>

                <div className={styles.titleText}>
                  <label htmlFor="links">Link</label>
                  <input
                    type="text"
                    name="links"
                    placeholder="https://example.com"
                    value={formData.links[0] || ""}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className={styles.section}>
                <div className={styles.titleFile}>
                  <label htmlFor="document">Upload Document (PDF Only)</label>
                  <input
                    type="file"
                    accept=".pdf"
                    name="document"
                    id="document"
                    onChange={handleChange}
                  />
                </div>

                <div className={styles.titleFile}>
                  <label htmlFor="music">Upload Music (MP3 Only)</label>
                  <input
                    type="file"
                    accept=".mp3,audio/mpeg"
                    name="music"
                    id="music"
                    onChange={handleChange}
                  />
                </div>

                <div className={styles.titleFile}>
                  <label htmlFor="codeFile">Upload Code File (ZIP Only)</label>
                  <input
                    type="file"
                    accept=".zip"
                    name="codeFile"
                    id="codeFile"
                    onChange={handleChange}
                  />
                </div>
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
          btnOnclick={() =>
            navigate(`/student/myProject`)
          }
        />
      )}
    </div>
  );
};

export default ProjectActivityModal;
