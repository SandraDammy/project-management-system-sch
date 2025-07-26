import React, { useState } from "react";
import styles from "./modal.module.css";
import closeIcon from "../../Assets/Image/close.svg";
import SuccessModal from "../modalMsg/successModal";
import { post } from "../context/api";
import { baseUrl } from "../context/baseUrl";
import Button from "../common/button/button";

const CreateFaculty = ({ onClose }) => {
  const [facultyName, setFacultyName] = useState("");
  const [description, setDescription] = useState("");
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    let newErrors = {};

    if (!facultyName) {
      newErrors.facultyName = "Name of faculty is required";
    }
    if (!description) {
      newErrors.description = "Description is required";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setSubmitted(false);
      setIsLoading(false);
      return;
    }

    const mainData = {
      FacultyName: facultyName,
      Description: description,
    };

    try {
      const response = await post(`${baseUrl}Faculties/AddFaculty`, mainData);
      console.log("Response:", response.data);
      setShowSuccessModal(true);
      setFacultyName("");
      setDescription("");
      setErrors({});
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className={styles.modalOverlay}>
        <div className={styles.modalBody}>
          <div className={styles.close} onClick={onClose}>
            <img src={closeIcon} alt="Close Icon" width="32" height="32" />
          </div>
          <div className={styles.modalContainer}>
            <h2>Create Faculty</h2>
            <form className={styles.body} onSubmit={handleSubmit}>
              <div className={styles.details}>
                <div className={styles.section}>
                  <div className={styles.titleText}>
                    <label>Name of Faculty</label>
                    <input
                      type="text"
                      id="facultyName"
                      placeholder="Information Technology"
                      name="facultyName"
                      value={facultyName}
                      onChange={(e) => setFacultyName(e.target.value)}
                    />
                    {errors.facultyName && (
                      <span className={styles.error}>{errors.facultyName}</span>
                    )}
                  </div>
                  <div className={styles.titleText}>
                    <label>Description:</label>
                    <input
                      type="text"
                      id="description"
                      placeholder="Enter description"
                      name="description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                    {errors.description && (
                      <span className={styles.error}>{errors.description}</span>
                    )}
                  </div>
                </div>
              </div>
              <div className={styles.btn}>
                <Button
                  title={isLoading ? "Creating..." : "Create Faculty"}
                  className="createLarge"
                  disabled={isLoading}
                  type="submit"
                />
              </div>
            </form>
          </div>
        </div>
      </div>

      {showSuccessModal && (
        <SuccessModal
          title="Faculty created successfully"
          btnTitle="Done"
          btnOnclick={() => (window.location.href = "/admin/faculty")}
        />
      )}
    </>
  );
};

export default CreateFaculty;
