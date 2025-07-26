import React from 'react'
import styles from './modalMsg.module.css'

const SuccessModal = ({ title, btnTitle, btnOnclick }) => {
  return (
    <div className={styles.modal}>
      <div className={styles.wrapper}>
        <div className={styles.bodyModel}>
          tickSuccess
          <p>{title}</p>
        </div>
        <div className={styles.modalBtn}>
          <button onClick={btnOnclick} className={styles.btnSuccess}>
            {btnTitle}
          </button>
        </div>
      </div>
    </div>
  )
}

export default SuccessModal
