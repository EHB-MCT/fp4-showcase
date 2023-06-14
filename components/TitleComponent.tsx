import "bootstrap/dist/css/bootstrap.min.css";
import Image from "next/image";
import React from "react";
import styles from "../styles/TitleComponent.module.css";
import DottedLine from "./DottedLine";

const TitleComponent = ({ title }) => {
  return (
    <div className={styles.titleContainer}>
      <h1>{title}</h1>
      <div className={styles.titleSubDiv}>
        <DottedLine />
      </div>
    </div>
  );
};

export default TitleComponent;
