import React from 'react'
import styles from "./card.module.css";

const FacultyCard = ({title,  description, onViewMore}) => {
  return (
    <div className={styles.card}>
      <div className={styles.viewTitle} onClick={onViewMore}>
        <h3>{title}</h3>
        <p className={styles.description}>{description}</p>
      </div>
    </div>  )
}

export default FacultyCard