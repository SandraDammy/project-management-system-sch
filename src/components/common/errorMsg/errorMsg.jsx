import React from "react";
import styles from "./errorMsg.module.css";

const ErrorMsg = ({ message }) => {
  if (!message) return null;

  return <div className={styles.error}>{message}</div>;
};

export default ErrorMsg;
