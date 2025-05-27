import React from "react";
import styles from "./teacher.module.css";
import Banner from "../../common/banner/banner";

const TeacherDashboard = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.banner}>
        <Banner title={"Dashboard"} />
      </div>
      <h1 className="text-2xl font-bold">Teacher Dashboard</h1>
    </div>
  );
};

export default TeacherDashboard;
