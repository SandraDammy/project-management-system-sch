import React, { useState } from "react";
import styles from "./modal.module.css";
import closeIcon from "../../Assets/Image/close.svg";
import Button from "../common/button/button";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const CreateProjectModal = ({ onClose }) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    projectTitle: "",
    studentName: "",
    department: "",
    session: "",
    projectType: "",
    courseName: "",
    faculty: "",
    semester: "",
    lectureName: "",
    courseCode: "",
    programme: "",
    registrationNo: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to submit form");
      }

      toast.success("Project submitted successfully!", {
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
          <h2>Create Project</h2>
          <form className={styles.body} onSubmit={handleSubmit}>
            <div className={styles.details}>
              <div className={styles.section}>
                <div className={styles.titleText}>
                  <label>Project Title:</label>
                  <input
                    type="text"
                    name="projectTitle"
                    placeholder="Enter your project title"
                    value={formData.projectTitle}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className={styles.titleText}>
                  <label>RegistrationNo:</label>
                  <input
                    type="text"
                    name="registrationNo"
                    placeholder="2345678109"
                    value={formData.registrationNo}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className={styles.titleText}>
                  <label>Department:</label>
                  <input
                    type="text"
                    name="department"
                    placeholder="Enter department"
                    value={formData.department}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className={styles.titleText}>
                  <label>Semester:</label>
                  <input
                    type="text"
                    name="semester"
                    placeholder="Enter semester"
                    value={formData.semester}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className={styles.section}>
                <div className={styles.titleText}>
                  <label>Project Type:</label>
                  <input
                    type="text"
                    name="projectType"
                    placeholder="Enter your project type"
                    value={formData.projectType}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className={styles.titleText}>
                  <label>Student Name:</label>
                  <input
                    type="text"
                    name="studentName"
                    placeholder="Enter your student name"
                    value={formData.studentName}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className={styles.titleText}>
                  <label>Faculty:</label>
                  <input
                    type="text"
                    name="faculty"
                    placeholder="Enter faculty"
                    value={formData.faculty}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className={styles.titleText}>
                  <label>Course Name:</label>
                  <input
                    type="text"
                    name="courseName"
                    placeholder="Enter your course name"
                    value={formData.courseName}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className={styles.section}>
                <div className={styles.titleText}>
                  <label>Lecturer Name:</label>
                  <input
                    type="text"
                    name="lectureName"
                    placeholder="Enter lecturer name"
                    value={formData.lectureName}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className={styles.titleText}>
                  <label>Session:</label>
                  <input
                    type="text"
                    name="session"
                    placeholder="2022/2023"
                    value={formData.session}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className={styles.titleText}>
                  <label>Programme:</label>
                  <input
                    type="text"
                    name="programme"
                    placeholder="Enter programme"
                    value={formData.programme}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className={styles.titleText}>
                  <label>Course Code:</label>
                  <input
                    type="text"
                    name="courseCode"
                    placeholder="Enter course code"
                    value={formData.courseCode}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
            </div>
            <div className={styles.btn}>
              <Button
                title={loading ? "Submitting..." : "Submit"}
                className="btnLarge"
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

export default CreateProjectModal;
