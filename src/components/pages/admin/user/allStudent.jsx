import React, { useEffect, useState } from "react";
import styles from "../admin.module.css";
import UserTable from "../../../common/table/userTable";
import UserInfoModal from "../../../modal/userInfoModal";
import { get } from "../../../context/api";
import { baseUrl } from "../../../context/baseUrl";
import { Link } from "react-router-dom";
import Dashboard from "../../../../Assets/Image/dashboard.png";
import empty from "../../../../Assets/Image/empty.png";
import Loading from "../../../common/loading/loading";
import ErrorMsg from "../../../common/errorMsg/errorMsg";

const AllStudent = () => {
  const [students, setStudents] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showUserModal, setShowUserModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const headers = [
    { label: "Matric No", key: "matricNo" },
    { label: "First Name", key: "firstName" },
    { label: "Last Name", key: "lastName" },
    { label: "Email", key: "email" },
    { label: "Faculty", key: "facultyName" },
    { label: "Department", key: "departmentName" },
  ];

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await get(`${baseUrl}Students/AllStudents`);
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

  if (loading) return <Loading />;

  if (error) return <ErrorMsg error={error} message={error} />;

  return (
    <div className={styles.wrapper}>
      <div className={styles.wrapperTitle}>
        <Link to="/admin/user" className={styles.wrapperBack}>
          <img src={Dashboard} alt="Dashboard" className={styles.icon} />
          <h1 className={styles.preTxt}>List of Students</h1>
        </Link>
      </div>

      {students.length === 0 ? (
        <div className={styles.emptyTable}>
          <img src={empty} alt="arrowBack" className={styles.icons} />
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
            { label: "Matric No", key: "matricNo" },
            { label: "First Name", key: "firstName" },
            { label: "Last Name", key: "lastName" },
            { label: "Email", key: "email" },
            { label: "Faculty", key: "facultyName" },
            { label: "Department", key: "departmentName" },
          ]}
        />
      )}
    </div>
  );
};

export default AllStudent;
