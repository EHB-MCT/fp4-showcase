import "bootstrap/dist/css/bootstrap.min.css";
import Image from "next/image";
import React from "react";
import { useState } from "react";

import styles from "../styles/projectCard.module.css";
import LikeProjectBtn from "../components/LikeProjectBtn";

const ProjectCard = ({ project }) => {
  return (
    <div className={styles.projectCardWrapper}>
      <div
        className={styles.projectCardContainer}
        style={{ backgroundImage: `url(${project.imageUrls[0]})` }}
      >
        <div className={styles.overlay}></div>
        <div className={styles.projectCardInformationContainer}>
          <div className={styles.projectCardInformationCategoryContainer}>
            {project.category && <p>{project.category}</p>}
          </div>
          <div className={styles.projectCardInformationSubContainer}>
            <div className={styles.projectCardInformationTitleContainer}>
              <p className={styles.projectCardInformationName}>name here</p>
              <p>{project.title}</p>
            </div>
            <div className={styles.projectCardInformationLikeContainer}>
              <LikeProjectBtn project={project} />
            </div>
          </div>
        </div>
      </div>
      {project.tags[0] && (
        <div className={styles.projectCategoriesContainer}>
          <p>{project.tags.join(" / ")}</p>
        </div>
      )}
    </div>
  );
};

export default ProjectCard;
