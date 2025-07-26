import React, { useEffect, useState } from "react";
import styles from "../admin.module.css";
import UserTable from "../../../common/table/userTable";
import UserInfoModal from "../../../modal/userInfoModal";
import { get } from "../../../context/api";
import { baseUrl } from "../../../context/baseUrl";
import { Link } from "react-router-dom";
import Dashboard from "../../../../Assets/Image/dashboard.png";

const AllStudent = () => {
  const [students, setStudents] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showUserModal, setShowUserModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const headers = [
    { label: "First Name", key: "firstName" },
    { label: "Last Name", key: "lastName" },
    { label: "Role", key: "role" },
    { label: "Student ID", key: "studentId" },
  ];

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await get(`${baseUrl}Students/All`);
        setStudents(response || []);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  const handleRowClick = (user) => {
    setSelectedUser(user);
    setShowUserModal(true);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.wrapperTitle}>
        <Link to="/admin/user" className={styles.wrapperBack}>
          <img src={Dashboard} alt="Dashboard" className={styles.icon} />
          <h1 className={styles.preTxt}>List of Students</h1>
        </Link>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className={styles.errorText}>Error: {error.toString()}</p>
      ) : students.length === 0 ? (
        <div className={styles.emptyState}>
          <p>No students available.</p>
        </div>
      ) : (
        <UserTable
          headers={headers}
          data={students}
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
            { label: "Student ID", key: "studentId" },
            { label: "Role", key: "role" },
          ]}
        />
      )}
    </div>
  );
};

export default AllStudent;
