import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';

interface CardProps {
    project: Project;
}

type Project = {
    title: String;
    likeCount: number;
    username: String;
    createdAt: Date;
};

type Date = {
    seconds: number;
    nanoseconds: number;
};

const Card: React.FC<CardProps> = ({ project }) => {
    return (
        <div className="card">
            <div className="card-body">
                <h5 className="card-title">{project.title}</h5>
                <p className="card-text">Likes: {project.likeCount}</p>
                <p className="card-text">Username: {project.username}</p>
                <p className="card-text">Published on: {new Date(project.createdAt.seconds).toLocaleDateString()}</p>
            </div>
        </div>
    );
};

export default Card;
