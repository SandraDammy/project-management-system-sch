// ActivityCard.jsx
import React from "react";
import styles from "./activityCard.module.css";
import Button from "../../common/button/button";

const ActivityCard = ({ activity, onView }) => {
const { chapter, title, description, commit } = activity;
  return (
    <div className={styles.card}>
      <div className={styles.inputPreview}>
        <div className={styles.chapterTitle}>
          <div className={styles.section}>
            <div className={styles.titleTextView}>
              <div className={styles.titleJob}>Chapter</div>
              <div className={styles.txt}>{chapter}</div>
            </div>
          </div>
          <div className={styles.section}>
            <div className={styles.titleTextView}>
              <div className={styles.titleJob}>Title</div>
              <div className={styles.txt}>{title}</div>
            </div>
          </div>
        </div>

        <div className={styles.btn}>
          <Button
            className={"btnWhite"}
            title={"View"}
            onClick={() => onView(activity)}
          />
        </div>
      </div>

      <div className={styles.cardBody}>
        <div className={styles.titleTextView}>
          <div className={styles.titleJob}>Description</div>
          <div className={styles.textarea}>{description}</div>
        </div>
      </div>
      <div className={styles.cardBody}>
        <div className={styles.titleTextView}>
          <div className={styles.titleJob}>Commit Message</div>
          <div className={styles.textarea}>{commit}</div>
        </div>
      </div>
    </div>
  );
};

export default ActivityCard;
