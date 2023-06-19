import React from "react";
import styles from "../styles/Awards.module.css";
import DottedLine from "./DottedLine";

const AwardBanner = ({ award }) => {
  if (!award) {
    return null; // Render nothing if the award object is null
  }
  return (
    <div className={styles.bannerAward}>
      <div className={styles.bannerImage}>
        <div className={styles.bannerText}>
          <div className={styles.content}>
            <h1>{award.title}</h1>
            <DottedLine />
            <p>{award.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AwardBanner;
