import "bootstrap/dist/css/bootstrap.min.css";
import Image from "next/image";
import React from "react";
import styles from "../styles/BannerComponent.module.css";
import TitleComponent from "./TitleComponent";
import ButtonPink from "./ButtonPink";

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
        >
          <div style={{ margin: "10%", width: "25%" }}>
            <h2>Tune in</h2>
            <p>
              Prepare to be part of the thrilling countdown during our exciting
              livestream event, where you'll experience the perfect blend of
              anticipation and excitement in a user-friendly digital
              extravaganza!
            </p>
            <ButtonPink title="join us"></ButtonPink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BannerComponent;
