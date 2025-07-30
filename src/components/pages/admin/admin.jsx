import React, { useEffect, useState } from "react";
import styles from "./admin.module.css";
import { useNavigate } from "react-router-dom";
import ProjectCard from "../../common/card/projectCard";
import Input from "../../common/input/input";
import Select from "../../common/select/select";
import { baseUrl } from "../../context/baseUrl";
import { get } from "../../context/api";
import Loading from "../../common/loading/loading";
import ErrorMsg from "../../common/errorMsg/errorMsg";

const Admin = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState(true); // Temporary: should come from auth context
  const [faculties, setFaculties] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedFacultyId, setSelectedFacultyId] = useState("");

  const sampleProjects = [
    {
      title: "Design and Implementation of a Smart Solar System",
      faculty: "System Engineering",
      department: "Electrical Engineering",
      description: "A system to optimize solar power distribution for rural areas.",
    },
    {
      title: "Web-Based Hospital Management System",
      faculty: "System Engineering",
      department: "Computer Science",
      description: "Managing patients, appointments, and billing through a digital portal.",
    },
    {
      title: "Inventory System for Retail Stores",
      faculty: "Business",
      department: "Business Admin",
      description: "Track sales, inventory, and supplier records in real-time.",
    },
  ];

  useEffect(() => {
    if (!user) return;

    const fetchFaculties = async () => {
      try {
        const data = await get(`${baseUrl}Faculties/AllFaculties`);
        setFaculties(data || []);
      } catch (err) {
        setError(err.message || "Failed to fetch faculties");
      } finally {
        setLoading(false);
      }
    };

    fetchFaculties();
  }, [user]);

  const fetchDepartments = async (facultyId) => {
    setLoading(true);
    try {
      const data = await get(`${baseUrl}Departments/AllDepartments?facultyId=${facultyId}`);
      setDepartments(data || []);
    } catch (err) {
      setError(err.message || "Failed to fetch departments");
    } finally {
      setLoading(false);
    }
  };

  const handleFacultyChange = (e) => {
    const facultyId = e.target.value;
    setSelectedFacultyId(facultyId);
    if (facultyId) fetchDepartments(facultyId);
  };

  const handleViewMore = (project) => {
    const encodedTitle = encodeURIComponent(project.title);
    navigate(`/admin/${encodedTitle}`);
  };

  if (loading) return <Loading />;
  if (error) return <ErrorMsg error={error} message={error} />;

  return (
    <div className={styles.wrapper}>
      <div className={styles.wrapperTitle}>
        <Input placeholder="Search projects..." className="input" />
        <Select
          name="faculty"
          value={selectedFacultyId}
          onChange={handleFacultyChange}
          options={[
            { value: "", label: "Select Faculty" },
            ...faculties.map((fac) => ({ value: fac.id, label: fac.facultyName })),
          ]}
        />
        <Select
          name="department"
          options={[
            { value: "", label: "Select Department" },
            ...departments.map((dept) => ({ value: dept.id, label: dept.departmentName })),
          ]}
        />
      </div>

      <div className={styles.grid}>
        {sampleProjects.map((project, index) => (
          <ProjectCard
            key={index}
            {...project}
            onViewMore={() => handleViewMore(project)}
          />
        ))}
      </div>
    </div>
  );
};

export default Admin;
