import React, { useEffect, useState } from "react";
import styles from "../admin.module.css";
import FacultyCard from "../../../common/card/facultyCard";
import { baseUrl } from "../../../context/baseUrl";
import { get } from "../../../context/api";
import { useParams, useLocation, Link, useNavigate } from "react-router-dom";
import Button from "../../../common/button/button";
import Dashboard from "../../../../Assets/Image/dashboard.png";
import CreateDept from "../../../modal/createDept";
import Loading from "../../../common/loading/loading";
import ErrorMsg from "../../../common/errorMsg/errorMsg";
import empty from "../../../../Assets/Image/empty.png";

const FacultyDept = () => {
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showCreateDept, setShowCreateDept] = useState(false);

  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const facultyName =
    new URLSearchParams(location.search).get("name") || "Faculty";

  const handleCreateDept = () => setShowCreateDept(true);
  const handleCloseCreateDept = () => {
    setShowCreateDept(false);
    fetchDepartments(); // Refresh departments after modal close
  };

  const handleViewMore = (department) => {
    navigate(
      `/admin/faculty/facultyDept/deptCourse/${
        department.id
      }?name=${encodeURIComponent(department.departmentName)}`
    );
  };

  const fetchDepartments = async () => {
    setLoading(true);
    try {
      const data = await get(
        `${baseUrl}Departments/AllDepartments?facultyId=${id}`
      );
      setDepartments(data || []);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchDepartments();
    }
  }, [id]);

  if (loading) return <Loading />;

  if (error) return <ErrorMsg error={error} message={error} />;

  return (
    <div className={styles.wrapper}>
      <div className={styles.wrapperTitle}>
        <Link to="/admin/faculty" className={styles.wrapperBack}>
          <img src={Dashboard} alt="Dashboard" className={styles.icon} />
          <h1 className={styles.preTxt}>
            List of Departments in the Faculty of {facultyName}
          </h1>
        </Link>
        <Button
          title="Create"
          className="btnPrimary"
          onClick={handleCreateDept}
        />
      </div>

      {departments.length === 0 ? (
        <div className={styles.emptyTable}>
          <img src={empty} alt="empty" className={styles.icons} />
          <p>No departments available.</p>
          <Button
            title="Create Department"
            className="createEmptyState"
            onClick={handleCreateDept}
          />
        </div>
      ) : (
        <div className={styles.grid}>
          {departments.map((dept, index) => (
            <FacultyCard
              key={index}
              title={dept.departmentName}
              description={dept.description}
              onViewMore={() => handleViewMore(dept)}
            />
          ))}
        </div>
      )}

      {showCreateDept && (
        <CreateDept onClose={handleCloseCreateDept} facultyId={id} />
      )}
    </div>
  );
};

export default FacultyDept;
