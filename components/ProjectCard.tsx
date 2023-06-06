import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';

interface CardProps {
    project: Object;
}

const Card: React.FC<CardProps> = ({ project }) => {
    const date = new Date();
    date.setSeconds(project.createdAt.seconds);
    console.log(date);

    return (
        <div className="card">
            <div className="card-body">
                <h5 className="card-title">{project.title}</h5>
                <p className="card-text">Likes: {project.likeCount}</p>
                <p className="card-text">Username: {project.username}</p>
                <p className="card-text">Published on: {date.toLocaleDateString()}</p>
            </div>
        </div>
    );
};

export default Card;
