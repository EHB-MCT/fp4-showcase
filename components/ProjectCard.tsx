import "bootstrap/dist/css/bootstrap.min.css";
import Image from "next/image";
import React from "react";
import styles from "../styles/projectCard.module.css";

const ProjectCard = ({ project }) => {
  return (
    // <div className="bg-white rounded-lg shadow-lg max-w-xs min-w-max w-80 relative">
    //   <div className=" z-10 flex absolute right-2 top-2 p-2 bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 hover:bg-gray-300 cursor-pointer">
    //     <Image src="" alt="" width={20} height={20} className="mr-2" />
    //     <p>{project.likeCount}</p>
    //   </div>
    //   <Image
    //     src={project.imageUrls[0]}
    //     alt="User avatar"
    //     className="object-fill w-full cursor-pointer"
    //     width={350}
    //     height={350}
    //   />
    //   <div className="p-2">
    //     <p className="text-base font-medium text-gray-500 cursor-pointer">
    //       {project.uid}
    //     </p>
    //     <p className="text-lg font-medium text-gray-700 cursor-pointer">
    //       {project.title}
    //     </p>
    //   </div>
    //   <hr />
    //   <div className="p-2" style={{ maxWidth: "350px" }}>
    //     <h3 className="text-lg font-medium text-gray-900 cursor-pointer">
    //       {project.cluster}
    //     </h3>
    //     <div className="mt-2 mb-2 flex flex-wrap" style={{ maxWidth: "100%" }}>
    //       {project.tags.map((tag: string, index: number) => (
    //         <span
    //           key={index}
    //           className="bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2 hover:bg-gray-300 cursor-pointer"
    //           style={{ maxWidth: "100%", wordBreak: "break-word" }}
    //         >
    //           {tag}
    //         </span>
    //       ))}
    //     </div>
    //   </div>
    // </div>
    <div
      className={styles.projectCardContainer}
      style={{ backgroundImage: `url(${project.imageUrls[0]})` }}
    >
      <p>{project.title}</p>
      <p>{project.likeCount}</p>
    </div>
  );
};

export default ProjectCard;
