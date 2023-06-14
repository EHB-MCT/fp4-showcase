import "bootstrap/dist/css/bootstrap.min.css";
import Image from "next/image";
import React from "react";
import styles from "../styles/BannerComponent.module.css";
import TitleComponent from "./TitleComponent";

const BannerComponent = ({ image, title }) => {
  return (
    <div className={styles.bannerContainer}>
      <div className="containerWidth">
        <TitleComponent title="Final Show" />
        <img src={image} alt="Home Banner" />
      </div>
    </div>
  );
};

export default BannerComponent;
