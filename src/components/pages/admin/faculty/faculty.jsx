import React, { useEffect, useState } from "react";
import styles from "../admin.module.css";
import FacultyCard from "../../../common/card/facultyCard";
import Button from "../../../common/button/button";
import { useNavigate } from "react-router-dom";
import CreateFaculty from "../../../modal/createFaculty";
import { baseUrl } from "../../../context/baseUrl";
import { get } from "../../../context/api";
import empty from "../../../../Assets/Image/empty.png";
import Loading from "../../../common/loading/loading";
import ErrorMsg from "../../../common/errorMsg/errorMsg";

const Faculty = () => {
  const [showCreateFaculty, setShowCreateFaculty] = useState(false);
  const [faculties, setFaculties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleCreateFaculty = () => setShowCreateFaculty(true);
  const handleCloseCreateFaculty = () => setShowCreateFaculty(false);

  const handleViewMore = (faculty) => {
    navigate(
      `/admin/faculty/facultyDept/${faculty.id}?name=${encodeURIComponent(
        faculty.facultyName
      )}`
    );
  };

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  useEffect(() => {
    if (!user) return;

    const fetchFaculties = async () => {
      try {
        const data = await get(`${baseUrl}Faculties/AllFaculties`);
        setFaculties(data || []);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchFaculties();
  }, [user]);

  if (loading) return <Loading />;

  if (error) return <ErrorMsg error={error} message={error} />;

  return (
    <div className={styles.wrapper}>
      <div className={styles.wrapperTitle}>
        <h1 className={styles.preTxt}>List of Faculty</h1>
        <Button
          title="Create"
          className="btnPrimary"
          onClick={handleCreateFaculty}
        />
      </div>

      {faculties.length === 0 ? (
        <div className={styles.emptyTable}>
          <img src={empty} alt="empty" className={styles.icons} />
          <p>No faculties found.</p>
          <Button
            title="Create Faculty"
            className="createEmptyState"
            onClick={handleCreateFaculty}
          />
        </div>
      ) : (
        <div className={styles.grid}>
          {faculties.map((faculty, index) => (
            <FacultyCard
              key={index}
              title={faculty.facultyName}
              description={faculty.description}
              onViewMore={() => handleViewMore(faculty)}
            />
          ))}
        </div>
      )}

      {showCreateFaculty && (
        <CreateFaculty onClose={handleCloseCreateFaculty} />
      )}
    </div>
  );
};

export default Faculty;
