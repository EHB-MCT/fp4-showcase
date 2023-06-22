import { useEffect, useState, useRef, useContext } from "react";
import { getProjectById } from "../lib/projects";
import { firestore, editProject } from "../lib/firebase";
import tagsData from "../data/tags.json";
import { useRouter } from 'next/router'
import { UserContext } from "../lib/context";
import Image from "next/image";

const EditProjectForm = ({ projectId }) => {
  const [project, setProject] = useState(null);
  const [previewImageUrl, setPreviewImageUrl] = useState(null);


  // user data
  const { user } = useContext(UserContext);

  // router
  const router = useRouter()

  // input refs
  const previewImageInputRef = useRef(null);

  // inputfields
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [previewImage, setPreviewImage] = useState(null);
  const [projectBelongsTo, setProjectBelongsTo] = useState("");
  const [category, setCategory] = useState("");
  // tags
  const [newTag, setNewTag] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);
  // links
  const [newLink, setNewLink] = useState("");
  const [addedLinks, setAddedLinks] = useState([]);
  // youtube links
  const [newYoutubeLink, setNewYoutubeLink] = useState("");
  const [addedYoutubeLinks, setAddedYoutubeLinks] = useState([]);
  // pdf file
  const [pdfFile, setPdfFile] = useState(null);
  const [pdfFileReplaced, setPdfFileReplaced] = useState(false);
  // errors
  const [linkError, setLinkError] = useState(false);
  const [youtubeLinkError, setYoutubeLinkError] = useState(false);
  // upload project tsatus 
  const [uploadStatus, setUploadStatus] = useState(null);
  // loading state
  const [loading, setLoading] = useState(false);
  // preview image url replaced
  const [previewImageUrlReplaced, setPreviewImageUrlReplaced] = useState(false);
  // use ref file 
  const fileInputRef = useRef(null);


  useEffect(() => {
    async function fetchData() {
      // project
      if (projectId == undefined || projectId == null) return;
      const project = await getProjectById(projectId);
      setProject(project);
      if (!project) return;
      if (!user) return;
      if (project.uid !== user?.uid) {
        router.push(`/projects/${projectId}`);
      } 
    
    }

    fetchData();

   
    

   
  }, [projectId]);


  const handleGoBackClick = () => {
    router.push(`/projects/${projectId}`);
  };
  useEffect(() => {
    console.log(project);
    if (project) {
      setTitle(project.title);
      setDescription(project.description);
      setPreviewImageUrl(project?.previewImageUrl || "");
      setPreviewImage(project?.previewImageUrl ||"");

      setProjectBelongsTo(project.projectBelongsTo);
      setCategory(project.category);
      setSelectedTags(project.tags);
      setAddedLinks(project.links);
      setAddedYoutubeLinks(project.youtubeLinks);
      
     
      if (project.pdfUrl !== null){

       
        setPdfFile(project.pdfUrl);
     
        //setPdfFileSelected(true)
      }
     
    }
    console.log(description);
  }, [project]);

  useEffect(() => {
    console.log(title);
    console.log(description);
    console.log(previewImage);
    console.log(projectBelongsTo);
    console.log(category);
    console.log(selectedTags);
    console.log(addedLinks);
    console.log(addedYoutubeLinks);
    console.log(pdfFileReplaced);
    console.log("pdf", pdfFile);
  }, [
    title,
    description,
    previewImage,
    projectBelongsTo,
    category,
    selectedTags,
    addedLinks,
    addedYoutubeLinks,
    previewImageUrl,
    pdfFile
  ]);

  // submit the form
  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    const project = {
      projectId,
      title,
      description,
      projectBelongsTo: projectBelongsTo,
      category: category,
      tags: selectedTags,
      links: addedLinks,
      youtubeLinks: addedYoutubeLinks,
      previewImage: previewImage  ? previewImage : "",
      pdfFile: pdfFile ? pdfFile : "",
      
    };

    if (previewImageUrlReplaced) {
      project.previewImage = previewImage;
    }
    console.log("submit update form");

    try {
      await editProject(project);

      console.log("Project uploaded successfully");

      // Additional logic after successful upload

      setUploadStatus("success");
      setTimeout(() => {
        router.push(`/projects/${projectId}`);
      }, 2000);
    } catch (error) {
      console.error("Error uploading project:", error);

      setUploadStatus("error");

      // Additional error handling
    }
    setLoading(false);
  

  };

  useEffect(() => {
    let timer;

    if (uploadStatus) {
      timer = setTimeout(() => {
        setUploadStatus(null);
      }, 2000);
    }

    return () => clearTimeout(timer);
  }, [uploadStatus]);

  //inputfield handling

  const handlePreviewImageChange = (event) => {
    const file = event.target.files[0];
    setPreviewImageUrlReplaced(true);
    if (file && file.type.includes("image")) {
      setPreviewImage(file);
      const reader = new FileReader();
      reader.onload = () => {
        setPreviewImageUrl(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setPreviewImage(null);
      setPreviewImageUrl(null);
    }
  };

  const handleRemovePreviewImage = () => {
    setPreviewImage(null);
    setPreviewImageUrl(null);

    // Clear the input field
    if (previewImageInputRef.current) {
      previewImageInputRef.current.value = "";
    }
  };

  // project belongsto handling

  const handleProjectBelongsToSelect = (event) => {
    const selectedProjectBelongsTo = event.target.value;

    setProjectBelongsTo(selectedProjectBelongsTo);

    if (projectBelongsTo !== "1") {
      setCategory(project.category);
    } else if (projectBelongsTo == "1"){
      setCategory("");
    }
  };

  // handle category select
  const handleCategorySelect = (event) => {
    const selectedCategory = event.target.value;

    setCategory(selectedCategory);
  };

  // handle tags
  const handleTagChange = (event) => {
    event.preventDefault();

    // Check if the new tag already exists in the selected tags

    if (!selectedTags.includes(newTag) && newTag.trim() !== "") {
      setSelectedTags((prevSelectedTags) => [...prevSelectedTags, newTag]);
    }

    // Clear the newTag input field

    setNewTag("");
  };

  const handleTagSelect = (event) => {
    const selectedTag = event.target.value;

    // Check if the selected tag is not empty and doesn't already exist in selectedTags

    if (selectedTag !== "" && !selectedTags.includes(selectedTag)) {
      setSelectedTags((prevSelectedTags) => [...prevSelectedTags, selectedTag]);
    }
  };

  const handleRemoveTag = (index) => {
    setSelectedTags((prevSelectedTags) => {
      const updatedTags = [...prevSelectedTags];

      updatedTags.splice(index, 1);

      return updatedTags;
    });
  };

  // handle links
  const handleLinkChange = (event) => {
    event.preventDefault();

    // Check if the new link is not empty

    if (newLink.trim() !== "") {
      // Regular expression pattern for URL validation

      const urlPattern = /^(ftp|http|https):\/\/[^ "]+$/;

      // Check if the new link matches the URL pattern

      if (urlPattern.test(newLink)) {
        setLinkError(false);

        setAddedLinks((prevAddedLinks) => [...prevAddedLinks, newLink]);
      } else {
        // Handle invalid URL

        setLinkError(true);
      }
    }

    // Clear the newTag input field

    setNewLink("");
  };

  const handleRemoveLink = (index) => {
    setAddedLinks((prevAddedLinks) => {
      const updatedLinks = [...prevAddedLinks];

      updatedLinks.splice(index, 1);

      return updatedLinks;
    });
  };

  // handle youtube links
  const handleYoutubeLinkChange = (event) => {
    event.preventDefault();

    // Check if the new link is not empty and is a valid YouTube link

    if (newYoutubeLink.trim() !== "" && isValidYoutubeLink(newYoutubeLink)) {
      setYoutubeLinkError(false);

      setAddedYoutubeLinks((prevAddedYoutubeLinks) => [
        ...prevAddedYoutubeLinks,

        newYoutubeLink,
      ]);
    } else {
      // desplay an error message if the youtube link is invalid.

      setYoutubeLinkError(true);
    }

    // Clear the newTag input field

    setNewYoutubeLink("");
  };

  const isValidYoutubeLink = (link) => {
    const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+/;

    return youtubeRegex.test(link);
  };

  const handleRemoveYoutubeLink = (index) => {
    setAddedYoutubeLinks((prevAddedYoutubeLinks) => {
      const updatedLinks = [...prevAddedYoutubeLinks];

      updatedLinks.splice(index, 1);

      return updatedLinks;
    });
  };

  // handle pdf file change
  const handlePdfFileChange = (event) => {
    const file = event.target.files[0]; // Get the first selected file

    // Check if a file was selected

    if (file) {
      // Check if it's a PDF file

      if (file.type === "application/pdf") {
        setPdfFile(file);

        setPdfFileReplaced(true);
      } else {
        // Display an error message or perform any other action for non-PDF files

        alert("Please select a PDF file.");
      }
    } else {
      // Handle the case when the file selection is canceled

      setPdfFile(null);

      setPdfFileReplaced(false);
    }
  };

  return (
    
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-2xl md:max-w-3xl lg:max-w-4xl xl:max-w-3xl 2xl:max-w-3xl mx-auto flex flex-col gap-4 items-center bg-gray-900 p-5 rounded-xl mb-5 mt-5 relative"
    >
      <h1 className="text-center text-white text-2xl">Edit Project </h1>
      <button  onClick={handleGoBackClick} style={{position:"absolute",left:"6%"}}>
          <Image
          style={{rotate:"180deg"}}
            src="/images/sliderNext.svg"
            alt="Your SVG"
            width={30}
            height={30}
            
          /></button>
      <hr className="h-px my-3 bg-gray-200 border-0 w-full "></hr>

      <div className="flex flex-col gap-2 items-start w-full relative">
        <label className="text-white flex items-top" htmlFor="title">
          Title: <span className="font-thin ml-3 text-pink-500">*</span>
        </label>

        <input
          placeholder="Write your project title here..."
          type="text"
          id="title"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          className=" border-gray-800 p-2 w-full rounded-sm bg-gray-700 text-white"
          required
        />
      </div>

      <div className="flex flex-col gap-2 items-start w-full relative">
        <label className="text-white flex items-top" htmlFor="description">
          Description: <span className="font-thin ml-3 text-pink-500">*</span>
        </label>

        <textarea
          placeholder="Write a description about your project..."
          id="description"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          className=" border-gray-300 p-2 w-90 h-40 resize-none w-full rounded-sm bg-gray-700 text-white "
          required
        />
      </div>

      <hr className="h-px my-3 bg-gray-200 border-0 w-full "></hr>

      <div className="flex flex-col gap-2 items-start w-full relative">
        <label className="text-white flex items-top" htmlFor="previewImage">
          Project preview image:{" "}
          <span className="font-thin ml-3 text-pink-500">*</span>
          <span className="font-thin ml-3 text-gray-500">
            (preferably square)
          </span>
          <span />
        </label>

        <input
         
          ref={previewImageInputRef}
          type="file"
          id="previewImage"
          name="previewImage"
          onChange={handlePreviewImageChange}
          accept="image/*"
          className="border-gray-300 w-full rounded-sm bg-gray-700 text-white py-1 px-3"
        />
      </div>

      {previewImageUrl && typeof window !== "undefined" && (
        <div className="grid grid-cols-2 gap-3 w-full">
          <div className="relative h-40 overflow-hidden bg-gray-400 bg-opacity-10 rounded-lg">
            <img
              src={previewImageUrl}
              alt="Project Preview Image"
              className="absolute top-0 left-0 h-full w-full object-contain pt-1"
            />

            <button
              type="button"
              onClick={handleRemovePreviewImage}
              className="absolute top-0 right-2 text-red-500 text-3xl p-1 cursor-pointer ml-2"
            >
              X
            </button>
          </div>
        </div>
      )}

      <hr className="h-px my-3 bg-gray-200 border-0 w-full "></hr>

      <div className="flex flex-col gap-2 items-start w-full relative">
        <label className="text-white flex items-top" htmlFor="cluster">
          Belongs to:
          <span className="font-thin ml-3 text-pink-500">*</span>
        </label>

        <select
          required
          placeholder="select"
          id="projectBelongsTo"
          value={projectBelongsTo}
          onChange={handleProjectBelongsToSelect}
          className=" border-gray-300 p-2 w-full rounded-l-sm bg-gray-700 text-white"
        >
          <option value="" disabled hidden>
            Choose
          </option>

          <option value="1">1st year</option>

          <option value="2">2nd year</option>

          <option value="3">3rd year</option>

          <option value="finalwork">finalwork</option>
        </select>
      </div>
      {projectBelongsTo !== "" && projectBelongsTo !== "1" ? (
        <div className="flex flex-col gap-2 items-start w-full relative">
          <label className="text-white flex items-top" htmlFor="category">
            Category:
            <span className="font-thin ml-3 text-pink-500">*</span>
          </label>

          <select
            required
            placeholder="category select"
            id="category"
            value={category}
            onChange={handleCategorySelect}
            className=" border-gray-300 p-2 w-full rounded-l-sm bg-gray-700 text-white"
          >
            <option value="" disabled hidden>
              Choose
            </option>
            <option value="Motion">Motion</option>
            <option value="Web & App">Web & App</option>
            <option value="Emerging Technology">Emerging Technologies</option>
            <option value="Extended Reality">Extended Reality</option>
            <option value="">Other...</option>
          </select>
        </div>
      ) : null}

      <div className="flex flex-col gap-2 items-start w-full relative">
        <label className="text-white flex items-top" htmlFor="tags">
          Tags:
        </label>

        <div className="flex w-full">
          <select
            id="tags"
            value={newTag}
            onChange={handleTagSelect}
            className="border-gray-300 p-2  rounded-l-sm bg-gray-700 text-white"
          >
            <option value="">Select a tag</option>

            {tagsData.map((tag) => (
              <option key={tag} value={tag}>
                {tag}
              </option>
            ))}
          </select>

          <input
            placeholder="Add a non existing tag..."
            type="text"
            value={newTag}
            onChange={(event) => setNewTag(event.target.value)}
            className=" border-gray-300  ml-1 flex-grow rounded-r-sm bg-gray-700 text-white pl-3"
          />

          <button
            type="submit"
            onClick={handleTagChange}
            className="bg-purple-600 text-white px-3 rounded-sm ml-1"
          >
            Add Tag
          </button>
        </div>

        {/* Render the selected tags */}

        <div className="flex flex-wrap gap-2 rounded-md">
          {selectedTags.map((tag, index) => (
            <span
              key={index}
              className="bg-white text-gray-600 px-3 py-1 rounded-xl"
            >
              {tag}

              <button
                type="button"
                onClick={() => handleRemoveTag(index)}
                className="ml-2 text-red-500 "
              >
                X
              </button>
            </span>
          ))}
        </div>
      </div>

      <hr className="h-px my-3 bg-gray-200 border-0 w-full "></hr>

      <div className="flex flex-col gap-2 items-start w-full relative">
        <label className="text-white flex items-center" htmlFor="links">
          Links:
        </label>

        <div className="flex w-full">
          <input
            placeholder="e.g. website link, github link"
            type="text"
            value={newLink}
            onChange={(event) => setNewLink(event.target.value)}
            className=" border-gray-300   flex-grow rounded-sm bg-gray-700  py-2 text-white pl-3"
          />

          <button
            type="submit"
            onClick={handleLinkChange}
            className="bg-purple-600 text-white px-3 rounded-sm ml-1"
          >
            Add Link
          </button>
        </div>

        {linkError == true && (
          <p className="text-red-500">This is not a valid link</p>
        )}

        <div className="flex flex-wrap gap-2 rounded-md">
          {addedLinks.map((link, index) => (
            <span
              key={index}
              className="bg-white text-gray-600 px-3 py-1 rounded-xl"
            >
              {link}

              <button
                type="button"
                onClick={() => handleRemoveLink(index)}
                className="ml-2 text-red-500"
              >
                X
              </button>
            </span>
          ))}
        </div>
      </div>
      <hr className="h-px my-3 bg-gray-200 border-0 w-full "></hr>
      <div className="flex flex-col gap-2 items-start w-full relative">
        <label className="text-white flex items-center" htmlFor="links">
          Youtube links:
        </label>

        <div className="flex w-full">
          <input
            placeholder="url..."
            type="text"
            value={newYoutubeLink}
            onChange={(event) => setNewYoutubeLink(event.target.value)}
            className=" border-gray-300   flex-grow rounded-sm bg-gray-700  py-2 text-white pl-3"
          />

          <button
            type="submit"
            onClick={handleYoutubeLinkChange}
            className="bg-purple-600 text-white px-3 rounded-sm ml-1"
          >
            Add Link
          </button>
        </div>

        {youtubeLinkError == true && (
          <p className="text-red-500">This is not a valid youtube link</p>
        )}

        <div className="flex flex-col gap-2 rounded-md">
          {addedYoutubeLinks.map((link, index) => (
            <span
              key={index}
              className="bg-white text-gray-600 px-3 py-1 rounded-xl"
            >
              {link}

              <button
                type="button"
                onClick={() => handleRemoveYoutubeLink(index)}
                className="ml-2 text-red-500"
              >
                X
              </button>
            </span>
          ))}
        </div>
      </div>

      <hr className="h-px my-3 bg-gray-200 border-0 w-full "></hr>

      <div className="flex flex-col gap-2 items-start w-full relative ">
        <label className="text-white flex items-top" htmlFor="pdfFile">
          PDF File:
        </label>

        <input
          type="file"
          id="pdfFile"
          name="pdfFile"
          onChange={handlePdfFileChange}
          accept=".pdf"
          className="border-gray-300 w-full rounded-sm bg-gray-700 text-white py-1 px-3"
          ref={fileInputRef}
        />

        {pdfFileReplaced ? (
          <span className="text-gray-400">{pdfFile ? pdfFile.name : ""}</span>
        ) : <span className="text-gray-400">{pdfFile}</span>}
      </div>

      
      
      {loading && <div className="text-white">Loading...</div>}

      {uploadStatus === "success" && (
        <p className="text-green-500">Edit successful!</p>
      )}

      {uploadStatus === "error" && (
        <p className="text-red-500">Edit failed. Please try again.</p>
      )}
      <button
        type="submit"
        className="bg-green-500 text-white px-4 py-2 rounded-md mt-4 w-full"
      >
        Confirm Edit
      </button>
    </form>
  );
};

export default EditProjectForm;
