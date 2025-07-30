import React, { useEffect, useState } from "react";
import styles from "../admin.module.css";
import UserTable from "../../../common/table/userTable";
import UserInfoModal from "../../../modal/userInfoModal";
import { get } from "../../../context/api";
import { baseUrl } from "../../../context/baseUrl";
import { Link } from "react-router-dom";
import ArrowBack from "../../../../Assets/Image/ArrowBack.svg";
import Loading from "../../../common/loading/loading";
import ErrorMsg from "../../../common/errorMsg/errorMsg";
import empty from "../../../../Assets/Image/empty.png";

const AllLecturer = () => {
  const [lecturers, setLecturers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showUserModal, setShowUserModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const headers = [
    { label: "Staff ID", key: "staffId" },
    { label: "First Name", key: "firstName" },
    { label: "Last Name", key: "lastName" },
    { label: "Email", key: "email" },
    { label: "Faculty", key: "facultyName" },
    { label: "Department", key: "departmentName" },
  ];

  useEffect(() => {
    const fetchLecturers = async () => {
      try {
        const response = await get(`${baseUrl}Lecturers/AllLecturers`);
        setLecturers(response || []);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchLecturers();
  }, []);

  const handleRowClick = (user) => {
    setSelectedUser(user);
    setShowUserModal(true);
  };

  if (loading) return <Loading />;

  if (error) return <ErrorMsg error={error} message={error} />;

  return (
    <div className={styles.wrapper}>
      <div className={styles.wrapperTitle}>
        <Link to="/admin/user" className={styles.wrapperBack}>
          <img src={ArrowBack} alt="ArrowBack" className={styles.icon} />
          <h1 className={styles.preTxt}>List of Lecturer</h1>
        </Link>
      </div>

      {lecturers.length === 0 ? (
        <div className={styles.emptyTable}>
          <img src={empty} alt="empty" className={styles.icons} />
          <p>No lecturers available.</p>
        </div>
      ) : (
        <UserTable
          headers={headers}
          data={lecturers}
          onRowClick={handleRowClick}
        />
      )}

      {showUserModal && selectedUser && (
        <UserInfoModal
          user={selectedUser}
          onClose={() => setShowUserModal(false)}
          fields={[
            { label: "First Name", key: "firstName" },
            { label: "Last Name", key: "lastName" },
            { label: "Email", key: "email" },
            { label: "Staff ID", key: "staffId" },
            { label: "Faculty", key: "facultyName" },
            { label: "Department", key: "departmentName" },
          ]}
        />
      )}
    </div>
  );
};

export default AllLecturer;
