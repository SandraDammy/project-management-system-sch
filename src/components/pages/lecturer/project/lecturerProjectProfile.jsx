import React, { useState } from "react";
import styles from "../lecturer.module.css";
import Banner from "../../../common/banner/banner";
import { useParams } from "react-router-dom";
import ActivityCard from "../../../section/activityCard/activityCard";
import ProjectCommitModal from "../../../modal/projectCommitModal";

const LecturerProjectProfile = () => {
  const { projectName } = useParams();
  const [showProjectCommit, setShowProjectCommit] = useState(null);

  const handleProjectCommit = (activity) => {
    setShowProjectCommit(activity);
  };

  const handleCloseViewModal = () => {
    setShowProjectCommit(null);
  };

  const defaultProject = {
    projectTitle: decodeURIComponent(projectName || "Smart Solar System"),
    studentName: "James Fa",
    registrationNo: "1234567",
    department: "Electrical and Electronics Engineering",
    session: "2024/2025",
    projectType: "Final Year Project",
    courseName: "Project Design and Implementation",
    faculty: "Engineering",
    semester: "Second Semester",
    courseCode: "EEE401",
    programme: "B.Eng Electrical/Electronics Engineering",
  };

  const dummyActivities = [
    {
      chapter: "Chapter One",
      title: "Introduction",
      description: "Overview of solar energy and its potential for sustainable development.",
      commit: "Initial draft completed",
      uploadedBy: "James Fa",
      date: "2025-05-10",
      link: ["ref1.pdf", "ref2.pdf"],
    },
    {
      chapter: "Chapter Two",
      title: "Literature Review",
      description: "Reviewed scholarly articles on smart grid systems and energy efficiency.",
      commit: "Second update",
      uploadedBy: "James Fa",
      date: "2025-05-17",
      link: ["ref3.pdf"],
    },
    {
      chapter: "Chapter Three",
      title: "Implementation and Testing",
      description: "Describes the coding process, test cases, and evaluation of the prototype.",
      commit: "Implemented real-time data logging and output display",
    },
  ];

  return (
    <div className={styles.wrapper}>
      <div className={styles.banner}>
        <Banner title={decodeURIComponent(projectName)} />
      </div>

      <div className={styles.projectProfile}>
        <h2 className={styles.projectTitle}>Project Details</h2>
        <div className={styles.projectBody}>
          <p><strong>Session:</strong> {defaultProject.session}</p>
          <p><strong>Semester:</strong> {defaultProject.semester}</p>
          <p><strong>Course Name:</strong> {defaultProject.courseName}</p>
          <p><strong>Course Code:</strong> {defaultProject.courseCode}</p>
          <p><strong>Student Name:</strong> {defaultProject.studentName}</p>
          <p><strong>Registration No:</strong> {defaultProject.registrationNo}</p>
          <p><strong>Project Type:</strong> {defaultProject.projectType}</p>
        </div>
      </div>

      {dummyActivities.map((activity, index) => (
        <ActivityCard key={index} activity={activity} onView={handleProjectCommit} />
      ))}

      {showProjectCommit && (
        <ProjectCommitModal activity={showProjectCommit} onClose={handleCloseViewModal} />
      )}
    </div>
  );
};

export default LecturerProjectProfile;
