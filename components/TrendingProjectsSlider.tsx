import React, { useState } from "react";
import styles from "../styles/TrendingProjectsSlider.module.css";
import Card from "./ProjectCard";

interface TrendingProjectsSliderProps {
  projects: Project[];
}

interface Project {
  id: number;
  description: string;
  title: string;
  links: string[];
  cluster: string;
  tags: string[];
  videoFile: string;
  imageFiles: string[];
  likeCount: number;
  user_id: number;
}

const TrendingProjectsSlider: React.FC<TrendingProjectsSliderProps> = ({
  projects,
}) => {
  const [startIndex, setStartIndex] = useState(0);

  const handleClickNext = () => {
    const nextIndex = startIndex + 3;
    if (nextIndex < projects.length) {
      setStartIndex(nextIndex);
    }
  };

  const handleClickPrevious = () => {
    const previousIndex = startIndex - 3;
    if (previousIndex >= 0) {
      setStartIndex(previousIndex);
    }
  };

  const displayedProjects = projects.slice(startIndex, startIndex + 3);

  return (
    <div className={styles.slider}>
      <div className={styles.navigation}>
        <button
          className={`${styles.navigationButton} ${styles.previousButton}`}
          onClick={handleClickPrevious}
          disabled={startIndex === 0}
        >
          <span className="material-icons">arrow_back_ios</span>
        </button>
        <div className={styles.projectContainer}>
          {displayedProjects.map((project) => (
            <Card key={project.id} project={project} />
          ))}
        </div>
        <button
          className={`${styles.navigationButton} ${styles.nextButton}`}
          onClick={handleClickNext}
          disabled={startIndex + 3 >= projects.length}
        >
          <span className="material-icons">arrow_forward_ios</span>
        </button>
      </div>
    </div>
  );
};

export default TrendingProjectsSlider;
