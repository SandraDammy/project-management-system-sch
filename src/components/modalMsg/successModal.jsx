import React from "react";
import styles from "./modalMsg.module.css";
import Success from "../../Assets/Image/success.svg";

const SuccessModal = ({ title, btnTitle, btnOnclick }) => {
  return (
    <div className={styles.modal}>
      <div className={styles.wrapper}>
        <div className={styles.bodyModel}>
          <img src={Success} alt="Success Icon" className={styles.modalIcon} />
          <p>{title}</p>
        </div>
        <div className={styles.modalBtn}>
          <button onClick={btnOnclick} className={styles.btnSuccess}>
            {btnTitle}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SuccessModal;
