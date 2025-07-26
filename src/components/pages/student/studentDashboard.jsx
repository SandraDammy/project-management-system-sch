import React, { useEffect, useState } from "react";
import Banner from "../../common/banner/banner";
import styles from "./student.module.css";
import { useNavigate } from "react-router-dom";
import ProjectCard from "../../common/card/projectCard";
import { baseUrl } from "../../context/baseUrl";
import { get } from "../../context/api";

const sampleProjects = [
  {
    title: "Design and Implementation of a Smart Solar System",
    department: "Electrical Engineering",
    description:
      "A system to optimize solar power distribution for rural areas.",
  },
  {
    title: "Inventory System for Retail Stores",
    department: "Business Admin",
    description: "Track sales, inventory, and supplier records in real-time.",
  },
  {
    title: "Design and Implementation of a Smart Solar System",
    department: "Electrical Engineering",
    description:
      "A system to optimize solar power distribution for rural areas.",
  },
  {
    title: "Web-Based Hospital Management System",
    department: "Computer Science",
    description:
      "Managing patients, appointments, and billing through a digital portal.",
  },

  {
    title: "Inventory System for Retail Stores",
    department: "Business Admin",
    description: "Track sales, inventory, and supplier records in real-time.",
  },
];

const StudentDashboard = () => {
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
          `${baseUrl}Projects/AllProjects/AllStudentCompletedProject?studentId=${user.id}`
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
    navigate(`/student/${encodedTitle}`);
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
          {sampleProjects.map((project, index) => (
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
