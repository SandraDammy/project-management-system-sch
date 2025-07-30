import React from "react";
import styles from "./table.module.css";

const UserTable = ({ headers, data, onRowClick }) => {
  return (
    <div className={styles.container}>
      <table className={styles.table}>
        <thead className={styles.header}>
          <tr>
            {headers.map((header, index) => (
              <th key={index}>{header.label}</th>
            ))}
          </tr>
        </thead>
        <tbody className={styles.body}>
          {data.map((row, rowIndex) => (
            <tr
              key={row.id || rowIndex}
              className={styles.row}
              onClick={() => onRowClick && onRowClick(row)}
              style={{ cursor: onRowClick ? "pointer" : "default" }}
            >
              {headers.map((header, colIndex) => {
                const isRole = header.key === "role";
                const isEmail = header.key === "email";

                return (
                  <td
                    key={colIndex}
                    className={`${styles.cell} ${isRole ? styles.roleCell : ""} ${
                      isEmail ? styles.emailCell : ""
                    }`}
                    id={isRole ? "role" : isEmail ? "email" : undefined}
                  >
                    {row[header.key]}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
