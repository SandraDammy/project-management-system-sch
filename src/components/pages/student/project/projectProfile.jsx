import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styles from "../student.module.css";
import ActivityCard from "../../../section/activityCard/activityCard";
import BannerTitle from "../../../common/banner/bannerTitle";
import Button from "../../../common/button/button";
import ProjectActivityModal from "../../../modal/projectActivityModal";
import ViewActivityModal from "../../../modal/viewActivityModal";

const ProjectProfile = () => {
  const { projectName } = useParams();
  const navigate = useNavigate();
  const [projectData, setProjectData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showProjectActivity, setShowProjectActivity] = useState(false);
  const [showViewActivity, setShowViewActivity] = useState(null);

  const handleCreateProjectActivity = () => {
    setShowProjectActivity(true);
  };

  const handleCloseCreateProjectActivity = () => {
    setShowProjectActivity(false);
  };

  const handleViewActivity = (activity) => {
    setShowViewActivity(activity);
  };

  const handleCloseViewModal = () => {
    setShowViewActivity(null);
  };

  //   useEffect(() => {
  //     const fetchProject = async () => {
  //       try {
  //         const response = await fetch(`/api/projects/${projectName}`);
  //         const data = await response.json();
  //         setProjectData(data);
  //       } catch (error) {
  //         console.error("Error fetching project:", error);
  //       } finally {
  //         setLoading(false);
  //       }
  //     };

  //     fetchProject();
  //   }, [projectName]);

  // Default project information for development/testing

  const defaultProject = {
    projectTitle: decodeURIComponent(projectName || "Smart Solar System"),
    studentName: "James Fa",
    department: "Electrical and Electronics Engineering",
    session: "2024/2025",
    projectType: "Final Year Project",
    courseName: "Project Design and Implementation",
    faculty: "Engineering",
    semester: "Second Semester",
    supervisor: "Dr. Jane Smith",
    courseCode: "EEE401",
    programme: "B.Eng Electrical/Electronics Engineering",
  };

  // Dummy from create project activity
  const dummyActivities = [
    {
      chapter: "Chapter One",
      title: "Introduction",
      description:
        "Overview of solar energy and its potential for sustainable development.",
      commit: "Initial draft completed",
      uploadedBy: "James Fa",
      date: "2025-05-10",
      document: "chapter1.pdf",
      presentationFile: "chapter1_presentation.pptx",
      image: "solar_intro.jpg",
      video: "chapter1_intro.mp4",
      music: "intro_theme.mp3",
      codeFile: "intro_code.zip",
      link: "https://www.google.com",
    },
    {
      chapter: "Chapter Two",
      title: "Literature Review",
      description:
        "Reviewed scholarly articles on smart grid systems and energy efficiency.",
      commit: "Second update",
      uploadedBy: "James Fa",
      date: "2025-05-17",
      document: "chapter2.pdf",
      presentationFile: "literature_review.pptx",
      image: "review_chart.png",
      video: "review_discussion.mp4",
      link: "https://drive.google.com/file/d/12345/view",
    },
    {
      chapter: "Chapter Three",
      title: "Implementation and Testing",
      description:
        "Describes the coding process, test cases, and evaluation of the prototype.",
      commit: "Implemented real-time data logging and output display",
      uploadedBy: "James Fa",
      date: "2025-05-24",
      document: "chapter3.pdf",
      codeFile: "implementation_code.zip",
      video: "testing_demo.mp4",
      music: "test_results.mp3",
    },
  ];
  return (
    <div className={styles.wrapper}>
      <div className={styles.banner}>
        <BannerTitle title={decodeURIComponent(projectName)} />
        <div className={styles.subBanner}>
          <Button
            title={"Create Project Activity"}
            className={"btnCreate"}
            onClick={handleCreateProjectActivity}
          />
        </div>
      </div>

      {/* <div className={styles.projectProfile}>
        {loading ? (
          <p>Loading project...</p>
        ) : projectData ? (
          <div>
            <h2>Project Details</h2>
            <p><strong>Supervisor:</strong> {projectData.supervisor}</p>
            <p><strong>Year:</strong> {projectData.year}</p>
            <p><strong>Team Members:</strong> {projectData.teamMembers.join(", ")}</p>
          </div>
        ) : (
          <p>Project not found.</p>
        )}
      </div> */}

      <div className={styles.projectProfile}>
        <h2 className={styles.projectTitle}>Project Details</h2>
        <div className={styles.projectBody}>
          <p>
            <strong>Session:</strong> {defaultProject.session}
          </p>
          <p>
            <strong>Semester:</strong> {defaultProject.semester}
          </p>
          <p>
            <strong>Course Name:</strong> {defaultProject.courseName}
          </p>
          <p>
            <strong>Course Code:</strong> {defaultProject.courseCode}
          </p>
          <p>
            <strong>Lecturer's Name:</strong> {defaultProject.supervisor}
          </p>
          <p>
            <strong>Project Type:</strong> {defaultProject.projectType}
          </p>
        </div>
      </div>

      {dummyActivities.map((activity, index) => (
        <ActivityCard
          key={index}
          activity={activity}
          onView={handleViewActivity}
        />
      ))}

      {showProjectActivity && (
        <ProjectActivityModal onClose={handleCloseCreateProjectActivity} />
      )}

      {showViewActivity && (
        <ViewActivityModal
          activity={showViewActivity}
          onClose={handleCloseViewModal}
        />
      )}
    </div>
  );
};

export default ProjectProfile;
