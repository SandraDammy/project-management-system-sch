import React, { useEffect, useState } from "react";
import styles from "../lecturer.module.css";
import Banner from "../../../common/banner/banner";
import LecturerProjectTable from "../../../common/table/lecturerProjectTable";
import { get } from "../../../context/api";
import { baseUrl } from "../../../context/baseUrl";

const LecturerProject = () => {
  const [user, setUser] = useState(null);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const headers = [
    "Project Name",
    "Project Type",
    "Course Code",
    "Course Name",
    "Student Name",
    "Status",
  ];

  const formatProjectData = (projectsArray) =>
    projectsArray.map((project) => ({
      "Project Name": project.projectName || "N/A",
      "Project Type": project.projectType || "N/A",
      "Course Code": project.courseCode || "N/A",
      "Course Name": project.courseName || "N/A",
      "Student Name": project.studentName || "N/A",
      Status: project.status || "N/A",
    }));

  //  const tableData = [
  //   {
  //     projectName: "Smart Solar System",
  //     projectType: "Final Year Project",
  //     courseCode: "EEE404",
  //     courseName: "Power Systems",
  //     studentName: "Adebayo Yemi",
  //     projectStatus: "Approved",
  //   },
  //   {
  //     projectName: "AI Tutor",
  //     projectType: "Class Project",
  //     courseCode: "CSE503",
  //     courseName: "Artificial Intelligence",
  //     studentName: "Obi Johnson",
  //     projectStatus: "Review",
  //   },
  //   {
  //     projectName: "Mobile Attendance",
  //     projectType: "Final Year Project",
  //     courseCode: "CSC401",
  //     courseName: "Mobile Computing",
  //     studentName: "Ali Yusuf",
  //     projectStatus: "Pending",
  //   },
  // ];
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  useEffect(() => {
    if (!user?.id) return;

    const fetchProjects = async () => {
      try {
        const data = await get(
          `${baseUrl}Projects/AllProjects/AllLecturerProject?lecturerId=${user.id}`
        );
        setProjects(formatProjectData(data || []));
      } catch (err) {
        setError(err.message || "Something went wrong.");
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, [user]);
  return (
    <div className={styles.wrapper}>
      <div className={styles.banner}>
        <Banner title={"Project"} />
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p style={{ color: "red" }}>Error: {error}</p>
      ) : projects.length === 0 ? (
        <div style={{ textAlign: "center", marginTop: "2rem" }}>
          <p>No projects available.</p>
        </div>
      ) : (
        <LecturerProjectTable headers={headers} data={projects} />
      )}
    </div>
  );
};

export default LecturerProject;
