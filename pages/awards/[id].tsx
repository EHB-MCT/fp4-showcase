import {
  FieldValue,
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import AwardBanner from "../../components/AwardBanner";
import ButtonPink from "../../components/ButtonPink";
import DottedLine from "../../components/DottedLine";
import ProjectCard from "../../components/ProjectCard";
import TeacherVoteChoiceSelect from "../../components/votingsystem/TeacherVoteChoiceSelect";
import { UserContext } from "../../lib/context";
import { firestore } from "../../lib/firebase";
import styles from "../../styles/Awards.module.css";

import { Card } from "react-bootstrap";
import WithdrawParticipationModal from "../../components/modals/WithdrawParticipationModal";
import {
  getAllProjects,
  getProjectsByUserID,
  updateProjectInFirebase,
} from "../../lib/projects";
import {
  getGlobalNominatedProjects,
  getVotesOnAwardFromDocent,
  saveVote,
} from "../../lib/votes";
import { getAwardDeadlines } from "../../lib/dates";

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
  const [isChangeParticipationModalOpen, setIsChangeParticipationModalOpen] =
    useState(false);
  const [isWithdrawModalOpen, setIsWithdrawModalOpen] = useState(false);
  // select a project

  // participated
  const [hasParticipated, setHasParticipated] = useState(false);

  // docent has voted
  const [hasVoted, setHasVoted] = useState(false);

  // projects to vote on
  const [projectsToVoteOn, setProjectsToVoteOn] = useState([]);

  //start voting
  const [startVotingTeacher, setStartVotingTeacher] = useState(false);
  const [nominations, setNominations] = useState([]);

  // Positions
  const [first, setFirst] = useState(null);
  const [second, setSecond] = useState(null);
  const [third, setThird] = useState(null);
  const [ranking, setRanking] = useState([]);

  // Global Nominated Projects
  const [top3Projects, setTop3Projects] = useState(null);

  // Dates
  const [currentDate, setCurrentDate] = useState(new Date());
  const [participateDeadline, setParticipateDeadline] = useState(null);
  const [docentVoteDeadline, setDocentVoteDeadline] = useState(null);
  const [adminVoteDeadline, setAdminVoteDeadline] = useState(null);

  useEffect(() => {
    const fetchDates = async () => {
      try {
        const data = await getAwardDeadlines();
        const deadlines = data.awardDeadlines;
        setParticipateDeadline(new Date(deadlines.participate.seconds * 1000));
        setDocentVoteDeadline(new Date(deadlines.docentVote.seconds * 1000));
        setAdminVoteDeadline(new Date(deadlines.adminVote.seconds * 1000));
      } catch (error) {
        console.error("Error fetching dates:", error);
      }
    };
    fetchDates();
  }, []);

  useEffect(() => {
    setRanking([first, second, third]);
  }, [first, second, third]);

  useEffect(() => {}, [projects]);

  useEffect(() => {
    const fetchVotes = async () => {
      try {
        const votes = await getVotesOnAwardFromDocent(id, user.uid);
        if (votes) {
          const docentId = user.uid;
          setHasVoted(true);
          setFirst({
            awardId: id,
            projectId: votes.order[0],
            docentId,
            selectedButtonId: 1,
          });
          setSecond({
            awardId: id,
            projectId: votes.order[1],
            docentId,
            selectedButtonId: 2,
          });
          setThird({
            awardId: id,
            projectId: votes.order[2],
            docentId,
            selectedButtonId: 3,
          });
        }
      } catch (e) {
        e;
      }
    };
    fetchVotes();
  }, [id, user?.uid]);

  useEffect(() => {
    const fetchAward = async () => {
      try {
        const response = await fetch(`/api/awards/${id}`);
        const data = await response.json();
        setAward(data);
      } catch (error) {
        console.error("Error fetching award:", error);
      }
    };
    if (id) {
      fetchAward();
    }

    const fetchUserData = async () => {
      try {
        const response = await fetch(`/api/users/${user.uid}`);
        const data = await response.json();
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
      } catch (error) {
        console.error("Error fetching user projects:", error);
      }
    };
    fetchUserProjects();

    const fetchAllProjects = async () => {
      try {
        const projects = await getAllProjects();
        setProjects(projects);
        const projectsWithAwardId = projects.filter(
          (project) => project.awardId === id
        );
        setProjectsToVoteOn(projectsWithAwardId);
      } catch (error) {
        console.error("Error fetching all projects:", error);
      }
    };
    fetchAllProjects();
  }, [id, user]);

  const handleStartVotingButtonClick = () => {
    setStartVotingTeacher(true);
  };
  const handleParticipateButtonClick = () => {
    setIsModalOpen(true);
  };
  const handleWithdraweButtonClick = () => {
    setIsWithdrawModalOpen(true);
  };

  const handleConfirmChangeParticipationButtonClick = async () => {
    try {
      const selectedProject = userProjects.find(
        (project) => project.project_id === projectSelected
      );

      if (selectedProject) {
        const participatingProject = projects.find(
          (project) => project.awardId === id
        );

        // If the selected project is not already participating in this award
        if (
          !participatingProject ||
          participatingProject.project_id !== selectedProject.project_id
        ) {
          const projectRef = doc(
            firestore,
            "projects",
            selectedProject.project_id
          );

          // Set the awardId of the selected project
          await updateDoc(projectRef, { awardId: id });

          setProjectSelected(null);
          setIsChangeParticipationModalOpen(false);

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
        } else {
          setIsChangeParticipationModalOpen(false);
        }
      }
    } catch (error) {
      console.error("Error confirming participation:", error);
    }
  };
  const handleConfirmParticipationButtonClick = async () => {
    try {
      const selectedProject = userProjects.find(
        (project) => project.project_id === projectSelected
      );

      if (selectedProject) {
        const participatingProject = projects.find(
          (project) => project.awardId === id
        );

        // If the selected project is not already participating in this award
        if (
          !participatingProject ||
          participatingProject.project_id !== selectedProject.project_id
        ) {
          const projectRef = doc(
            firestore,
            "projects",
            selectedProject.project_id
          );

          // Set the awardId of the selected project
          await updateDoc(projectRef, { awardId: id });

          // The request was successful, do something
          setProjectSelected(null);
          setIsModalOpen(false);

          // Update the projects by fetching them again
          const updatedProjects = await getAllProjects();
          setProjects(updatedProjects);
        } else {
          console.log(
            "Selected project is already participating in this award"
          );
        }
      }
    } catch (error) {
      console.error("Error confirming participation:", error);
    }
  };

  const handleButtonSelect = async (projectId, buttonId) => {
    const newNomination = {
      awardId: id, // Replace award.awardId with the appropriate value
      projectId,
      docentId: user.uid,
      selectedButtonId: buttonId,
    };

    // Set States
    if (buttonId === 1) {
      // Unset state if the same project is selected -> if no project is saved in state, set the new nomination
      if (first?.projectId === projectId) setFirst({});
      else setFirst(newNomination);
      // Delete nomination from other states if present
      if (second?.projectId === projectId) setSecond({});
      if (third?.projectId === projectId) setThird({});
    }
    if (buttonId === 2) {
      // Unset state if the same project is selected -> if no project is saved in state, set the new nomination
      if (second?.projectId === projectId) setSecond({});
      else setSecond(newNomination);
      // Delete nomination from other states if present
      if (first?.projectId === projectId) setFirst({});
      if (third?.projectId === projectId) setThird({});
    }
    if (buttonId === 3) {
      // Unset state if the same project is selected -> if no project is saved in state, set the new nomination
      if (third?.projectId === projectId) setThird({});
      else setThird(newNomination);
      // Delete nomination from other states if present
      if (first?.projectId === projectId) setFirst({});
      if (second?.projectId === projectId) setSecond({});
    }
  };
  const handleConfirmWithdrawButtonClick = async () => {
    // filter through projects to find out what project has the correct award id + user id

    const participatingProject = projects.find(
      (project) => project.awardId === id && project.uid === user.uid
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
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleChangeParticipateButtonClick = () => {
    setIsChangeParticipationModalOpen(true);
  };

  const handleCancelVotingButtonClick = () => {
    setStartVotingTeacher(false);
  };

  const handleWithdrawModalClose = () => {
    setIsWithdrawModalOpen(false);
  };

  const handleConfirmVotingButtonClick = async () => {
    // Save the votes to the database
    const vote = {
      award_id: id,
      docent_id: user.uid,
      order: {},
    };
    if (first?.projectId) vote.order[0] = first.projectId;
    if (second?.projectId) vote.order[1] = second.projectId;
    if (third?.projectId) vote.order[2] = third.projectId;

    await saveVote(vote);
  };

  const handleProjectSelect = (project_id) => {
    setProjectSelected(project_id);
  };

  useEffect(() => {
    // ...
    if (!user) return;
    const hasParticipated = projects.some(
      (project) => project.awardId === id && project.uid === user.uid
    );
    setHasParticipated(hasParticipated);

    // ...
  }, [id, user, projects]);

  const renderMyProjectChoices = () => {
    // filter projects by awardId from the ones in ranking

    let myProjectChoices = [];
    ranking.forEach((rank, i) => {
      const project = projects.forEach((project) => {
        if (rank.projectId === project.project_id) {
          myProjectChoices.push(project);
        }
      });
    });
    if (!ranking) return;

    return (
      <div className="customGrid mb-5 mt-5">
        {myProjectChoices.map((project, index) => {
          return (
            <div key={index}>
              <ProjectCard key={project.project_id} project={project} />
            </div>
          );
        })}
      </div>
    );
  };

  useEffect(() => {
    const fetchGlobalNominatedProjects = async () => {
      const data = await getGlobalNominatedProjects(id);

      setTop3Projects(data);
    };
    fetchGlobalNominatedProjects();
  }, [id]);

  return (
    <>
      <Head>
        <title>Final Show - Award</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <header>
          <AwardBanner award={award} />
        </header>

        <div>
          <div className={`${styles.awardProjects} flex flex-col`}>
            {currentDate > adminVoteDeadline && (
              <div className="">
                <h1>Nominated Projects</h1>
                <div className="customGrid mt-5 mb-5 ">
                  {top3Projects &&
                    top3Projects.map((project, index) => (
                      <ProjectCard key={index} project={project} />
                    ))}
                </div>
              </div>
            )}

            {userData && userData.role === "docent" && hasVoted && (
              <>
                <h1>YOUR CHOICES</h1>
                <div className="">{renderMyProjectChoices()}</div>
              </>
            )}

            <div className="flex gap-5">
              <h1>Projects</h1>
              {userData &&
                userData.role === "student" &&
                currentDate < participateDeadline &&
                !hasParticipated && (
                  <ButtonPink
                    title="Participate"
                    color="white"
                    onClick={handleParticipateButtonClick}
                  />
                )}

              {userData &&
                userData.role === "student" &&
                currentDate < participateDeadline &&
                hasParticipated && (
                  <>
                    <ButtonPink
                      title="Change"
                      color="white"
                      onClick={handleChangeParticipateButtonClick}
                    />
                    <ButtonPink
                      title="Remove"
                      color="white"
                      onClick={handleWithdraweButtonClick}
                    />
                  </>
                )}

              {userData &&
                userData.role === "docent" &&
                projectsToVoteOn.length > 0 &&
                currentDate > participateDeadline &&
                currentDate < docentVoteDeadline &&
                !startVotingTeacher &&
                !hasVoted && (
                  <ButtonPink
                    title="Start Voting"
                    color="white"
                    onClick={handleStartVotingButtonClick}
                  />
                )}
              {startVotingTeacher && (
                <ButtonPink
                  title="Confirm Vote"
                  color="white"
                  onClick={handleConfirmVotingButtonClick}
                />
              )}

              {startVotingTeacher && (
                <ButtonPink
                  title="Cancel"
                  color="white"
                  onClick={handleCancelVotingButtonClick}
                />
              )}
            </div>
          </div>
          {startVotingTeacher && (
            <div className="bg-black p-2 w-fit">
              Vote the best projects by order. 1 = first choice, 2 = second
              choice, 3 = third choice
            </div>
          )}
        </div>

        {userData &&
          userData.role === "student" &&
          currentDate < participateDeadline &&
          hasParticipated && (
            <div className="bg-black  p-2 w-fit mt-3 opacity-80">
              <p className="font-light ml-2">
                You are participating with project{" "}
                <span className="text-fuchsia-600">
                  &#34;
                  {projects.find((project) => project.awardId === id)?.title}
                  &#34;
                </span>
                . You can still change your submission or remove your
                submission.
              </p>
            </div>
          )}

        <div className="customGrid mt-5 mb-5 ">
          {award &&
            projects.length > 0 &&
            projectsToVoteOn.map((project, index) => {
              return (
                <>
                  <div className="relative" key={index}>
                    <ProjectCard key={project.project_id} project={project} />
                    {startVotingTeacher && (
                      <TeacherVoteChoiceSelect
                        project={project}
                        participantsCount={3}
                        onButtonSelect={handleButtonSelect}
                        key={`voting-${index}`}
                        ranking={ranking}
                      />
                    )}
                  </div>
                </>
              );
            })}
        </div>
        {projectsToVoteOn.length === 0 && award && (
          <p>
            No projects uploaded to {award.title}... Come back at a later time.
          </p>
        )}
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
              {userProjects.length === 0 && (
                <div>
                  <p>You have no projects yet.</p>
                </div>
              )}

              <div className="max-h-72 overflow-y-auto overflow-x-hidden mb-4">
                {userProjects.map((project, index) => (
                  <div
                    className={`flex-shrink-0 w-full h-full bg-slate-800 rounded-sm p-1 mb-2 cursor-pointer ${
                      project.project_id === projectSelected
                        ? "border-pink-500 border-solid border-2 "
                        : "border-solid border-2 border-slate-800"
                    }`}
                    key={index}
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
              {userProjects.length === 0 && (
                <ButtonPink
                  title="Upload"
                  color="white"
                  onClick={() => router.push("/projects/upload")}
                />
              )}
              {userProjects.length > 0 && (
                <ButtonPink
                  title="Confirm"
                  color="white"
                  onClick={handleConfirmParticipationButtonClick}
                />
              )}
            </div>
          </div>
        )}
        {isChangeParticipationModalOpen && (
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
                {userProjects.map((project, index) => (
                  <div
                    className={`flex-shrink-0 w-full h-full bg-slate-800 rounded-sm p-1 mb-2 cursor-pointer ${
                      project.project_id === projectSelected
                        ? "border-pink-500 border-solid border-2 "
                        : "border-solid border-2 border-slate-800"
                    }`}
                    key={index}
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
                onClick={handleConfirmChangeParticipationButtonClick}
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
