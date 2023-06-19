import "bootstrap/dist/css/bootstrap.min.css";
import Image from "next/image";
import React from "react";
import styles from "../styles/BannerComponent.module.css";
import TitleComponent from "./TitleComponent";

const BannerComponent = ({ mobileImage, desktopImage, title }) => {
  return (
    <div className={styles.bannerContainer}>
      <div className="containerWidth">
        <TitleComponent title={title} />
        <div
          className={styles.bannerImageContainerMobile}
          style={{ backgroundImage: `url(${mobileImage})` }}
        ></div>
        <div
          className={styles.bannerImageContainerDesktop}
          style={{ backgroundImage: `url(${desktopImage})` }}
        ></div>
      </div>
    </div>
  );
};

export default BannerComponent;
