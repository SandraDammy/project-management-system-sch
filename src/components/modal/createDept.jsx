import React, { useState } from "react";
import styles from "./modal.module.css";
import closeIcon from "../../Assets/Image/close.svg";
import SuccessModal from "../modalMsg/successModal";
import { post } from "../context/api";
import { baseUrl } from "../context/baseUrl";
import Button from "../common/button/button";

const CreateDept = ({ onClose, facultyId }) => {
  const [departmentName, setDepartmentName] = useState("");
  const [description, setDescription] = useState("");
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    let newErrors = {};

    if (!departmentName) {
      newErrors.departmentName = "Name of department is required";
    }
    if (!description) {
      newErrors.description = "Description is required";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setIsLoading(false);
      return;
    }

    const mainData = {
      FacultyId: facultyId,
      DepartmentName: departmentName,
      Description: description,
    };

    try {
      await post(`${baseUrl}Departments/AddDepartment`, mainData);
      setShowSuccessModal(true);
      setDepartmentName("");
      setDescription("");
      setErrors({});
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDone = () => {
    setShowSuccessModal(false);
    onClose(); // close modal and refresh department list
  };

  return (
    <>
      <div className={styles.modalOverlay}>
        <div className={styles.modalBody}>
          <div className={styles.close} onClick={onClose}>
            <img src={closeIcon} alt="Close Icon" width="32" height="32" />
          </div>
          <div className={styles.modalContainer}>
            <h2>Create Department</h2>
            <form className={styles.body} onSubmit={handleSubmit}>
              <div className={styles.details}>
                <div className={styles.section}>
                  <div className={styles.titleText}>
                    <label>Name of Department</label>
                    <input
                      type="text"
                      placeholder="Information Technology"
                      value={departmentName}
                      onChange={(e) => setDepartmentName(e.target.value)}
                    />
                    {errors.departmentName && (
                      <span className={styles.error}>
                        {errors.departmentName}
                      </span>
                    )}
                  </div>
                  <div className={styles.titleText}>
                    <label>Description:</label>
                    <input
                      type="text"
                      placeholder="Enter description"
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
                  title={isLoading ? "Creating..." : "Create Department"}
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
          title="Department created successfully"
          btnTitle="Done"
          btnOnclick={handleDone}
        />
      )}
    </>
  );
};

export default CreateDept;
