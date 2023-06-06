import { GetServerSideProps } from 'next';
import ProjectCard from '../../components/ProjectCard';

export const getServerSideProps: GetServerSideProps<{ projects: Object }> = async () => {
    const res = await fetch('https://vitrine-projects-ehb.vercel.app/api/projects');
    const data = await res.json();
    return { props: { projects: data } };
};

export default function ProjectsList({ projects }) {
    return (
        <>
            {projects.map((project, index) => {
                console.log(typeof index);
                console.log(project.title);

                return <ProjectCard key={index} project={project} />;
            })}
        </>
    );
}
