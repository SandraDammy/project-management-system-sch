import React from "react";
import styles from "./exploreProject.module.css";
import ProjectCard from "../../common/card/projectCard";
import { useNavigate } from "react-router-dom";

const sampleProjects = [
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

const AllProjects = () => {
  const navigate = useNavigate();

  const handleViewMore = (project) => {
    const encodedTitle = encodeURIComponent(project.title);
    navigate(`/projects/${encodedTitle}`);
  };

  return (
    <div className={styles.grid}>
      {sampleProjects.map((project, index) => (
        <ProjectCard
          key={index}
          {...project}
          onViewMore={() => handleViewMore(project)}
        />
      ))}
    </div>
  );
};

export default AllProjects;
