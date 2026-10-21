import React from "react";
import styles from "./table.module.css";
import { Link } from "react-router-dom";

const ActivityTable = ({ headers, data }) => {
  const getStatusColor = (status) => {
    const lowerCaseStatus = status.toLowerCase();
    switch (lowerCaseStatus) {
      case "pending":
        return styles.pending;
      case "approved":
        return styles.approved;
      case "posted":
        return styles.posted;
      case "post":
        return styles.post;
      case "review":
        return styles.review;
      default:
        return "";
    }
  };

  return (
    <div className={styles.container}>
      <table className={styles.table}>
        <thead className={styles.header}>
          <tr>
            {headers.map((header, index) => (
              <th key={index}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody className={styles.body}>
          {data.map((row, rowIndex) => (
            <tr key={row.id || `row-${rowIndex}`} className={styles.row}>
              {Object.entries(row)
                .slice(0)
                .map(([key, value], colIndex) => (
                  <td key={colIndex} className={styles.cell}>
                    {key === "projectStatus" ? (
                      <span
                        className={`${styles.status} ${getStatusColor(value)}`}
                      >
                        {value}
                      </span>
                    ) : (
                      <Link
                        to={`/student/activity/activityProfile/${encodeURIComponent(
                          row.projectName
                        )}`}
                      >
                        <span>{value}</span>
                      </Link>
                    )}
                  </td>
                ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ActivityTable;
