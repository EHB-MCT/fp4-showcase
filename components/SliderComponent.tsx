import React, { useState } from "react";
import styles from "../styles/SliderComponent.module.css";
import AwardCard from "./AwardCard";
import Image from "next/image";

const SliderComponent = ({ awards }) => {
  const [startIndex, setStartIndex] = useState(0);

  const handleClickNext = () => {
    const nextIndex = startIndex + 4;
    if (nextIndex < awards.length) {
      setStartIndex(nextIndex);
    }
  };

  const handleClickPrevious = () => {
    const previousIndex = startIndex - 4;
    if (previousIndex >= 0) {
      setStartIndex(previousIndex);
    }
  };

  const displayedAwards = awards.slice(startIndex, startIndex + 4);

  const isPreviousButtonVisible = startIndex > 0;
  const isNextButtonVisible = startIndex + 4 < awards.length;

  return (
    <div className={styles.slider}>
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
        <div className={styles.projectContainer}>
          <div className={styles.sliderContainer}>
            {displayedAwards.map((award) => (
              <AwardCard award={award} key={award.id} />
            ))}
          </div>
        </div>
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

export default SliderComponent;
