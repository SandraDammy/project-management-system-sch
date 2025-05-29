import React from "react";
import styles from "./input.module.css";

const Input = ({ type = "text", placeholder, value, onChange, className }) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={styles[className]}
      // className={`${styles.input} ${className || ""}`}
    />
  );
};

export default Input;
