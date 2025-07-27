import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styles from "../student.module.css";
import ActivityCard from "../../../section/activityCard/activityCard";
import BannerTitle from "../../../common/banner/bannerTitle";
import Button from "../../../common/button/button";
import ProjectActivityModal from "../../../modal/projectActivityModal";
import ViewActivityModal from "../../../modal/viewActivityModal";

const ProjectProfile = () => {
  const { projectId } = useParams();
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

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await fetch(`/api/projects/${projectId}`);
        const data = await response.json();
        setProjectData(data);
      } catch (error) {
        console.error("Error fetching project:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [projectId]);

  const dummyActivities = [
    {
      chapter: "Chapter One",
      title: "Introduction",
      description: "Overview of solar energy and its potential for sustainable development.",
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
    // ... more activities
  ];

  return (
    <div className={styles.wrapper}>
      <div className={styles.banner}>
        <BannerTitle title={projectData?.projectTitle || "Project Details"} />
        <div className={styles.subBanner}>
          <Button
            title={"Create Project Activity"}
            className={"btnCreate"}
            onClick={handleCreateProjectActivity}
          />
        </div>
      </div>

      <div className={styles.projectProfile}>
        <h2 className={styles.projectTitle}>Project Details</h2>
        <div className={styles.projectBody}>
          <p><strong>Session:</strong> {projectData?.session || "2024/2025"}</p>
          <p><strong>Semester:</strong> {projectData?.semester || "Second Semester"}</p>
          <p><strong>Course Name:</strong> {projectData?.courseName || "Project Design and Implementation"}</p>
          <p><strong>Course Code:</strong> {projectData?.courseCode || "EEE401"}</p>
          <p><strong>Lecturer's Name:</strong> {projectData?.supervisor || "Dr. Jane Smith"}</p>
          <p><strong>Project Type:</strong> {projectData?.projectType || "Final Year Project"}</p>
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
        <ViewActivityModal activity={showViewActivity} onClose={handleCloseViewModal} />
      )}
    </div>
  );
};

export default ProjectProfile;
