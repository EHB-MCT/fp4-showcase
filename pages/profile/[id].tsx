import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';
import Card from '../../components/ProjectCard';
import { UserContext } from '../../lib/context';
import { getProjectFromUserByType, getProjectsByUserID } from '../../lib/projects';
import { getUserById } from '../../lib/users';
import style from '../../styles/Profile.module.css';

export default function Profile() {
    const router = useRouter();
    const { id } = router.query;
    const { user } = useContext(UserContext);
    const [isPersonalProfile, setIsPersonalProfile] = useState(false);
    const [projects, setProjects] = useState([]);
    const [finalwork, setFinalwork] = useState(null);
    const [userObject, setUserObject] = useState(null);
    const [hasFinalWork, setHasFinalWork] = useState(false);

    useEffect(() => {
        async function fetchData() {
            if (user?.uid == undefined || user?.uid == null) return;
            const projectsList = await getProjectsByUserID(id);
            setProjects(projectsList);
            const finalwork = await getProjectFromUserByType(id, 'finalwork');
            setFinalwork(finalwork[0]);
            const userObject = await getUserById(id);
            if (userObject != undefined || userObject != null) {
                setUserObject(userObject);
            }
        }
        fetchData();
    }, [id, user?.uid]);

    useEffect(() => {
        //
        if (user?.uid == id) {
            setIsPersonalProfile(true);
        } else {
            setIsPersonalProfile(false);
        }
    }, [user?.uid, id]);

    const img = 'https://via.placeholder.com/300';
    const pfp = 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?cs=srgb&dl=pexels-pixabay-220453.jpg&fm=jpg';

    return (
        <>
            <Head>
                <title>{`Final Show - Profile ${user?.uid}`}</title>
                <meta name="description" content="Generated by create next app" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div
                className={style.banner_wrapper}
                style={{
                    backgroundImage:
                        'url(https://images.unsplash.com/photo-1511447333015-45b65e60f6d5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1255&q=80)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            >
                <div className={style.banner_header}>
                    <img src={pfp} height={50} width={50} alt="Pfp" className="mr-5" />
                    <div>
                        <h1>{userObject && userObject.username}</h1>
                        <span>Multimedia & Creative Technologie - Jaar 2</span>
                    </div>
                </div>
                <div className={style.banner_footer}>
                    <div className={style.socials}>
                        <button type="button" data-te-ripple-init data-te-ripple-color="light">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                            </svg>
                        </button>
                        <button type="button" data-te-ripple-init data-te-ripple-color="light">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z" />
                            </svg>
                        </button>
                        <button type="button" data-te-ripple-init data-te-ripple-color="light">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                            </svg>
                        </button>
                    </div>
                    <div>
                        <a href="https://example.com" target="_blank" rel="noopener noreferrer" className="mr-4 mb-2">
                            <img
                                src="https://cdn-icons-png.flaticon.com/512/429/429088.png?w=740&t=st=1686247100~exp=1686247700~hmac=bf1e0b57dd6a64d69be0bf9ed93781dd72ff1114145ff61b88f58c498decbb4f"
                                alt="Award 1"
                                className="w-16 h-16 rounded-full"
                            />
                        </a>
                    </div>
                </div>
            </div>
            <div className={`${style.content_wrapper} `}>
                <div className={`${style.content} containerWidth`}>
                    <div className={style.about_me}>
                        <h1>About me</h1>
                        <p>Tell us something more about yourself...</p>
                    </div>
                    <div className={style.section_final_work}>
                        <h1 className={style.title}>
                            Final Work
                            <a href="../projects/upload">
                                <FontAwesomeIcon icon={faPlus} width={30} height={30} />
                            </a>
                        </h1>
                        {finalwork && finalwork != undefined ? (
                            <a href={`/projects/${finalwork.project_id}`} key={finalwork.id}>
                                <Card project={finalwork} />
                            </a>
                        ) : (
                            <p>No final work yet... Upload your project first!</p>
                        )}
                    </div>

                    <div className={style.section_other_projects}>
                        <h1 className={style.title}>
                            Other Projects
                            <a href="../projects/upload">
                                <FontAwesomeIcon icon={faPlus} width={30} height={30} />
                            </a>
                        </h1>
                        <div className={style.projects}>
                            {projects.length > 0 ? (
                                projects.map((project, index) => {
                                    if (project.projectBelongsTo !== 'finalwork') {
                                        return (
                                            <a href={`/projects/${project.project_id}`} key={index}>
                                                <Card project={project} />
                                            </a>
                                        );
                                    }
                                    return null; // Return null if the project belongs to 'finalwork'
                                })
                            ) : (
                                <p>Oops... You have no other projects yet!</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
