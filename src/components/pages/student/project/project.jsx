import React, { useEffect, useState } from "react";
import styles from "../student.module.css";
import ProjectTable from "../../../common/table/projectTable";
import Button from "../../../common/button/button";
import CreateProjectModal from "../../../modal/createProjectModal";
import Banner from "../../../common/banner/banner";
import { baseUrl } from "../../../context/baseUrl";
import { get } from "../../../context/api";
import empty from "../../../../Assets/Image/empty.png";
import Loading from "../../../common/loading/loading";
import ErrorMsg from "../../../common/errorMsg/errorMsg";

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

  const headers = [
    "Project Title",
    "Project Type",
    "Course Code",
    "Course Name",
    "Lecturer Name",
    "Status",
  ];

  const formatProjectData = (projectsArray) =>
    projectsArray.map((project) => ({
      projectId: project.id,
      projectTitle: project.projectTitle || "N/A",
      projectType: project.projectType || "N/A",
      courseCode: project.courseCode || "N/A",
      courseName: project.courseName || "N/A",
      lecturerName: project.lecturerName || "N/A",
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
          `${baseUrl}Projects/AllProjects/AllStudentProject?studentId=${user.id}`
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
        <Banner title="Project" />
        <div className={styles.subBanner}>
          <Button
            title="Create Project"
            className="btnCreate"
            onClick={handleCreateProject}
          />
        </div>
      </div>

      {projects.length === 0 ? (
        <div className={styles.emptyTable}>
          <img src={empty} alt="arrowBack" className={styles.icon} />
          <p>No projects available.</p>
          <Button
            title="Create Project"
            className="createEmptyState"
            onClick={handleCreateProject}
          />
        </div>
      ) : (
        <ProjectTable headers={headers} data={projects} />
      )}

      {showCreateProject && (
        <CreateProjectModal onClose={handleCloseCreateProject} />
      )}
    </div>
  );
};

export default Project;
