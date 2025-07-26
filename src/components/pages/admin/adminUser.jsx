import React from "react";
import styles from "./admin.module.css";
import Button from "../../common/button/button";

const AdminUser = () => {
    const handleCreateAdminUser = () => {
        // Logic to handle creating an admin user
        console.log("Create Admin User button clicked");
    };
  return (
    <div className={styles.wrapper}>
      <div className={styles.wrapperTitle}>
        <h1 className={styles.preTxt}>Admin Users</h1>
        <Button
          title="Create"
          className="btnPrimary"
          onClick={handleCreateAdminUser}
        />
      </div>
    </div>
  );
};

export default AdminUser;
