import React, { useEffect, useState } from "react";
import Banner from "../../common/banner/banner";
import styles from "./student.module.css";
import { useNavigate } from "react-router-dom";
import ProjectCard from "../../common/card/projectCard";
import { baseUrl } from "../../context/baseUrl";
import { get } from "../../context/api";
import empty from "../../../Assets/Image/empty.png";
import ErrorMsg from "../../common/errorMsg/errorMsg";
import Loading from "../../common/loading/loading";

const StudentDashboard = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [projects, setProjects] = useState([]);
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  // Get user from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // Fetch projects when user is loaded
  useEffect(() => {
    if (!user?.id) return;

    const fetchProjects = async () => {
      try {
        const data = await get(
          `${baseUrl}Projects/AllProjects/AllStudentCompletedProject?studentId=${user.id}`
        );
        setProjects(data || []);
      } catch (err) {
        setError("Failed to fetch projects.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, [user]);

  const handleViewMore = (project) => {
    const encodedTitle = encodeURIComponent(project.title);
    navigate(`/student/${encodedTitle}`);
  };

  if (loading) return <Loading />;

  if (error) return <ErrorMsg error={error} message={error} />;

  return (
    <div className={styles.wrapper}>
      <div className={styles.banner}>
        <Banner title="Dashboard" />
      </div>

      {projects.length === 0 ? (
        <div className={styles.emptyTable}>
          <img src={empty} alt="No Projects" className={styles.icon} />
          <p>No Project found.</p>
        </div>
      ) : (
        <div className={styles.grid}>
          {projects.map((project, index) => (
            <ProjectCard
              key={index}
              {...project}
              onViewMore={() => handleViewMore(project)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default StudentDashboard;
