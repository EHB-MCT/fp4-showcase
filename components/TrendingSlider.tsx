import React, { useState } from "react";
import styles from "../styles/TrendingSlider.module.css";
import Image from "next/image";
import TrendingCard from "./TrendingCard";

const TrendingSlider = ({ trendingProjects }) => {
  const [startIndex, setStartIndex] = useState(0);

  const handleClickNext = () => {
    const nextIndex = startIndex + 1;
    if (nextIndex < trendingProjects.length) {
      setStartIndex(nextIndex);
    }
  };

  const handleClickPrevious = () => {
    const previousIndex = startIndex - 1;
    if (previousIndex >= 0) {
      setStartIndex(previousIndex);
    }
  };

  const isPreviousButtonVisible = startIndex > 0;
  const isNextButtonVisible = startIndex + 1 < trendingProjects.length;

  return (
    <div className={styles.slider}>
      <div className={styles.projectContainer}>
        <div className={styles.sliderContainer}>
          {trendingProjects
            .slice(startIndex, startIndex + 1)
            .map((trendingProject) => (
              <TrendingCard
                project={trendingProject}
                key={trendingProject.id}
              />
            ))}
        </div>
      </div>
      <div className={styles.navigation}>
        <button
          className={`${styles.navigationButton} ${styles.previousButton}`}
          onClick={handleClickPrevious}
          style={{ visibility: isPreviousButtonVisible ? "visible" : "hidden" }}
        >
          <Image
            src="/images/sliderPrev.svg"
            alt="Your SVG"
            width={30}
            height={30}
          />
        </button>
        <button
          className={`${styles.navigationButton} ${styles.nextButton}`}
          onClick={handleClickNext}
          style={{ visibility: isNextButtonVisible ? "visible" : "hidden" }}
        >
          <Image
            src="/images/sliderNext.svg"
            alt="Your SVG"
            width={30}
            height={30}
          />
        </button>
      </div>
    </div>
  );
};

export default TrendingSlider;
