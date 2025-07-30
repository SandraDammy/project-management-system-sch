import React, { useEffect, useState } from "react";
import styles from "../lecturer.module.css";
import Banner from "../../../common/banner/banner";
import LecturerProjectTable from "../../../common/table/lecturerProjectTable";
import { get } from "../../../context/api";
import { baseUrl } from "../../../context/baseUrl";
import Loading from "../../../common/loading/loading";
import ErrorMsg from "../../../common/errorMsg/errorMsg";
import empty from "../../../../Assets/Image/empty.png";

const LecturerProject = () => {
  const [user, setUser] = useState(null);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const headers = [
    "Project Title",
    "Project Type",
    "Course Code",
    "Course Name",
    "Student Name",
    "Status",
  ];

  const formatProjectData = (projectsArray) =>
    projectsArray.map((project) => ({
      projectId: project.id,
      projectTitle: project.projectTitle || "N/A",
      projectType: project.projectType || "N/A",
      courseCode: project.courseCode || "N/A",
      courseName: project.courseName || "N/A",
      studentName: project.studentName || "N/A",
      projectStatus: project.projectStatus || "N/A",
    }));

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
        setError("Something went wrong.");
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, [user]);

  if (loading) return <Loading />;

  if (error) return <ErrorMsg error={error} message={error} />;

  return (
    <div className={styles.wrapper}>
      <div className={styles.banner}>
        <Banner title={"Project"} />
      </div>

      {projects.length === 0 ? (
        <div className={styles.emptyTable}>
          <img src={empty} alt="arrowBack" className={styles.icon} />
          <p>No projects available.</p>
        </div>
      ) : (
        <LecturerProjectTable headers={headers} data={projects} />
      )}
    </div>
  );
};

export default LecturerProject;
