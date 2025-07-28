import React from 'react'
import styles from "./loading.module.css";

const Loading = () => {
  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <div className={styles.spinner}></div>
        <p className={styles.text}>Loading...</p>
      </div>
    </div>  )
}

export default Loading