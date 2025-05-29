import React from 'react';
import styles from './button.module.css';

const Button = ({ className, title, onClick, type = "button" }) => {
  return (
    <button className={styles[className]} onClick={onClick} type={type}>
      {title}
    </button>
  );
};

export default Button;
