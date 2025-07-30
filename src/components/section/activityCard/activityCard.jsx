// ActivityCard.jsx
import React from "react";
import styles from "./activityCard.module.css";
import Button from "../../common/button/button";

const ActivityCard = ({ activity, onView }) => {
  if (!activity) return null;
  const isValid = (val) =>
    val && val.toString().toLowerCase().trim() !== "not provided";

  return (
    <div className={styles.card}>
      <div className={styles.inputPreview}>
        <div className={styles.chapterTitle}>
          <div className={styles.section}>
            <div className={styles.titleTextView}>
              <div className={styles.titleJob}>Chapter</div>
              <div className={styles.txt}>{activity.chapter}</div>
            </div>
          </div>
          <div className={styles.section}>
            <div className={styles.titleTextView}>
              <div className={styles.titleJob}>Status</div>
              <div className={styles.txt}>{activity.activityStatus}</div>
            </div>
          </div>
        </div>

        <div className={styles.btn}>
          <Button
            className={"btnCreate"}
            title={"View"}
            onClick={() => onView(activity)}
          />
        </div>
      </div>

      <div className={styles.cardBody}>
        <div className={styles.titleTextView}>
          <div className={styles.titleJob}>Title</div>
          <div className={styles.textarea}>{activity.projectTitle}</div>
        </div>
      </div>
      <div className={styles.cardBody}>
        <div className={styles.titleTextView}>
          <div className={styles.titleJob}>Description</div>
          <div className={styles.textarea}>{activity.description}</div>
        </div>
      </div>
      {isValid(activity.commitMessage) && (
        <div className={styles.cardBody}>
          <div className={styles.titleTextView}>
            <div className={styles.titleJob}>Commit Message</div>
            <div className={styles.textarea}>{activity.commitMessage}</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ActivityCard;
