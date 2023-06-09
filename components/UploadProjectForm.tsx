import React, { useState, useEffect,useContext } from "react";
import tagsData from "../data/tags.json";
import { firestore, uploadProject } from "../lib/firebase";
import { UserContext } from "../lib/context";

const UploadProjectForm = () => {
  const {user} = useContext(UserContext);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [newLink, setNewLink] = useState("");
  const [addedLinks, setAddedLinks] = useState([]);
  const [tags, setTags] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [cluster, setCluster] = useState("");
  const [newTag, setNewTag] = useState("");
  const [imageFiles, setImageFiles] = useState([]);
  const [videoFile, setVideoFile] = useState(null);
  // for the error messages
  const [uploadStatus, setUploadStatus] = useState(null);
  // for the spinner loader animation
  const [loading, setLoading] = useState(false);


  const clearVideoField = () => {
    setVideoFile(null);
  };

  const clearImageFields = () => {
    setImageFiles([]);
  };

  const handleClusterSelect = (event) => {
    const selectedCluster = event.target.value;
    setCluster(selectedCluster);
  };
  const handleTagChange = () => {
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

  const handleLinkChange = () => {
    // Check if the new link is not empty
    if (newLink.trim() !== "") {
      setAddedLinks((prevAddedLinks) => [...prevAddedLinks, newLink]);
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

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);

    // Check if it's a video file
    if (event.target.name === "video") {
      setVideoFile(files[0]);
    } else {
      // Filter out non-image files
      const imageFiles = files.filter((file) => file.type.includes("image"));
      setImageFiles((prevImageFiles) => [...prevImageFiles, ...imageFiles]);
    }
  };

  const handleDeleteImage = (index) => {
    setImageFiles((prevImageFiles) => {
      const updatedImageFiles = [...prevImageFiles];
      updatedImageFiles.splice(index, 1);
      return updatedImageFiles;
    });
  };

 
  
  const handleSubmit = async (event) => {
    event.preventDefault();


    setLoading(true);
    // Form submission logic
    // Perform any necessary actions (e.g., API calls, data manipulation)
    const project = {
      title,
      description,
      links: addedLinks,
      cluster,
      tags: selectedTags,
      imageFiles,
      videoFile,
      uid: user.uid
    };

    // Call the uploadProject function and pass the project object
    try {
      await uploadProject(project);
      console.log("Project uploaded successfully");
      // Additional logic after successful upload
    } catch (error) {
      console.error("Error uploading project:", error);
      // Additional error handling
    }


    setLoading(false);


    console.log("title => ", title);
    console.log("description => ", description);
    console.log("links (optional) =>", addedLinks);
    console.log("cluster =>", cluster);
    console.log("tags =>", selectedTags);
    console.log("video file =>", videoFile);
    console.log("image files =>", imageFiles);

    // Reset the form fields
    setTitle("");
    setDescription("");
    setSelectedTags([]);
    setAddedLinks([]);
    setNewTag("");
    setNewLink("");
    setImageFiles([]);
    clearVideoField(); // Clear the video field
    clearImageFields(); // Clear the image fields
  };

  useEffect(() => {
    let timer;
    if (uploadStatus) {
      timer = setTimeout(() => {
        setUploadStatus(null);
      }, 5000);
    }
    return () => clearTimeout(timer);
  }, [uploadStatus]);

  return (
    <form
      onSubmit={handleSubmit}
      className="w-1/2 flex flex-col gap-4 items-center bg-gray-900 p-5 rounded-xl mb-5 mt-5"
    >
      <h1 className="text-center text-white text-2xl">Upload Project</h1>
      <hr className="h-px my-3 bg-gray-200 border-0 w-full "></hr>
      <div className="flex flex-col gap-2 items-start w-full">
        <label className="text-white" htmlFor="title">
          Title:
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

      <div className="flex flex-col gap-2 items-start w-full">
        <label className="text-white" htmlFor="description">
          Description:
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
      <div className="flex flex-col gap-2 items-start  w-full">
        <label className="text-white" htmlFor="links">
          Links (optional):
        </label>
        <div className="flex w-full">
          <input
            placeholder="url..."
            type="text"
            value={newLink}
            onChange={(event) => setNewLink(event.target.value)}
            className=" border-gray-300   flex-grow rounded-sm bg-gray-700  py-2 text-white pl-3"
          />
          <button
            type="button"
            onClick={handleLinkChange}
            className="bg-purple-600 text-white px-3 rounded-sm ml-1"
          >
            Add Link
          </button>
        </div>
        {/* Render the selected tags */}
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
      <div className="flex flex-col gap-2 items-start w-full">
        <label className="text-white" htmlFor="cluster">
          Cluster:
        </label>
        <select
          id="cluster"
          value={cluster}
          onChange={handleClusterSelect}
          className=" border-gray-300 p-2 w-full rounded-l-sm bg-gray-700 text-white"
        >
          <option value="">Select Cluster</option>
          <option value="Motion">Motion</option>
          <option value="Web">Web</option>
          <option value="3D">3D</option>
        </select>
      </div>
      <div className="flex flex-col gap-2 items-start w-full">
        <label className="text-white" htmlFor="tags">
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
            type="button"
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
      <div className="flex flex-col gap-2 items-start w-full ">
        <label className="text-white" htmlFor="video">
          Video:
        </label>
        <input
          type="file"
          id="video"
          name="video"
          onChange={handleFileChange}
          accept="video/*"
          className=" border-gray-300 w-full rounded-sm bg-gray-700 text-white py-1 px-3"
        />
      </div>

      <div className="flex flex-col gap-2 items-start w-full ">
        <label className="text-white" htmlFor="images">
          Images:
        </label>
        <input
          type="file"
          id="images"
          name="images"
          onChange={handleFileChange}
          accept="image/*"
          className="border-gray-300 w-full rounded-sm bg-gray-700 text-white py-1 px-3"
        />
      </div>

      <div className="grid grid-cols-2 gap-3 w-full">
        {/* Render the uploaded images */}
        {imageFiles.map((file, index) => {
          // Check if the file type is an image
          if (file.type.includes("image")) {
            return (
              <div
                key={index}
                className="relative h-40 overflow-hidden bg-gray-400 bg-opacity-10 rounded-lg"
              >
                <img
                  src={URL.createObjectURL(file)}
                  alt={`Image ${index}`}
                  className="absolute top-0 left-0 h-full w-full object-contain pt-1"
                />
                <button
                  type="button"
                  onClick={() => handleDeleteImage(index)}
                  className="absolute top-0 right-2 text-red-500 text-3xl p-1 cursor-pointer ml-2"
                >
                  X
                </button>
              </div>
            );
          }
          return null; // Exclude video files from rendering
        })}
      </div>

      
      {loading && <div className="text-white">Loading...</div>}
      {uploadStatus === "success" && (
        <p className="text-green-500">Upload successful!</p>
      )}

      {uploadStatus === "error" && (
        <p className="text-red-500">Upload failed. Please try again.</p>
      )}


      <button
        type="submit"
        className="bg-green-500 text-white px-4 py-2 rounded-md mt-4 w-full"
      >
        Submit
      </button>
    </form>
  );
};

export default UploadProjectForm;
