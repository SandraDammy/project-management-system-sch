import React, { useEffect, useState } from "react";
import styles from "../admin.module.css";
import FacultyCard from "../../../common/card/facultyCard";
import { baseUrl } from "../../../context/baseUrl";
import { get } from "../../../context/api";
import { useParams, useLocation, Link } from "react-router-dom";
import CreateFaculty from "../../../modal/createFaculty";
import Button from "../../../common/button/button";
import ArrowBack from "../../../../Assets/Image/ArrowBack.svg";
import empty from "../../../../Assets/Image/empty.png";
import Loading from "../../../common/loading/loading";
import ErrorMsg from "../../../common/errorMsg/errorMsg";

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

  if (loading) return <Loading />;

  if (error) return <ErrorMsg error={error} message={error} />;

  return (
    <div className={styles.wrapper}>
      <div className={styles.wrapperTitle}>
        <Link to="/admin/faculty" className={styles.wrapperBack}>
          <img src={ArrowBack} alt="ArrowBack" className={styles.icon} />
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

      {course.length === 0 ? (
        <div className={styles.emptyTable}>
          <img src={empty} alt="empty" className={styles.icons} />
          <p>No course available.</p>
          <Button
            title="Create Course"
            className="createEmptyState"
            onClick={handleCreateDepartment}
          />
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
