import React, { useState } from "react";
import styles from "../student.module.css";
import ProjectTable from "../../../common/table/projectTable";
import Button from "../../../common/button/button";
import CreateProjectModal from "../../../modal/createProjectModal";
import Banner from "../../../common/banner/banner";

const Project = () => {
  const [showCreateProject, setShowCreateProject] = useState(false);

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

  const tableData = [
    {
      projectName: "Smart Solar System",
      projectType: "Final Year Project",
      courseCode: "EEE404",
      courseName: "Power Systems",
      lecturerName: "Dr. Adebayo",
      projectStatus: "Approved",
    },
    {
      projectName: "AI Tutor",
      projectType: "Class Project",
      courseCode: "CSE503",
      courseName: "Artificial Intelligence",
      lecturerName: "Prof. Johnson",
      projectStatus: "Review",
    },
    {
      projectName: "Mobile Attendance",
      projectType: "Final Year Project",
      courseCode: "CSC401",
      courseName: "Mobile Computing",
      lecturerName: "Dr. Yusuf",
      projectStatus: "Pending",
    },
  ];

  return (
    <div className={styles.wrapper}>
      <div className={styles.banner}>
        <Banner title={"Project"} />
        <div className={styles.subBanner}>
          <Button
            title={"Create Project"}
            className={"btnCreate"}
            onClick={handleCreateProject}
          />
        </div>
      </div>

      <ProjectTable headers={tableHeaders} data={tableData} />

      {showCreateProject && (
        <CreateProjectModal onClose={handleCloseCreateProject} />
      )}
    </div>
  );
};

export default Project;
