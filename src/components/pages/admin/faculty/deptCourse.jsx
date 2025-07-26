import React, { useEffect, useState } from "react";
import styles from "../admin.module.css";
import FacultyCard from "../../../common/card/facultyCard";
import { baseUrl } from "../../../context/baseUrl";
import { get } from "../../../context/api";
import { useParams, useLocation, Link } from "react-router-dom";
import CreateFaculty from "../../../modal/createFaculty";
import Button from "../../../common/button/button";
import Dashboard from "../../../../Assets/Image/dashboard.png";

const DeptCourse = () => {
  const [course, setCourse] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showCreateDepartment, setShowCreateDepartment] = useState(false);

  const { id } = useParams();
  const location = useLocation();
  const departmentName =
    new URLSearchParams(location.search).get("name") || "Department";

  const handleCreateDepartment = () => setShowCreateDepartment(true);
  const handleCloseCreateDepartment = () => setShowCreateDepartment(false);

  useEffect(() => {
    if (!id) return;

    const fetchCourse = async () => {
      try {
        const data = await get(`${baseUrl}Course/AllCourse?departmentId=${id}`);
        setCourse(data || []);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [id]);
  return (
    <div className={styles.wrapper}>
      <div className={styles.wrapperTitle}>
        <Link to="/admin/faculty" className={styles.wrapperBack}>
          <img src={Dashboard} alt="Dashboard" className={styles.icon} />
          <h1 className={styles.preTxt}>
            List of Course in the department of {departmentName}
          </h1>
        </Link>
        <Button
          title="Create"
          className="btnPrimary"
          onClick={handleCreateDepartment}
        />
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className={styles.errorText}>Error: {error.toString()}</p>
      ) : course.length === 0 ? (
        <div className={styles.emptyState}>
          <p>No course available.</p>
        </div>
      ) : (
        <div className={styles.grid}>
          {course.map((dept, index) => (
            <FacultyCard
              key={index}
              title={dept.departmentName}
              description={dept.description}
            />
          ))}
        </div>
      )}

      {showCreateDepartment && (
        <CreateFaculty onClose={handleCloseCreateDepartment} />
      )}
    </div>
  );
};

export default DeptCourse;
