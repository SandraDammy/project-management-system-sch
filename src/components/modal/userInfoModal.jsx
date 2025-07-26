import React from "react";
import styles from "./modal.module.css";
import closeIcon from "../../Assets/Image/close.svg";

const UserInfoModal = ({ user, fields = [], onClose }) => {
  if (!user) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalBody}>
        <div className={styles.close} onClick={onClose}>
          <img src={closeIcon} alt="Close Icon" width="32" height="32" />
        </div>

        <div className={styles.modalContainer}>
          <h2>User Information</h2>
          <div className={styles.grid}>
            {fields.map(({ label, key }) => (
              <div key={key} className={styles.titleText}>
                <p className={styles.labelTxt}>{label}:</p>
                <p className={styles.inputTxt}>{user[key] || "N/A"}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserInfoModal;
