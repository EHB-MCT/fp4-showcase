import "bootstrap/dist/css/bootstrap.min.css";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import LikeProjectBtn from "../components/LikeProjectBtn";
import { getUserById } from "../lib/users";
import styles from "../styles/projectCard.module.css";

const ProjectCard = ({ project }) => {
  const router = useRouter();
  const [user, setUser] = useState(null);

  const staggerVariant = {
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.1,
      },
    },
    hidden: {
      opacity: 0,
    },
  };

  useEffect(() => {
    const fetchData = async () => {
      if (project.uid == undefined || project.uid == null) return;
      const user = await getUserById(project.uid);
      setUser(user);
    };
    fetchData();
  }, [project]);

  if (!project) return null;
  else {
    const tags = project.tags.slice(0, 2); // Limit to a maximum of 2 tags
    let remainingCharacters = 25;
    const truncatedTags = [];
    for (let i = 0; i < tags.length; i++) {
      const tag = tags[i];
      if (tag.length <= remainingCharacters) {
        truncatedTags.push(tag);
        remainingCharacters -= tag.length;
      } else {
        truncatedTags.push(tag.substring(0, remainingCharacters));
        break;
      }
    }

    const showEllipsis = project.tags.length > truncatedTags.length;

    return (
      <div className={`${styles.projectCardWrapper} ${styles.neonEffect}`}>
        <motion.div
          className={`${styles.projectCardWrapper} ${styles.neonEffect}`}
          variants={staggerVariant}
          initial="hidden"
          animate="visible"
        >
          <div
            onClick={() => {
              router.push(`/projects/${project.project_id}`);
            }}
            className={styles.projectCardContainer}
            style={{ backgroundImage: `url(${project.previewImageUrl})` }}
          >
            <div className={styles.overlay}></div>
            <div className={styles.projectCardInformationContainer}>
              <div className={styles.projectCardInformationCategoryContainer}>
                {project.category && <p>{project.category}</p>}
              </div>
              <div className={styles.projectCardInformationSubContainer}>
                <div className={styles.projectCardInformationTitleContainer}>
                  <a
                    href={`/projects/${project.project_id}`}
                    key={project.id}
                    className={styles.a_wrapper}
                  >
                    <p className={styles.projectCardInformationTitle}>
                      {project.title}
                    </p>
                  </a>
                  <a
                    href={`/profile/${project.uid}`}
                    key={project.uid}
                    className={styles.a_wrapper}
                  >
                    <p className={styles.projectCardInformationName}>
                      {user && user.username}
                    </p>
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.projectCategoriesContainer}>
            {truncatedTags.map((tag, index) => (
              <div className={styles.projectCategoryContainer} key={index}>
                <p>{tag}</p>
              </div>
            ))}
            {showEllipsis && (
              <div className={styles.projectCategoryContainer}>
                <p>...</p>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    );
  }
};

export default ProjectCard;
