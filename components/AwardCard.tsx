import React from "react";

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
    username: string;
    createdAt: Date;
    updatedAt: Date;
  }
  
  interface CardProps {
    project: Project;
  }
  
  const AwardCard: React.FC<CardProps> = ({ project }) => {
    return (
      <div>
        <h2>{project.title}</h2>
        <p>{project.description}</p>
      </div>
    );
  };
  
export default AwardCard;
