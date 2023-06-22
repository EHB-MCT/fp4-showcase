import "bootstrap/dist/css/bootstrap.min.css";
import Image from "next/image";
import React from "react";
import styles from "../styles/BannerComponent.module.css";
import TitleComponent from "./TitleComponent";
import ButtonPink from "./ButtonPink";

const BannerComponent = ({ mobileImage, desktopImage, title }) => {
  return (
    <div
      className={styles.bannerContainer}
      style={{ backgroundImage: `url(${desktopImage})` }}
    >
      <div className="containerWidth">
        <div className={styles.bannerImageContainerMobile}></div>
        <div>
          <div className={styles.BannerText}>
            <h2>Tune in</h2>
            <p className="mb-2">
              Prepare to be part of the thrilling countdown during our exciting
              livestream event, where you&apos;ll experience the perfect blend
              of anticipation and excitement in a user-friendly digital
              extravaganza!
            </p>
            <ButtonPink
              title={"Join us"}
              color="Pink"
              onClick={() => {
                window.open("https://www.finalshow.be", "_blank");
              }}
            ></ButtonPink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BannerComponent;
