import React, { useEffect, useState } from "react";
import styles from "../lecturer.module.css";
import { useParams } from "react-router-dom";
import ActivityCard from "../../../section/activityCard/activityCard";
import ProjectCommitModal from "../../../modal/projectCommitModal";
import { baseUrl } from "../../../context/baseUrl";
import Loading from "../../../common/loading/loading";
import ErrorMsg from "../../../common/errorMsg/errorMsg";
import BannerTitle from "../../../common/banner/bannerTitle";
import empty from "../../../../Assets/Image/empty.png";
import { get } from "../../../context/api";
import Button from "../../../common/button/button";

const LecturerProjectProfile = () => {
  const { projectId } = useParams();
  const [projectData, setProjectData] = useState(null);
  const [projectsActivity, setProjectsActivity] = useState([]);

  const [showProjectCommit, setShowProjectCommit] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleProjectCommit = (activity) => {
    setShowProjectCommit(activity);
  };

  const handleCloseViewModal = () => {
    setShowProjectCommit(null);
  };

  const handlePostProject = () => {};

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

  //   const handlePost = async () => {
  //   try {
  //     // Example: update status to "posted"
  //     await post(`${baseUrl}/project/post`, { projectId: projectData?._id });

  //     setShowSuccessModal(false);

  //     // Optionally reload project or show a toast
  //     toast.success("Project successfully posted!");
  //     // Or trigger a data refetch here
  //   } catch (error) {
  //     console.error("Failed to post project:", error);
  //     toast.error("Something went wrong. Try again.");
  //   }
  // };

  if (loading) return <Loading />;

  if (error) return <ErrorMsg error={error} message={error} />;

  return (
    <div className={styles.wrapper}>
      <div className={styles.banner}>
        <BannerTitle
          title={projectData?.projectTitle || "Project Details"}
          href={`/lecturer/project`}
        />

        <div className={styles.subBanner}>
          {projectData?.projectStatus === "Approve" && (
            <Button
              title="Post Project"
              className="btnCreate"
              onClick={handlePostProject}
            />
          )}
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
            <strong>Student Name:</strong>
            {projectData?.studentName}
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
        </div>
      ) : (
        projectsActivity.map((activity, index) => (
          <ActivityCard
            key={index}
            activity={activity}
            onView={() => handleProjectCommit(activity)}
          />
        ))
      )}

      {showProjectCommit && (
        <ProjectCommitModal
          activity={showProjectCommit}
          onClose={handleCloseViewModal}
        />
      )}
    </div>
  );
};

export default LecturerProjectProfile;
