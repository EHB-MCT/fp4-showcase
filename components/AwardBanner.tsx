import React from "react";
import styles from "../styles/Awards.module.css";
import DottedLine from "./DottedLine";

const AwardBanner = () => {
    return (
      <div className={styles.bannerAward}>
        <div className={styles.bannerImage}>
          <div className={styles.bannerText}>
            <div className={styles.content}>
              <h1>Name of the card</h1>
              <DottedLine />
              <p>
                Motion graphics refers to the art and technique of combining graphic design elements, such as text, illustrations, shapes, and images, with movement and animation to create visually engaging and dynamic visual content. It involves the use of software tools and techniques to bring these elements to life, resulting in videos, animations, or sequences that convey information.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  export default AwardBanner;