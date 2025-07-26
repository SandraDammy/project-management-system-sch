import React from "react";
import styles from "../lecturer.module.css";
import Banner from "../../../common/banner/banner";
import LecturerProjectTable from "../../../common/table/lecturerProjectTable";

const LecturerProject = () => {
    const tableHeaders = [
    "Project Name",
    "Project Type",
    "Course Code",
    "Course Name",
    "Student Name",
    "Status",
  ];

   const tableData = [
    {
      projectName: "Smart Solar System",
      projectType: "Final Year Project",
      courseCode: "EEE404",
      courseName: "Power Systems",
      studentName: "Adebayo Yemi",
      projectStatus: "Approved",
    },
    {
      projectName: "AI Tutor",
      projectType: "Class Project",
      courseCode: "CSE503",
      courseName: "Artificial Intelligence",
      studentName: "Obi Johnson",
      projectStatus: "Review",
    },
    {
      projectName: "Mobile Attendance",
      projectType: "Final Year Project",
      courseCode: "CSC401",
      courseName: "Mobile Computing",
      studentName: "Ali Yusuf",
      projectStatus: "Pending",
    },
  ];

  return (
    <div className={styles.wrapper}>
      <div className={styles.banner}>
        <Banner title={"Project"} />
      </div>

      <LecturerProjectTable headers={tableHeaders} data={tableData}/>
    </div>
  );
};

export default LecturerProject;
