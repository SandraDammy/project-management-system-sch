import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "../student.module.css";
import ActivityCard from "../../../section/activityCard/activityCard";
import BannerTitle from "../../../common/banner/bannerTitle";
import Button from "../../../common/button/button";
import ProjectActivityModal from "../../../modal/projectActivityModal";
import ViewActivityModal from "../../../modal/viewActivityModal";
import { get } from "../../../context/api";
import { baseUrl } from "../../../context/baseUrl";
import empty from "../../../../Assets/Image/empty.png";
import Loading from "../../../common/loading/loading";
import ErrorMsg from "../../../common/errorMsg/errorMsg";

const ProjectProfile = () => {
  const { projectId } = useParams();
  const [projectData, setProjectData] = useState(null);
  const [projectsActivity, setProjectsActivity] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
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
    if (!projectId) return;

    const fetchProject = async () => {
      try {
        const response = await fetch(`${baseUrl}projects/${projectId}`);
        const data = await response.json();
        setProjectData(data);
      } catch (error) {
        console.error("Error fetching project:", error);
        setError("Failed to load project details.");
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [projectId]);

  useEffect(() => {
    if (!projectData?.id) return;

    const fetchActivities = async () => {
      try {
        const data = await get(
          `${baseUrl}ProjectActivities/AllProjectActivities/${projectData.id}`
        );
        setProjectsActivity(data || []);
      } catch (err) {
        console.error("Error fetching activities:", err);
        setError("Failed to load project activities.");
      } finally {
        setLoading(false);
      }
    };

    fetchActivities();
  }, [projectData]);

  if (loading) return <Loading />;

  if (error) return <ErrorMsg error={error} message={error} />;

  return (
    <div className={styles.wrapper}>
      <div className={styles.banner}>
        <BannerTitle
          title={projectData?.projectTitle || "Project Details"}
          href={`/student/project`}
        />

        <div className={styles.subBanner}>
          <Button
            title="Create Project Activity"
            className="btnCreate"
            onClick={handleCreateProjectActivity}
          />
        </div>
      </div>

      <div className={styles.projectProfile}>
        <h2 className={styles.projectTitle}>Project Details</h2>
        <div className={styles.projectBody}>
          <p>
            <strong>Session:</strong>
            {projectData?.session}
          </p>
          <p>
            <strong>Semester:</strong>
            {projectData?.semester}
          </p>
          <p>
            <strong>Course Name:</strong>
            {projectData?.courseName}
          </p>
          <p>
            <strong>Course Code:</strong> {projectData?.courseCode}
          </p>
          <p>
            <strong>Lecturer's Name:</strong>
            {projectData?.lecturerName}
          </p>
          <p>
            <strong>Project Type:</strong>
            {projectData?.projectType}
          </p>
        </div>
      </div>

      {projectsActivity.length === 0 ? (
        <div className={styles.emptyState}>
          <img src={empty} alt="arrowBack" className={styles.icon} />
          <p>No activities available.</p>
          <Button
            title="Add Project Activity"
            className="createEmptyState"
            onClick={handleCreateProjectActivity}
          />
        </div>
      ) : (
        projectsActivity.map((activity, index) => (
          <ActivityCard
            key={index}
            activity={activity}
            onView={() => handleViewActivity(activity)}
          />
        ))
      )}

      {showProjectActivity && (
        <ProjectActivityModal
          onClose={handleCloseCreateProjectActivity}
          projectId={projectId}
          projectTitle={projectData?.projectTitle}
        />
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
