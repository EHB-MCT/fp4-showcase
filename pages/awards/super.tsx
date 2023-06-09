import AwardBanner from '@/components/AwardBanner';
import ButtonPink from '@/components/ButtonPink';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import ProjectCard from '../../components/ProjectCard';
import TeacherVoteChoiceSelect from '../../components/votingsystem/TeacherVoteChoiceSelect';
import { UserContext } from '../../lib/context';

// super award id : HTCtIirzCJFy4Cac4FUD
// secret key : multimedia
// year : 2023

export default function Super() {
    const router = useRouter();
    const { awardId, secret, year } = router.query;
    const [award, setAward] = useState(null);
    const [projects, setProjects] = useState([]);

    // Get award
    useEffect(() => {
        const getAward = async () => {
            if (!awardId) return;
            const res = await fetch(`/api/awards/${awardId}`);
            const award = await res.json();
            setAward(award);
        };
        getAward();
    }, [awardId]);

    // Get all super award projects
    useEffect(() => {
        const superAwardProjects = async () => {
            const res = await fetch(`/api/projects/superaward?secret=${secret}&year=${year}&awardId=${awardId}`);
            const projects = await res.json();
            setProjects(projects);
        };
        superAwardProjects();
    }, [awardId, secret, year]);

    return (
        <>
            <Head>
                <title>Final Show - Award</title>
                <meta name="description" content="Generated by create next app" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main>
                <div className="containerWidth">
                    <header>
                        <AwardBanner award={award} />
                    </header>

                    <div className="flex flex-col">
                        <div className="flex gap-5">
                            <h1>Submitted Projects</h1>
                        </div>
                    </div>

                    <div className="customGrid mt-5 mb-5 gap-5">
                        {projects.length > 0 &&
                            projects.map((project, index) => {
                                return (
                                    <>
                                        <div className="flex flex-col">
                                            <div className="relative">
                                                <ProjectCard key={project.project_id} project={project} />
                                            </div>
                                        </div>
                                    </>
                                );
                            })}
                    </div>
                </div>
            </main>
        </>
    );
}
