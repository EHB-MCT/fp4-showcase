import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getProjectById } from "../../lib/projects";
import { getUserById } from "../../lib/users";
import { useContext } from "react";
import { UserContext } from "../../lib/context";

import style from "../../styles/ProjectDetailPage.module.css";
import ProjectImagesSlider from "@/components/ProjectImagesSlider";
import ButtonPink from "@/components/ButtonPink";

export default function Project() {
  const router = useRouter();
  const { id } = router.query;
  const [project, setProject] = useState(null);
  const [projectUser, setUser] = useState(null);
  const [projectsIds, setProjectsIds] = useState(null);
  const { user } = useContext(UserContext);

  useEffect(() => {
    async function fetchData() {
      // project
      if (id == undefined || id == null) return;
      const project = await getProjectById(id);
      setProject(project);
    }

    fetchData();
  }, [id]);

  useEffect(() => {
    async function fetchData() {
      if (project?.uid == undefined || project?.uid == null) return;

      const projectUser = await getUserById(project.uid);
      setUser(projectUser);
    }
    fetchData();
  }, [project]);

  useEffect(() => {
    const projectIdsString = localStorage.getItem("projectIds");
    const projectIds = JSON.parse(projectIdsString);
    setProjectsIds(projectIds);
  }, []);

  const [showFullText, setShowFullText] = useState(false);
  const fullText = project?.description || "";
  const desiredSentences = 2;
  const displayText = showFullText
    ? fullText
    : truncateText(fullText, desiredSentences);
  const sentences = fullText.split(".").filter(Boolean);
  const shouldTruncate = sentences.length > desiredSentences;

  function truncateText(text, numSentences) {
    const sentences = text.split(".").filter(Boolean);
    if (sentences.length <= numSentences) {
      return text;
    }
    const truncatedSentences = sentences.slice(0, numSentences);
    return truncatedSentences.join(". ") + ".";
  }

  const projectImages = {
    urls: project?.imageUrls || [],
    preview: project?.previewImageUrl || "",
  };

  const youtubeUrls = project?.youtubeLinks || [];
  const videoIds = youtubeUrls.map((url) => {
    const matches = url.match(
      /(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([^&?/]+)/
    );
    return matches ? matches[1] : null;
  });

  function getProjectBelongsToText(projectBelongsTo) {
    switch (projectBelongsTo) {
      case "1":
        return "First year";
      case "2":
        return "Second year";
      case "3":
        return "Third year";
      case "finalwork":
        return "Finalwork";
      default:
        return "";
    }
  }
  const showEditButton = user?.uid === projectUser?.uid;

  const publishedDate = project?.createdAt
    ? new Date(project.createdAt.seconds * 1000).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      })
    : "";

  function handleEditProjectButtonClick() {
    if (project && id) {
      router.push(`/projects/edit?id=${id}`);
    } else {
      console.log("Project ID is not available.");
    }
  }

  function handleNextProjectButtonClick() {
    if (id && projectsIds) {
      const currentIndex = projectsIds.indexOf(id);
      const nextIndex = (currentIndex + 1) % projectsIds.length;
      const nextProjectId = projectsIds[nextIndex];
      router.push(`/projects/${nextProjectId}`);
    }
  }

  function handlePreviousProjectButtonClick() {
    if (id && projectsIds) {
      const currentIndex = projectsIds.indexOf(id);
      const previousIndex =
        (currentIndex - 1 + projectsIds.length) % projectsIds.length;
      const previousProjectId = projectsIds[previousIndex];
      router.push(`/projects/${previousProjectId}`);
    }
  }

  return (
    <>
      <Head>
        <title>Final Show - Project</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
        <link
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
          rel="stylesheet"
        />
      </Head>
      <main className={style.projectDetailPageMain}>
        {project != null && (
          <div className="containerWidth">
            <div className={style.backContainer}>
              <div
                className={style.goBackBtn}
                onClick={handlePreviousProjectButtonClick}
              >
                <p>Previous project</p>
              </div>
              <div
                className={style.goNextBtn}
                onClick={handleNextProjectButtonClick}
              >
                <p>Next project</p>
              </div>
            </div>
            <div className={style.projectDetailPageTitleContainer}>
              <div>
                <h3 className={style.projectDetailPageTitle}>
                  {project.title}
                </h3>
                {projectUser && (
                  <p
                    className={style.projectDetailPageAuthorMobile}
                    onClick={() => {
                      router.push(`/profile/${project.uid}`);
                    }}
                  >
                    {projectUser.username}
                  </p>
                )}
              </div>
              <div className={style.editContainer}>
                {showEditButton && (
                  <ButtonPink
                    title="Edit project"
                    color="pink"
                    onClick={handleEditProjectButtonClick}
                  />
                )}
              </div>
            </div>
            <div className={style.projectDetailPageContainer}>
              <div className={style.sliderContainer}>
                <ProjectImagesSlider
                  images={projectImages}
                  videoUrls={videoIds}
                />
              </div>
              <div className={style.projectDetailPageInformationContainer}>
                <div>
                  <h1 className={style.projectDetailPageTitleDesktop}>
                    {project.title}
                  </h1>
                  {projectUser && (
                    <p
                      className={style.projectDetailPageAuthorDesktop}
                      onClick={() => {
                        router.push(`/profile/${project.uid}`);
                      }}
                    >
                      {projectUser.username}
                    </p>
                  )}
                </div>
                <div
                  className={
                    style.projectDetailPageInformationFirstSubContainer
                  }
                >
                  <div>
                    <h3>Categories</h3>
                    <div className={style.projectCategoryWrapper}>
                      {project.category.length > 0 && (
                        <div className={style.projectCategoryContainer}>
                          <p>{project.category}</p>
                        </div>
                      )}
                      <div className={style.projectCategoryContainer}>
                        <p>
                          {getProjectBelongsToText(project.projectBelongsTo)}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h3>Technologies</h3>
                    <div className={style.projectCategoryWrapper}>
                      {project.tags.map(
                        (
                          tag,
                          index // Use the slice(0, 3) method to get only the first three tags
                        ) => (
                          <div
                            className={style.projectCategoryContainer}
                            key={index}
                          >
                            <p>{tag}</p>
                          </div>
                        )
                      )}
                    </div>
                  </div>
                </div>
                <div className={style.projectDetailPageDescriptionContainer}>
                  <h3>Description</h3>
                  <p>{displayText}</p>
                  {shouldTruncate && (
                    <button
                      className={style.descriptionMoreBtn}
                      onClick={() => setShowFullText(!showFullText)}
                    >
                      {showFullText ? "Less" : "More"}
                    </button>
                  )}
                </div>
                <div className={style.projectDetailPageDescriptionContainer}>
                  <h3>Published date</h3>
                  <p>{publishedDate}</p>
                </div>
                {project.pdfUrl && (
                  <div className={style.projectDetailPageDescriptionContainer}>
                    <h3>PDF</h3>
                    <a href={project.pdfUrl} target="_blank">
                      <div className={style.projectDetailPagePdfContainer}>
                        <span className="material-icons">description</span>
                        <p>file</p>
                      </div>
                    </a>
                  </div>
                )}
                {project.links.length > 0 && (
                  <div className={style.projectDetailPageDescriptionContainer}>
                    <h3>Links</h3>
                    {project.links.map((link, index) => (
                      <a href={link} target="_blank" key={index}>
                        <div className={style.projectDetailPagePdfContainer}>
                          <span className="material-icons">link</span>
                          <p className={style.projectDetailPageLinkUrl}>
                            {link}
                          </p>
                        </div>
                      </a>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </main>
    </>
  );
}
