import React, { useEffect, useState } from "react";
import styles from "./lecturer.module.css";
import Banner from "../../common/banner/banner";
import ProjectCard from "../../common/card/projectCard";
import { useNavigate } from "react-router-dom";
import { baseUrl } from "../../context/baseUrl";
import { get } from "../../context/api";

const LecturerDashboard = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [projects, setProjects] = useState([]);
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  useEffect(() => {
    if (!user?.id) return;

    const fetchProjects = async () => {
      try {
        const data = await get(
          `${baseUrl}Projects/AllProjects/AllLecturerCompletedProject?lecturerId=${user.id}`
        );
        setProjects(data || []);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, [user]);

  const handleViewMore = (project) => {
    const encodedTitle = encodeURIComponent(project.title);
    navigate(`/lecturer/${encodedTitle}`);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.banner}>
        <Banner title={"Dashboard"} />
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className={styles.errorText}>Error: {error.toString()}</p>
      ) : projects.length === 0 ? (
        <div className={styles.emptyState}>
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

export default LecturerDashboard;
