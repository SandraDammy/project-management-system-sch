import React, { useState } from "react";
import styles from "../student.module.css";
import ProjectTable from "../../../common/table/projectTable";
import BannerTitle from "../../../common/banner/bannerTitle";
import Button from "../../../common/button/button";
import CreateProjectModal from "../../../modal/createProjectModal";

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
      projectType: "Single",
      courseCode: "EEE404",
      courseName: "Power Systems",
      lecturerName: "Dr. Adebayo",
      activityStatus: "Approved",
    },
    {
      projectName: "AI Tutor",
      projectType: "Group",
      courseCode: "CSE503",
      courseName: "Artificial Intelligence",
      lecturerName: "Prof. Johnson",
      activityStatus: "Review",
    },
    {
      projectName: "Mobile Attendance",
      projectType: "Single",
      courseCode: "CSC401",
      courseName: "Mobile Computing",
      lecturerName: "Dr. Yusuf",
      activityStatus: "Pending",
    },
  ];

  return (
    <div className={styles.wrapper}>
      <div className={styles.banner}>
        <BannerTitle title={"Project"} />
        <div className={styles.subBanner}>
          <Button
            title={"Create Project"}
            className={"btnWhite"}
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
