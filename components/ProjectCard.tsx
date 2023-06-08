import 'bootstrap/dist/css/bootstrap.min.css';
import Image from 'next/image';
import React from 'react';

interface CardProps {
    project: Project;
}

interface Project {
    id: number;
    description: String;
    title: String;
    links: Array<String>;
    cluster: String;
    tags: Array<String>;
    videoFile: String;
    imageFiles: string[];
    likeCount: number;
    username: String;
    createdAt: Date;
    updatedAt: Date;
}

interface Date {
    seconds: number;
    nanoseconds: number;
}

function handleClickProject() {
    // Redirect to project detail page
    console.log('Project has been clicked');
}

function handleClickLike() {
    // Implement like logic
    console.log('Liked a project');
}

function handleClickUsername() {
    // Redirect to username profile
    console.log('Clicked on username');
}

function handleClickCluster() {
    // Filter projects by cluster / cluster detail page (not sure yet)
    console.log('Clicked on cluster');
}

function handleClickTag() {
    // Filter projects by tags
    console.log('Clicked on tag');
}

const Card: React.FC<CardProps> = ({ project }) => {
    const user = {
        id: 1,
        email: 'jane.smith@example.com',
        password: 'password2',
        role: 2,
        description: 'I love design and creating beautiful user interfaces.',
        username: 'Jane Smith',
        profilePicture: '',
        bannerPicture: '',
        socials: ['https://twitter.com/janesmith', 'https://dribbble.com/janesmith'],
        projects: [1, 4, 6],
        pinnedProject: 0,
    };

    return (
        <div  className="bg-white rounded-lg shadow-lg max-w-xs min-w-max w-80 relative">
            <div
                className=" z-10 flex absolute right-2 top-2 p-2 bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 hover:bg-gray-300 cursor-pointer"
                onClick={handleClickLike}
            >
                <Image src="" alt="" width={20} height={20} className="mr-2" />
                <p>{project.likeCount}</p>
            </div>
            <Image
                src={project.imageFiles[0]}
                alt="User avatar"
                className="object-fill w-full cursor-pointer"
                width={350}
                height={350}
                onClick={handleClickProject}
            />
            <div className="p-2">
                <p className="text-base font-medium text-gray-500 cursor-pointer" onClick={handleClickUsername}>
                    {user.username}
                </p>
                <p className="text-lg font-medium text-gray-700 cursor-pointer" onClick={handleClickCluster}>
                    {project.cluster}
                </p>
            </div>
            <hr />
            <div className="p-2">
                <h3 className="text-lg font-medium text-gray-900 cursor-pointer" onClick={handleClickProject}>
                    {project.title}
                </h3>
                <div className="mt-2 mb-2">
                    {project.tags.map((tag: String, index: number) => (
                        <span
                            key={index}
                            className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 hover:bg-gray-300 cursor-pointer"
                            onClick={handleClickTag}
                        >
                            {tag}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Card;
