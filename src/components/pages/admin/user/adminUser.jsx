import React, { useEffect, useState } from "react";
import styles from "../admin.module.css";
import Button from "../../../common/button/button";
import { useNavigate } from "react-router-dom";
import UserInfoModal from "../../../modal/userInfoModal";
import UserTable from "../../../common/table/userTable";
import { baseUrl } from "../../../context/baseUrl";
import { get } from "../../../context/api";

const AdminUser = () => {
  const navigate = useNavigate();
  const [admins, setAdmins] = useState([]);
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
    const fetchAdmins = async () => {
      try {
        const response = await get(`${baseUrl}Admins/All`);
        setAdmins(response || []);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchAdmins();
  }, []);

  const handleRowClick = (user) => {
    setSelectedUser(user);
    setShowUserModal(true);
  };

  const handleCreateAdminUser = () => {
    // Logic to handle creating an admin user
    console.log("Create Admin User button clicked");
  };

  const handleListLecturer = () => {
    navigate("/admin/user/allLecturer");
  };

  const handleListStudent = () => {
    navigate("/admin/user/allStudent");
  };
  return (
    <div className={styles.wrapper}>
      <div className={styles.wrapperTitle}>
        <h1 className={styles.preTxt}>List of Admin Users</h1>
        <Button
          title="Create Admin"
          className="btnPrimary"
          onClick={handleCreateAdminUser}
        />
        <Button
          title="Lecturer"
          className="btnPrimary"
          onClick={handleListLecturer}
        />
        <Button
          title="Student"
          className="btnPrimary"
          onClick={handleListStudent}
        />
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className={styles.errorText}>Error: {error.toString()}</p>
      ) : admins.length === 0 ? (
        <div className={styles.emptyState}>
          <p>No admins available.</p>
        </div>
      ) : (
        <UserTable
          headers={headers}
          data={admins}
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

export default AdminUser;
