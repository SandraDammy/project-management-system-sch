import React, { useState } from "react";
import styles from "./modal.module.css";
import closeIcon from "../../Assets/Image/close.svg";
import Button from "../common/button/button";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { post } from "../context/api";
import { baseUrl } from "../context/baseUrl";
import SuccessModal from "../modalMsg/successModal";

const CreateProjectModal = ({ onClose }) => {
  const navigate = useNavigate();

  const [projectTitle, setProjectTitle] = useState("");
  const [studentId, setStudentId] = useState("");
  const [departmentName, setDepartmentName] = useState("");
  const [session, setSession] = useState("");
  const [projectType, setProjectType] = useState("");
  const [courseName, setCourseName] = useState("");
  const [facultyName, setFacultyName] = useState("");
  const [semester, setSemester] = useState("");
  const [lecturerId, setLecturerId] = useState("");
  const [courseCode, setCourseCode] = useState("");
  const [programme, setProgramme] = useState("");
  const [matricNo, setMatricNo] = useState("");

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    const newErrors = {};

    if (!projectTitle) newErrors.projectTitle = "Project Title is required";
    if (!studentId) newErrors.studentId = "Student Name is required";
    if (!departmentName) newErrors.departmentName = "Department is required";
    if (!session) newErrors.session = "Session is required";
    if (!projectType) newErrors.projectType = "Project Type is required";
    if (!courseName) newErrors.courseName = "Course Name is required";
    if (!facultyName) newErrors.facultyName = "Faculty is required";
    if (!semester) newErrors.semester = "Semester is required";
    if (!lecturerId) newErrors.lecturerId = "Supervisor is required";
    if (!courseCode) newErrors.courseCode = "Course Code is required";
    if (!programme) newErrors.programme = "Programme is required";
    if (!matricNo) newErrors.matricNo = "Registration No is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setIsLoading(false);
      return;
    }

    const mainData = {
      ProjectTitle: projectTitle,
      StudentId: studentId,
      DepartmentName: departmentName,
      Session: session,
      ProjectType: projectType,
      CourseName: courseName,
      FacultyName: facultyName,
      Semester: semester,
      LecturerId: lecturerId,
      CourseCode: courseCode,
      Programme: programme,
      MatricNo: matricNo,
    };

    try {
      const response = await post(`${baseUrl}Projects/AddProject`, mainData);
      console.log("Response:", response.data);
      setShowSuccessModal(true);
      // Reset all fields
      setProjectTitle("");
      setStudentId("");
      setDepartmentName("");
      setSession("");
      setProjectType("");
      setCourseName("");
      setFacultyName("");
      setSemester("");
      setLecturerId("");
      setCourseCode("");
      setProgramme("");
      setMatricNo("");
      setErrors({});
    } catch (error) {
      console.error("Error:", error);
      toast.error("Something went wrong. Please try again.");
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
          <h2>Create Project</h2>
          <form className={styles.body} onSubmit={handleSubmit}>
            <div className={styles.details}>
              {/* Section 1 */}
              <div className={styles.section}>
                <InputField
                  label="Project Title"
                  value={projectTitle}
                  onChange={(e) => setProjectTitle(e.target.value)}
                  error={errors.projectTitle}
                />
                <InputField
                  label="Registration No"
                  value={matricNo}
                  onChange={(e) => setMatricNo(e.target.value)}
                  error={errors.matricNo}
                />
                <InputField
                  label="Department"
                  value={departmentName}
                  onChange={(e) => setDepartmentName(e.target.value)}
                  error={errors.departmentName}
                />
                <InputField
                  label="Semester"
                  value={semester}
                  onChange={(e) => setSemester(e.target.value)}
                  error={errors.semester}
                />
              </div>

              {/* Section 2 */}
              <div className={styles.section}>
                <SelectField
                  label="Project Type"
                  value={projectType}
                  onChange={(e) => setProjectType(e.target.value)}
                  options={[
                    "Research Project",
                    "Design & Implementation",
                    "Case Study",
                    "Software Development",
                    "Hardware-Based Project",
                    "Thesis / Dissertation",
                    "Final Year Project",
                    "Field Work / Industrial Training Report",
                  ]}
                  error={errors.projectType}
                />
                <InputField
                  label="Student Name"
                  value={studentId}
                  onChange={(e) => setStudentId(e.target.value)}
                  error={errors.studentId}
                />
                <InputField
                  label="Faculty"
                  value={facultyName}
                  onChange={(e) => setFacultyName(e.target.value)}
                  error={errors.facultyName}
                />
                <InputField
                  label="Course Name"
                  value={courseName}
                  onChange={(e) => setCourseName(e.target.value)}
                  error={errors.courseName}
                />
              </div>

              {/* Section 3 */}
              <div className={styles.section}>
                <InputField
                  label="Lecturer Name"
                  value={lecturerId}
                  onChange={(e) => setLecturerId(e.target.value)}
                  error={errors.lecturerId}
                />
                <InputField
                  label="Session"
                  value={session}
                  onChange={(e) => setSession(e.target.value)}
                  error={errors.session}
                />
                <SelectField
                  label="Programme"
                  value={programme}
                  onChange={(e) => setProgramme(e.target.value)}
                  options={[
                    "B.Sc. – Bachelor of Science",
                    "B.A. – Bachelor of Arts",
                    "B.Eng. – Bachelor of Engineering",
                    "B.Tech. – Bachelor of Technology",
                    "B.Ed. – Bachelor of Education",
                    "LLB – Bachelor of Law",
                    "HND – Higher National Diploma",
                    "ND – National Diploma",
                    "M.Sc. – Master of Science",
                    "M.A. – Master of Arts",
                    "M.Eng. – Master of Engineering",
                    "MBA – Master of Business Administration",
                    "Ph.D. – Doctor of Philosophy",
                    "PGD – Postgraduate Diploma",
                    "NCE – Nigeria Certificate in Education",
                    "Foundation / Pre-degree",
                  ]}
                  error={errors.programme}
                />
                <InputField
                  label="Course Code"
                  value={courseCode}
                  onChange={(e) => setCourseCode(e.target.value)}
                  error={errors.courseCode}
                />
              </div>
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
          title="Project created successfully"
          btnTitle="Done"
          btnOnclick={() => (window.location.href = "/student/project")}
        />
      )}
    </div>
  );
};

// Reusable input field
const InputField = ({ label, value, onChange, error }) => (
  <div className={styles.titleText}>
    <label>{label}:</label>
    <input type="text" value={value} onChange={onChange} />
    {error && <span className={styles.error}>{error}</span>}
  </div>
);

// Reusable select field
const SelectField = ({ label, value, onChange, options, error }) => (
  <div className={styles.titleText}>
    <label>{label}:</label>
    <select value={value} onChange={onChange}>
      <option value="">Select {label}</option>
      {options.map((option, i) => (
        <option key={i} value={option.split("–")[0].trim().toLowerCase()}>
          {option}
        </option>
      ))}
    </select>
    {error && <span className={styles.error}>{error}</span>}
  </div>
);

export default CreateProjectModal;
