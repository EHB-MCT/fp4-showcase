import "bootstrap/dist/css/bootstrap.min.css";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import LikeProjectBtn from "../components/LikeProjectBtn";
import { getUserById } from "../lib/users";
import styles from "../styles/projectCard.module.css";
import { motion } from "framer-motion";

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
  else
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
                    href={`/profile/${project.uid}`}
                    key={project.id}
                    className={styles.a_wrapper}
                  >
                    <p className={styles.projectCardInformationName}>
                      {user && user.username}
                    </p>
                  </a>
                  <a
                    href={`/projects/${project.project_id}`}
                    key={project.id}
                    className={styles.a_wrapper}
                  >
                    <p>{project.title}</p>
                  </a>
                </div>
                <div className={styles.projectCardInformationLikeContainer}>
                  <LikeProjectBtn project={project} />
                </div>
              </div>
            </div>
          </div>
          <div className={styles.projectCategoriesContainer}>
            {project.tags.slice(0, 3).map(
              (
                tag,
                index // Use the slice(0, 3) method to get only the first three tags
              ) => (
                <div className={styles.projectCategoryContainer} key={index}>
                  <p>{tag}</p>
                </div>
              )
            )}
            {project.tags.length > 3 && ( // Check if there are more than 3 tags
              <div className={styles.projectCategoryContainer}>
                <p>...</p>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    );
};

export default ProjectCard;
