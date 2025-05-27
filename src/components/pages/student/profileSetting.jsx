import React from 'react'
import Banner from '../../common/banner/banner'
import styles from './student.module.css'

const ProfileSetting = () => {
  return (
       <div className={styles.wrapper}>
      <div className={styles.banner}>
        <Banner title={"Profile and Setting"} />
      </div>
      Profile
    </div>
  )
}

export default ProfileSetting
