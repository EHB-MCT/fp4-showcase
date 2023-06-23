import "bootstrap/dist/css/bootstrap.min.css";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import styles from "../styles/TrendingCard.module.css";
import ButtonPink from "./ButtonPink";
import { getUserById } from "../lib/users";
import LikeProjectBtn from "./LikeProjectBtn";

const TrendingCard = ({ project }) => {
  const router = useRouter();
  const [projectUser, setUser] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    async function fetchData() {
      if (project?.uid == undefined || project?.uid == null) return;

      const projectUser = await getUserById(project.uid);
      setUser(projectUser);
    }
    fetchData();
  }, [project]);

  useEffect(() => {
    // Check if the window width is less than or equal to 768px (adjust the value if needed)
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    // Listen for window resize events
    window.addEventListener("resize", handleResize);

    // Call handleResize initially
    handleResize();

    // Clean up the event listener
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const truncateDescription = (text, sentenceCount = 1) => {
    const sentences = text.split(". ");
    const truncatedSentences = sentences.slice(0, sentenceCount);
    let truncatedDescription = truncatedSentences.join(". ");

    if (sentences.length > sentenceCount) {
      truncatedDescription += "...";
    }

    return truncatedDescription;
  };

  const truncatedDescription = truncateDescription(project.description);

  return (
    <div className={styles.trendingCardContainer}>
      <div
        className={styles.trendingCardImageContainer}
        style={{ backgroundImage: `url(${project.previewImageUrl})` }}
      ></div>
      <div className={styles.trendingCardInformationContainer}>
        <div>
          <h3
            className={styles.projectDetailPageTitle}
            onClick={() => {
              router.push(`/projects/${project.project_id}`);
            }}
          >
            {project.title}
          </h3>
          {projectUser && (
            <p
              className={styles.projectDetailPageAuthorMobile}
              onClick={() => {
                router.push(`/profile/${project.uid}`);
              }}
            >
              {projectUser.username}
            </p>
          )}
        </div>
        <div className={styles.trendingCardDescriptionContainer}>
          <h3>Description</h3>
          <p>{truncatedDescription}</p>
        </div>
        <div className={styles.trendingCardCategoriesContainer}>
          {project.tags.map((tag, index) => (
            <div className={styles.projectCategoryContainer} key={index}>
              <p>{tag}</p>
            </div>
          ))}
          {project.tags.length > 2 && isMobile && (
            <div className={styles.projectCategoryContainerr}>
              <p>...</p>
            </div>
          )}
        </div>
        <div className={styles.trendingBtnsContainer}>
          <div>
            <ButtonPink
              title={"Discover"}
              color={"Pink"}
              onClick={() => {
                router.push(`/projects/${project.project_id}`);
              }}
            />
          </div>
          <LikeProjectBtn project={project} />
        </div>
      </div>
    </div>
  );
};

export default TrendingCard;
