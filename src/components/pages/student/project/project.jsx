import React, { useEffect, useState } from "react";
import styles from "../student.module.css";
import ProjectTable from "../../../common/table/projectTable";
import Button from "../../../common/button/button";
import CreateProjectModal from "../../../modal/createProjectModal";
import Banner from "../../../common/banner/banner";
import { baseUrl } from "../../../context/baseUrl";
import { get } from "../../../context/api";

const Project = () => {
  const [showCreateProject, setShowCreateProject] = useState(false);
  const [user, setUser] = useState(null);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleCreateProject = () => {
    setShowCreateProject(true);
  };

  const handleCloseCreateProject = () => {
    setShowCreateProject(false);
  };

  const tableHeaders = [
    "Project Name",
    "Project Type",
    "Course Code",
    "Course Name",
    "Lecturer Name",
    "Status",
  ];

  // Format data to match the table columns
  const tableData = projects.map((project) => ({
    projectName: project.projectName || "N/A",
    projectType: project.projectType || "N/A",
    courseCode: project.courseCode || "N/A",
    courseName: project.courseName || "N/A",
    lecturerName: project.lecturerName || "N/A",
    status: project.status || "N/A",
  }));

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  useEffect(() => {
    if (!user) return;

    const fetchProjects = async () => {
      try {
        const data = await get(`${baseUrl}Projects/AllProjects`);
        setProjects(data || []);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, [user]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.banner}>
        <Banner title="Project" />
        <div className={styles.subBanner}>
          <Button
            title="Create Project"
            className="btnCreate"
            onClick={handleCreateProject}
          />
        </div>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p style={{ color: "red" }}>Error: {error}</p>
      ) : projects.length === 0 ? (
        <div style={{ textAlign: "center", marginTop: "2rem" }}>
          <p>No projects available.</p>
          <Button
            title="Create Project"
            className="btnCreate"
            onClick={handleCreateProject}
          />
        </div>
      ) : (
        <ProjectTable headers={tableHeaders} data={tableData} />
      )}

      {showCreateProject && (
        <CreateProjectModal onClose={handleCloseCreateProject} />
      )}
    </div>
  );
};

export default Project;
