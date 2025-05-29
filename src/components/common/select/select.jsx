import React from "react";
import styles from "./select.module.css";

const Select = ({ options = [], value, onChange, className }) => {
  return (
    <select value={value} onChange={onChange} className={`${styles.select} ${className || ""}`}>
      {options.map((option) => (
        <option key={option.value || option} value={option.value || option}>
          {option.label || option}
        </option>
      ))}
    </select>
  );
};

export default Select;
