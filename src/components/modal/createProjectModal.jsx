import React, { useEffect, useState } from "react";
import styles from "./modal.module.css";
import closeIcon from "../../Assets/Image/close.svg";
import Button from "../common/button/button";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import { get, post } from "../context/api";
import { baseUrl } from "../context/baseUrl";
import SuccessModal from "../modalMsg/successModal";

const CreateProjectModal = ({ onClose }) => {
  const [user, setUser] = useState(null);

  const [projectTitle, setProjectTitle] = useState("");
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

  const [faculties, setFaculties] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [lecturers, setLecturers] = useState([]);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  useEffect(() => {
    const fetchLecturers = async () => {
      try {
        const data = await get(`${baseUrl}Lecturers/AllLecturers`);
        setLecturers(data || []);
      } catch (error) {
        console.error("Failed to load lecturers", error);
      }
    };
    fetchLecturers();
  }, []);

  useEffect(() => {
    const fetchFaculties = async () => {
      try {
        const data = await get(`${baseUrl}Faculties/AllFaculties`);
        setFaculties(data || []);
      } catch (error) {
        console.error("Failed to load faculties", error);
      }
    };
    fetchFaculties();
  }, []);

  useEffect(() => {
    if (!facultyName) return;
    const fetchDepartments = async () => {
      try {
        const data = await get(`${baseUrl}Departments/AllDepartments?facultyId=${facultyName}`);
        setDepartments(data || []);
      } catch (error) {
        console.error("Failed to load departments", error);
      }
    };
    fetchDepartments();
  }, [facultyName]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const newErrors = {};

    if (!projectTitle) newErrors.projectTitle = "Project Title is required";
    if (!matricNo) newErrors.matricNo = "Registration No is required";
    if (!departmentName) newErrors.departmentName = "Department is required";
    if (!session) newErrors.session = "Session is required";
    if (!projectType) newErrors.projectType = "Project Type is required";
    if (!courseName) newErrors.courseName = "Course Name is required";
    if (!facultyName) newErrors.facultyName = "Faculty is required";
    if (!semester) newErrors.semester = "Semester is required";
    if (!lecturerId) newErrors.lecturerId = "Supervisor is required";
    if (!courseCode) newErrors.courseCode = "Course Code is required";
    if (!programme) newErrors.programme = "Programme is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setIsLoading(false);
      return;
    }

    const mainData = {
      ProjectTitle: projectTitle,
      StudentId: user?.id,
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
      await post(`${baseUrl}Projects/AddProject`, mainData);
      setShowSuccessModal(true);
      // Reset form
      setProjectTitle("");
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
                  placeholder="Enter Project Title"
                  value={projectTitle}
                  onChange={(e) => setProjectTitle(e.target.value)}
                  error={errors.projectTitle}
                />
                <InputField
                  label="Registration No"
                  placeholder="Enter Registration No"
                  value={matricNo}
                  onChange={(e) => setMatricNo(e.target.value)}
                  error={errors.matricNo}
                />
                <SelectField
                  label="Faculty"
                  value={facultyName}
                  onChange={(e) => setFacultyName(e.target.value)}
                  error={errors.facultyName}
                  options={faculties.map((f) => ({ value: f.id, label: f.facultyName }))}
                />
                <SelectField
                  label="Semester"
                  value={semester}
                  onChange={(e) => setSemester(e.target.value)}
                  options={["First Semester", "Second Semester"]}
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
                  placeholder="Student Name"
                  value={user ? `${user.firstName} ${user.lastName}` : ""}
                  disabled
                />
                <SelectField
                  label="Department"
                  value={departmentName}
                  onChange={(e) => setDepartmentName(e.target.value)}
                  error={errors.departmentName}
                  options={departments.map((d) => ({ value: d.id, label: d.departmentName }))}
                />
                <InputField
                  label="Course Name"
                  placeholder="Enter Course Name"
                  value={courseName}
                  onChange={(e) => setCourseName(e.target.value)}
                  error={errors.courseName}
                />
              </div>

              {/* Section 3 */}
              <div className={styles.section}>
                <SelectField
                  label="Lecturer Name"
                  value={lecturerId}
                  onChange={(e) => setLecturerId(e.target.value)}
                  error={errors.lecturerId}
                  options={lecturers.map((l) => ({ value: l.id, label: l.fullName }))}
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
                  label="Session"
                  placeholder="Enter Session (e.g., 2024/2025)"
                  value={session}
                  onChange={(e) => setSession(e.target.value)}
                  error={errors.session}
                />
                <InputField
                  label="Course Code"
                  placeholder="Enter Course Code (e.g., EEE401)"
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

const InputField = ({ label, value, onChange, placeholder, disabled, error }) => (
  <div className={styles.titleText}>
    <label>{label}{error && <span className={styles.error}>({error})</span>}</label>
    <input
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      disabled={disabled}
    />
    
  </div>
);

const SelectField = ({ label, value, onChange, options, error }) => (
  <div className={styles.titleText}>
    <label>{label}{error && <span className={styles.error}>({error})</span>}</label>
    <select value={value} onChange={onChange}>
      <option value="">Select {label}</option>
      {options.map((opt, i) =>
        typeof opt === "string" ? (
          <option key={i} value={opt.toLowerCase()}>{opt}</option>
        ) : (
          <option key={i} value={opt.value}>{opt.label}</option>
        )
      )}
    </select>
    
  </div>
);

export default CreateProjectModal;
