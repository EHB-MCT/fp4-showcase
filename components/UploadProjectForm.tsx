import React, { useState, useEffect, useContext, useRef } from "react";

import tagsData from "../data/tags.json";

import { firestore, uploadProject } from "../lib/firebase";

import { UserContext } from "../lib/context";

import { library } from "@fortawesome/fontawesome-svg-core";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/router";

import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";

const UploadProjectForm = () => {
  const [previewImage, setPreviewImage] = useState(null);

  const previewImageInputRef = useRef(null);

  const [previewImageTooltipVisible, setPreviewImageTooltipVisible] =
    useState(false);

  // retrieving the user properties

  const { user } = useContext(UserContext);

  // saving properties values usestates

  const [pdfFile, setPdfFile] = useState(null);

  const [title, setTitle] = useState("");

  const [description, setDescription] = useState("");

  const [newLink, setNewLink] = useState("");

  const [addedLinks, setAddedLinks] = useState([]);

  const [addedYoutubeLinks, setAddedYoutubeLinks] = useState([]);

  const [selectedTags, setSelectedTags] = useState([]);

  const [category, setCategory] = useState("");

  const [projectBelongsTo, setProjectBelongsTo] = useState("");

  const [newTag, setNewTag] = useState("");

  const [imageFiles, setImageFiles] = useState([]);

  // error usestates

  const [youtubeLinkError, setYoutubeLinkError] = useState(false);

  const [linkError, setLinkError] = useState(false);

  const [newYoutubeLink, setNewYoutubeLink] = useState("");

  const [pdfFileSelected, setPdfFileSelected] = useState(false);

  const [imageSelected, setImageSelected] = useState(false);

  // router
  const router = useRouter();
  // tooltips usestates

  const [titleTooltipVisible, setTitleTooltipVisible] = useState(false);

  const [descriptionTooltipVisible, setDescriptionTooltipVisible] =
    useState(false);

  const [belongsToTooltipVisible, setBelongsToTooltipVisible] = useState(false);

  const [linksTooltipVisible, setLinksTooltipVisible] = useState(false);

  const [linksYoutubeLinkVisible, setLinksYoutubeLinkVisible] = useState(false);

  const [pdfFileVisible, setPdfFileVisible] = useState(false);

  const [categoryTooltipVisible, setCategoryTooltipVisible] = useState(false);

  const [tagsTooltipVisible, setTagsTooltipVisible] = useState(false);

  const [imagesTooltipVisible, setImagesTooltipVisible] = useState(false);

  // for the error messages

  const [uploadStatus, setUploadStatus] = useState(null);

  // for the spinner loader animation

  const [loading, setLoading] = useState(false);

  const fileInputRef = useRef(null);

  const imagesInputRef = useRef(null);

  const handlePreviewImageChange = (event) => {
    const file = event.target.files[0];

    if (file && file.type.includes("image")) {
      setPreviewImage(file);
    } else {
      setPreviewImage(null);
    }
  };

  const handleRemovePreviewImage = () => {
    setPreviewImage(null);

    // Clear the input field

    if (previewImageInputRef.current) {
      previewImageInputRef.current.value = "";
    }
  };

  const clearImageFields = () => {
    setImageFiles([]);
  };

  const handleProjectBelongsToSelect = (event) => {
    const selectedProjectBelongsTo = event.target.value;

    setProjectBelongsTo(selectedProjectBelongsTo);

    if (projectBelongsTo !== "1") {
      setCategory("");
    }
  };

  const handleCategorySelect = (event) => {
    const selectedCategory = event.target.value;

    setCategory(selectedCategory);
  };

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

  const isValidYoutubeLink = (link) => {
    const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+/;

    return youtubeRegex.test(link);
  };

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

  const handleRemoveYoutubeLink = (index) => {
    setAddedYoutubeLinks((prevAddedYoutubeLinks) => {
      const updatedLinks = [...prevAddedYoutubeLinks];

      updatedLinks.splice(index, 1);

      return updatedLinks;
    });
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files);

    // Check if it's a video file

    // Filter out non-image files

    const imageFiles = files.filter((file) => file.type.includes("image"));

    setImageFiles((prevImageFiles) => [...prevImageFiles, ...imageFiles]);
  };

  const handleDeleteImage = (index) => {
    setImageFiles((prevImageFiles) => {
      const updatedImageFiles = [...prevImageFiles];

      updatedImageFiles.splice(index, 1);

      return updatedImageFiles;
    });
  };

  const handlePdfFileChange = (event) => {
    const file = event.target.files[0]; // Get the first selected file

    // Check if a file was selected

    if (file) {
      // Check if it's a PDF file

      if (file.type === "application/pdf") {
        setPdfFile(file);

        setPdfFileSelected(true);
      } else {
        // Display an error message or perform any other action for non-PDF files

        alert("Please select a PDF file.");
      }
    } else {
      // Handle the case when the file selection is canceled

      setPdfFile(null);

      setPdfFileSelected(false);
    }
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
      category: category,
      tags: selectedTags,
      previewImage: previewImage,
      imageFiles,
      youtubeLinks: addedYoutubeLinks,
      projectBelongsTo: projectBelongsTo,
      pdfFile: pdfFile,
      uid: user.uid,
    };

    // Call the uploadProject function and pass the project object

    try {
      await uploadProject(project);

      // Additional logic after successful upload

      setUploadStatus("success");
      setTimeout(() => {
        router.push(`/profile/${user.uid}`);
      }, 2000);
    } catch (error) {
      console.error("Error uploading project:", error);

      setUploadStatus("error");

      // Additional error handling
    }

    setLoading(false);

    // Reset the form fields

    setPreviewImage(null);

    setPdfFile(null);

    setTitle("");

    setDescription("");

    setSelectedTags([]);

    setAddedLinks([]);

    setNewTag("");

    setProjectBelongsTo("");

    setCategory("");

    setNewLink("");

    setImageFiles([]);

    setAddedYoutubeLinks([]);

    clearImageFields(); // Clear the image fields

    // Access the name property of pdfFile only if it is not null

    const pdfFileName = pdfFile ? pdfFile.name : "";

    fileInputRef.current.value = "";

    imagesInputRef.current.value = "";

    previewImageInputRef.current.value = "";
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

  useEffect(() => {
    // Check if the imageFiles array is empty

    if (imageFiles.length === 0) {
      // If empty, set the value of the image input field to "no file chosen"

      imagesInputRef.current.value = "";
    }
  }, [imageFiles]);

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-2xl md:max-w-3xl lg:max-w-4xl xl:max-w-3xl 2xl:max-w-3xl mx-auto flex flex-col gap-4 items-center bg-gray-900 p-5 rounded-xl mb-5 mt-5"
    >
      <h1 className="text-center text-white text-2xl">Upload Project </h1>

      <hr className="h-px my-3 bg-gray-200 border-0 w-full "></hr>

      <div className="flex flex-col gap-2 items-start w-full relative">
        <label className="text-white flex items-top" htmlFor="title">
          Title: <span className="font-thin ml-3 text-pink-500">*</span>
          <span
            className="info-icon ml-1 cursor-pointer bg-gray-800 w-5 text-center rounded-sm  absolute right-0"
            onMouseEnter={() => setTitleTooltipVisible(true)}
            onMouseLeave={() => setTitleTooltipVisible(false)}
          >
            i
          </span>
          {titleTooltipVisible && (
            <div className="tooltip-right bg-gray-800  absolute right-6 text-white px-2 py-0 rounded-sm">
              Enter the project title
            </div>
          )}
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
          <span
            className="info-icon ml-1 cursor-pointer bg-gray-800 w-5 text-center rounded-sm  absolute right-0"
            onMouseEnter={() => setDescriptionTooltipVisible(true)}
            onMouseLeave={() => setDescriptionTooltipVisible(false)}
          >
            i
          </span>
          {descriptionTooltipVisible && (
            <div className="tooltip-right o bg-gray-800  absolute right-6 text-white px-2 py-0 rounded-sm">
              Enter the description of your project
            </div>
          )}
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
          <span
            className="info-icon ml-1 cursor-pointer bg-gray-800 w-5 text-center rounded-sm  absolute right-0"
            onMouseEnter={() => setPreviewImageTooltipVisible(true)}
            onMouseLeave={() => setPreviewImageTooltipVisible(false)}
          >
            i
          </span>
          {previewImageTooltipVisible && (
            <div className="tooltip-right o bg-gray-800  absolute right-6 text-white px-2 py-0 rounded-s">
              This image will be used on the card to preview your project.
              Please upload an image that is preferably square. (e.g. 400x400,
              600x600, 1000x1000)
            </div>
          )}
        </label>

        <input
          required
          ref={previewImageInputRef}
          type="file"
          id="previewImage"
          name="previewImage"
          onChange={handlePreviewImageChange}
          accept="image/*"
          className="border-gray-300 w-full rounded-sm bg-gray-700 text-white py-1 px-3"
        />
      </div>

      {previewImage && (
        <div className="grid grid-cols-2 gap-3 w-full">
          <div className="relative h-40 overflow-hidden bg-gray-400 bg-opacity-10 rounded-lg">
            <img
              src={URL.createObjectURL(previewImage)}
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
          <span
            className="info-icon ml-1 cursor-pointer bg-gray-800 w-5 text-center rounded-sm  absolute right-0"
            onMouseEnter={() => setBelongsToTooltipVisible(true)}
            onMouseLeave={() => setBelongsToTooltipVisible(false)}
          >
            i
          </span>
          {belongsToTooltipVisible && (
            <div className="tooltip-right o bg-gray-800  absolute right-6 text-white px-2 py-0 rounded-sm">
              Select if this project belong to a course from a specific year or
              if it is a finalwork
            </div>
          )}
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
            <span
              className="info-icon ml-1 cursor-pointer bg-gray-800 w-5 text-center rounded-sm  absolute right-0"
              onMouseEnter={() => setCategoryTooltipVisible(true)}
              onMouseLeave={() => setCategoryTooltipVisible(false)}
            >
              i
            </span>
            {categoryTooltipVisible && (
              <div className="tooltip-right bg-gray-800  absolute right-6 text-white px-2 py-0 rounded-sm">
                To which category does this group belong
              </div>
            )}
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
          <span
            className="info-icon ml-1 cursor-pointer bg-gray-800 w-5 text-center rounded-sm  absolute right-0"
            onMouseEnter={() => setTagsTooltipVisible(true)}
            onMouseLeave={() => setTagsTooltipVisible(false)}
          >
            i
          </span>
          {tagsTooltipVisible && (
            <div className="tooltip-right bg-gray-800  absolute right-6 text-white px-2 py-0 rounded-sm">
              Which technologies were used to create this project,...search in
              the already existing list or add your own tags
            </div>
          )}
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
          <span
            className="info-icon ml-1 cursor-pointer bg-gray-800 w-5 text-center rounded-sm  absolute right-0"
            onMouseEnter={() => setLinksTooltipVisible(true)}
            onMouseLeave={() => setLinksTooltipVisible(false)}
          >
            i
          </span>
          {linksTooltipVisible && (
            <div className="tooltip-right o bg-gray-800  absolute right-6 text-white px-2 py-0 rounded-sm">
              Used for links to github repository, website link,...etc
            </div>
          )}
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

      <div className="flex flex-col gap-2 items-start w-full relative">
        <label className="text-white flex items-center" htmlFor="links">
          Youtube links:
          <span
            className="info-icon ml-1 cursor-pointer bg-gray-800 w-5 text-center rounded-sm  absolute right-0"
            onMouseEnter={() => setLinksYoutubeLinkVisible(true)}
            onMouseLeave={() => setLinksYoutubeLinkVisible(false)}
          >
            i
          </span>
          {linksYoutubeLinkVisible && (
            <div className="tooltip-right o bg-gray-800  absolute right-6 text-white px-2 py-0 rounded-s">
              Only youtube urls are allowed. It is possible to add multiple
              youtube videos
            </div>
          )}
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

        {/* Render the selected links */}

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
          <span
            className="info-icon ml-1 cursor-pointer bg-gray-800 w-5 text-center rounded-sm  absolute right-0"
            onMouseEnter={() => setPdfFileVisible(true)}
            onMouseLeave={() => setPdfFileVisible(false)}
          >
            i
          </span>
          {pdfFileVisible && (
            <div className="tooltip-right o bg-gray-800  absolute right-6 text-white px-2 py-0 rounded-s">
              Only pdf files are allowed, if possible compress the pdf file to
              make the size smaller
            </div>
          )}
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

        {pdfFileSelected ? (
          <span className="text-gray-400">{pdfFile ? pdfFile.name : ""}</span>
        ) : null}
      </div>

      <hr className="h-px my-3 bg-gray-200 border-0 w-full "></hr>

      <div className="flex flex-col gap-2 items-start w-full relative">
        <label className="text-white flex items-top" htmlFor="images">
          Other images:
          <span
            className="info-icon ml-1 cursor-pointer bg-gray-800 w-5 text-center rounded-sm  absolute right-0"
            onMouseEnter={() => setImagesTooltipVisible(true)}
            onMouseLeave={() => setImagesTooltipVisible(false)}
          >
            i
          </span>
          {imagesTooltipVisible && (
            <div className="tooltip-right o bg-gray-800  absolute right-6 text-white px-2 py-0 rounded-s">
              You are able to add as much images files as you want
            </div>
          )}
        </label>

        <input
          ref={imagesInputRef}
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
