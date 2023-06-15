import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect, useState } from 'react';
import LikeProjectBtn from '../components/LikeProjectBtn';
import { getUserById } from '../lib/users';
import styles from '../styles/projectCard.module.css';

const ProjectCard = ({ project }) => {
    const [user, setUser] = useState(null);

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
            <div className={styles.projectCardWrapper}>
                <div className={styles.projectCardContainer} style={{ backgroundImage: `url(${project.previewImageUrl})` }}>
                    <div className={styles.overlay}></div>
                    <div className={styles.projectCardInformationContainer}>
                        <div className={styles.projectCardInformationCategoryContainer}>{project.category && <p>{project.category}</p>}</div>
                        <div className={styles.projectCardInformationSubContainer}>
                            <div className={styles.projectCardInformationTitleContainer}>
                                <p className={styles.projectCardInformationName}>{user && user.username}</p>
                                <p>{project.title}</p>
                            </div>
                            <div className={styles.projectCardInformationLikeContainer}>
                                <LikeProjectBtn project={project} />
                            </div>
                        </div>
                    </div>
                </div>
                {project.tags && (
                    <div className={styles.projectCategoriesContainer}>
                        <p>{project.tags.join(' / ')}</p>
                    </div>
                )}
            </div>
        );
};

export default ProjectCard;
