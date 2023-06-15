import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState, useEffect, useContext } from "react";
import styles from "../../styles/Awards.module.css";
import DottedLine from "../../components/DottedLine";
import UnderConstruction from "../../components/UnderConstruction";
import ButtonPink from "../../components/ButtonPink";
import AwardBanner from "../../components/AwardBanner";
import ProjectCard from "../../components/ProjectCard";
import { UserContext } from "../../lib/context";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
  FieldValue,
} from "firebase/firestore";
import { firestore } from "../../lib/firebase";

import {
  updateProjectInFirebase,
  getProjectsByUserID,
  getAllProjects,
} from "../../lib/projects";
import WithdrawParticipationModal from "../../components/modals/WithdrawParticipationModal";

export default function Award() {
  const router = useRouter();
  const { id } = router.query;
  const [award, setAward] = useState(null);
  const [projects, setProjects] = useState([]);
  const [userProjects, setUserProjects] = useState([]);
  const [projectSelected, setProjectSelected] = useState();
  // user
  const { user } = useContext(UserContext);
  const [userData, setUserData] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isWithdrawModalOpen, setIsWithdrawModalOpen] = useState(false);
  // select a project

  // participated
  const [hasParticipated, setHasParticipated] = useState(false);

  const isDeving = false;

  function renderParticipateActions() {
    return (
      <>
        {userData &&
        userData.role === "student" &&
        currentDate < specificDate &&
        !hasParticipated ? (
          <ButtonPink
            title="Participate"
            color="white"
            onClick={handleParticipateButtonClick}
          />
        ) : userData && userData.role === "docent" ? null : (
          <div className="space-x-4">
            <ButtonPink
              title="Change"
              color="white"
              onClick={handleParticipateButtonClick}
            />
            <ButtonPink
              title="Withdraw"
              color="white"
              onClick={handleWithdraweButtonClick}
            />
          </div>
        )}
      </>
    );
  }

  useEffect(() => {
    const fetchAward = async () => {
      try {
        const response = await fetch(`/api/awards/${id}`);
        const data = await response.json();
        setAward(data);
        console.log(data);
      } catch (error) {
        console.error("Error fetching award:", error);
      }
    };

    if (id) {
      fetchAward();
    }

    const fetchUserData = async () => {
      console.log("before fetch");
      try {
        const response = await fetch(`/api/users/${user.uid}`);
        const data = await response.json();
        console.log(data); // Check if the data is correctly fetched
        setUserData(data);
      } catch (error) {
        console.error("Error fetching award:", error);
      }
    };
    fetchUserData();

    const fetchUserProjects = async () => {
      try {
        const projects = await getProjectsByUserID(user.uid);
        setUserProjects(projects);
        console.log(projects);
      } catch (error) {
        console.error("Error fetching user projects:", error);
      }
    };
    fetchUserProjects();

    const fetchAllProjects = async () => {
      try {
        const projects = await getAllProjects();
        setProjects(projects);
        console.log(projects);
      } catch (error) {
        console.error("Error fetching all projects:", error);
      }
    };
    fetchAllProjects();
  }, [id, user]);

  const handleParticipateButtonClick = () => {
    setIsModalOpen(true);

    console.log("test button");
  };
  const handleWithdraweButtonClick = () => {
    setIsWithdrawModalOpen(true);
  };

  const handleConfirmParticipationButtonClick = async () => {
    try {
      // Make an API request or trigger a function to send the data
      const response = await fetch("/api/awards/participate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          awardId: id,
          projectId: projectSelected,
        }),
      });

      // Handle the response
      if (response.ok) {
        setProjectSelected(null);
        setIsModalOpen(false);

        // Remove the awardId from the previous project with the same awardId
        const previousProject = projects.find(
          (project) => project.awardId === id
        );
        if (previousProject) {
          const projectRef = doc(
            firestore,
            "projects",
            previousProject.project_id
          );
          await updateDoc(projectRef, { awardId: null });
        }
        // The request was successful, update the projects by fetching them again
        const updatedProjects = await getAllProjects();
        setProjects(updatedProjects);

        // The request was successful, do something
        console.log("Participation confirmed");
      } else {
        // The request failed, handle the error
        console.error("Failed to confirm participation");
      }
    } catch (error) {
      console.error("Error confirming participation:", error);
    }
  };
  const handleConfirmWithdrawButtonClick = async () => {
    const participatingProject = projects.find(
      (project) => project.awardId === id
    );
    if (participatingProject) {
      const projectRef = doc(
        firestore,
        "projects",
        participatingProject.project_id
      );
      await updateDoc(projectRef, { awardId: null });
    }
    // The request was successful, update the projects by fetching them again
    const updatedProjects = await getAllProjects();
    setProjects(updatedProjects);
    setIsWithdrawModalOpen(false);
    console.log("confirm withdraw success");
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleWithdrawModalClose = () => {
    setIsWithdrawModalOpen(false);
  };
  const currentDate = new Date();
  const specificDate = new Date("2023-06-14");
  const docentVoteDate = new Date("2023-06-20");

  const handleProjectSelect = (project_id) => {
    setProjectSelected(project_id);
  };

  useEffect(() => {
    // ...
    const hasParticipated = projects.some((project) => project.awardId === id);
    setHasParticipated(hasParticipated);
    // ...
  }, [id, user, projects]);

  return (
    <>
      <Head>
        <title>Final Show - Award {id}</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <header>
          <AwardBanner award={award} />
        </header>

        <div>
          <div className={styles.awardProjects}>
            <h1>Projects</h1>
            {isDeving ? renderParticipateActions() : ""}
          </div>
        </div>
        {userData &&
          userData.role === "student" &&
          currentDate < specificDate &&
          hasParticipated && (
            <div className="bg-black  p-2 w-fit mt-3 opacity-50">
              <p className="font-light ml-2">
                You are participating with project{" "}
                <span className="text-fuchsia-600">
                  &#34;
                  {projects.find((project) => project.awardId === id)?.title}
                  &#34;
                </span>
                . You can still change your submission or withdraw your
                submission.
              </p>
            </div>
          )}
        <div className="customGrid mt-5">
          {award &&
            projects.length > 0 &&
            projects.map((project) => {
              if (project.awardId === id) {
                return (
                  <ProjectCard key={project.project_id} project={project} />
                );
              }
              return null;
            })}
        </div>
        {isWithdrawModalOpen && (
          <WithdrawParticipationModal
            handleWithdrawModalClose={handleWithdrawModalClose}
            handleConfirmWithdrawButtonClick={handleConfirmWithdrawButtonClick}
          />
        )}
        {isModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="bg-black bg-opacity-50 absolute inset-0"></div>
            <div className="bg-slate-900 p-4 rounded shadow-lg relative z-10 w-1/3">
              <div className="flex justify-end">
                <button className="text-white" onClick={handleModalClose}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
              <h2 className="text-xl mb-4">
                Participate
                <span className="text-sm"> - select your project</span>
              </h2>

              <div className="max-h-72 overflow-y-auto overflow-x-hidden mb-4">
                {userProjects.map((project) => (
                  <div
                    className={`flex-shrink-0 w-full h-full bg-slate-800 rounded-sm p-1 mb-2 cursor-pointer ${
                      project.project_id === projectSelected
                        ? "border-pink-500 border-solid border-2 "
                        : "border-solid border-2 border-slate-800"
                    }`}
                    key={project.project_id}
                    onClick={() => handleProjectSelect(project.project_id)}
                  >
                    <div className="flex items-center">
                      <img
                        src={project.previewImageUrl}
                        className="w-24 h-24 rounded-sm mr-2"
                        alt="Project Preview"
                      />
                      <div className="flex flex-col">
                        <h3 className="text-white">{project.title}</h3>
                        <p className="text-slate-500">{project.category}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <ButtonPink
                title="Confirm"
                color="white"
                onClick={handleConfirmParticipationButtonClick}
              />
            </div>
          </div>
        )}
      </div>
    </>
  );
}

/*
onClick={() => handleProjectClick(project.project_id)}*/
