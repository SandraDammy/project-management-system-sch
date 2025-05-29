import React from "react";
import { useParams } from "react-router-dom";
import styles from "../teacher.module.css";
import Banner from "../../../common/banner/banner";

const ViewTeacherProject = () => {
  const { projectName } = useParams();

  const projectDetails = {
    author: "Jane Doe",
    department: "Mass Communication",
    program: "HND Mass Communication",
    supervisor: "Dr. Emmanuel Okoro",
    date: "April 22, 2025",
    projectType: "Research Project",
    description:
      "An in-depth research project on media ethics in modern journalism.",
    document: "https://drive.google.com/file/d/12345/view",
    presentationFile: "https://www.dropbox.com/s/sample/presentation.pptx?dl=0",
    image: "https://www.example.com/solar_intro.jpg",
    video: "https://www.example.com/chapter1_intro.mp4",
    music: "https://www.example.com/intro_theme.mp3",
    codeFile: "https://github.com/username/repo/archive/refs/heads/main.zip",
    link: "https://www.google.com",
  };

  const renderLink = (label, url) =>
    url ? (
      <div className={styles.titleText} key={label}>
        <p>{label}</p>
        <a href={url} target="_blank" rel="noopener noreferrer">
          View File
        </a>
      </div>
    ) : null;
  return (
    <div className={styles.wrapper}>
      <div className={styles.banner}>
        <Banner title={decodeURIComponent(projectName)} />
      </div>

      <div className={styles.projectProfile}>
        <h2 className={styles.projectTitle}>Project Details</h2>
        <div className={styles.projectBody}>
          <p>
            <strong>Project by:</strong> {projectDetails.author}
          </p>
          <p>
            <strong>Project Type:</strong> {projectDetails.projectType}
          </p>
          <p>
            <strong>Department:</strong> {projectDetails.department}
          </p>
          <p>
            <strong>Program:</strong> {projectDetails.program}
          </p>
          <p>
            <strong>Date:</strong> {projectDetails.date}
          </p>
          <p>
            <strong>Supervised by:</strong> {projectDetails.supervisor}
          </p>
        </div>
      </div>

      <div className={styles.projectFile}>
        <div className={styles.card}>
          <div className={styles.title}>Description</div>
          <div className={styles.textarea}>
            {(projectDetails.description?.split(" ").length > 100
              ? projectDetails.description.split(" ").slice(0, 100).join(" ") +
                "..."
              : projectDetails.description) || "No description provided."}
          </div>
        </div>

        <div className={styles.file}>
          {renderLink("Document (PDF)", projectDetails.document)}
          {renderLink("Code File", projectDetails.codeFile)}
          {renderLink("Project Reference Link", projectDetails.link)}
          {renderLink("Video", projectDetails.video)}
          {renderLink("Music", projectDetails.music)}
        </div>
      </div>
    </div>
  );
};

export default ViewTeacherProject;
