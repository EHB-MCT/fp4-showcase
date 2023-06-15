import React, { useState, useEffect, useContext, useRef } from "react";
import tagsData from "../data/tags.json";
import { firestore, uploadProject } from "../lib/firebase";
import { UserContext } from "../lib/context";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import ButtonPink from "./ButtonPink";

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
    if (projectBelongsTo !== "1"){
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
      console.log("Project uploaded successfully");
      // Additional logic after successful upload
      setUploadStatus("success");
    } catch (error) {
      console.error("Error uploading project:", error);
      setUploadStatus("error");
      // Additional error handling
    }

    setLoading(false);

    console.log("title => ", title);
    console.log("description => ", description);
    console.log("links (optional) =>", addedLinks);
    console.log("cluster =>", category);
    console.log("tags =>", selectedTags);
    console.log("video links =>", addedYoutubeLinks);
    console.log("project belongs to => ", projectBelongsTo);
    console.log("image files =>", imageFiles);
    console.log("pdf file =>", pdfFile);

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
      }, 5000);
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

      className="w-2/2 flex flex-col gap-4 items-cente p-5 rounded-xl mb-5 mt-5 border-2 border-purple-500"

    >
      <h1>Upload Project </h1>
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

        <div style={{ position: 'relative' }}>
  <svg width="570" height="50">
    <path
      id="Path_1213"
      data-name="Path 1213"
      d="M1618.957,5931.394v-27.36l-18.019-13.388-538.938,1.6v27.544l17.982,11.6Z"
      transform="translate(-1061 -5889.645)"
      fill="#202033"
      stroke="#fff"
      strokeWidth="2"
      opacity="0.66"
    />
  </svg>
      <input
          placeholder="Write your project title here..."
          type="text"
          id="title"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          style={{ position: 'absolute', top: '1px' }}
          className="border-none p-2 w-full rounded-sm bg-transparent text-white"
          required
        />
    </div>

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
        <div style={{ position: 'relative' }}>
  <svg width="570" height="115">
  <path id="Path_1266" data-name="Path 1266" d="M1618.957,6012.24v-83.484l-18.074-28.486L1062,5900.263v81.768l18.916,30.211Z" transform="translate(-1061 -5899.263)" fill="#202033" stroke="#fff" stroke-width="2" opacity="0.66"/>
  </svg>
<textarea
          placeholder="Write a description about your project..."
          id="description"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          style={{ position: 'absolute', top: '1px', width: '98%', height: '110px', borderRadius: '30px' }}
          className="border-none p-2 w-full rounded-sm bg-transparent text-white"
          required
        />
    </div>
      </div>
      <hr className="h-px my-3 bg-gray-200 border-0 w-full "></hr>
      <div className="flex flex-col gap-2 items-start w-full relative">
        <label className="text-white flex items-top" htmlFor="previewImage">
          Project preview image:{" "}
          <span className="font-thin ml-3 text-pink-500">*</span>
          <span className="font-thin ml-3 text-gray-500">(preferably square)</span>
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
              This image will be used on the card to preview your
              project. Please upload an image that is preferably square. (e.g. 400x400, 600x600, 1000x1000)
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



        <div style={{ position: 'relative', width:'97%' }}>
  <svg width="570" height="50" style={{ position: 'absolute', top: '0', left: '0', zIndex: '-1' }}>
    <path
      id="Path_1267"
      data-name="Path 1267"
      d="M1618.957,5931.394v-27.36l-18.019-13.388-538.938,1.6v27.544l17.982,11.6Z"
      transform="translate(-1061 -5889.645)"
      fill="#202033"
      stroke="#fff"
      strokeWidth="2"
      opacity="0.66"
    />
  </svg>
  <select
    placeholder="select"
    id="projectBelongsTo"
    value={projectBelongsTo}
    onChange={handleProjectBelongsToSelect}
    style={{ width: '100%', zIndex: '2' }}
    className="border-none p-2 w-full rounded-sm bg-transparent text-white"
  >
    <option value="1">1st year</option>
    <option value="2">2nd year</option>
    <option value="3">3rd year</option>
    <option value="finalwork">finalwork</option>
  </select>
</div>
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

          <div style={{ position: 'relative', width:'97%' }}>
  <svg width="570" height="50" style={{ position: 'absolute', top: '0', left: '0', zIndex: '-1' }}>
    <path
      id="Path_1267"
      data-name="Path 1267"
      d="M1618.957,5931.394v-27.36l-18.019-13.388-538.938,1.6v27.544l17.982,11.6Z"
      transform="translate(-1061 -5889.645)"
      fill="#202033"
      stroke="#fff"
      strokeWidth="2"
      opacity="0.66"
    />
  </svg>
  <select
            placeholder="category select"
            id="category"
            value={category}
            onChange={handleCategorySelect}
            className="border-none p-2 w-full rounded-sm bg-transparent text-white"
          >
            <option value="" disabled hidden>
              Choose
            </option>
            <option value="Motion">Motion</option>
            <option value="Web & App">Web & App</option>
            <option value="Emerging Technology">Emerging Technology</option>
            <option value="Extended Reality">Extended Reality</option>
          </select>
</div>
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
        <div style={{ position: 'relative', width: '23%'}}>
  <svg width="125" height="50" style={{ position: 'absolute', top: '0', left: '0', zIndex: '-1' }}>
  <g id="Path_1279" data-name="Path 1279" transform="translate(124.136 42.749) rotate(180)" fill="none">
    <path d="M0,.232,107.213,0l16.923,12.58V42.749H0Z" stroke="none"/>
    <path d="M 106.5530700683594 2.001434326171875 L 2 2.228050231933594 L 2 40.74853897094727 L 122.1357421875 40.74853897094727 L 122.1357421875 13.58554840087891 L 106.5530700683594 2.001434326171875 M 107.2130889892578 -3.814697265625e-06 L 124.1357421875 12.58024978637695 L 124.1357421875 42.74853897094727 L 0 42.74853897094727 L 0 0.2323760986328125 L 107.2130889892578 -3.814697265625e-06 Z" stroke="none" fill="#fff"/>
  </g>
 </svg>
  <select
            id="tags"
            value={newTag}
            onChange={handleTagSelect}
            style={{width: '83%'}}
            className="border-none p-2 w-full rounded-sm bg-transparent text-white"
          >
            <option value="">Select a tag</option>
            {tagsData.map((tag) => (
              <option key={tag} value={tag}>
                {tag}
              </option>
            ))}
          </select>
</div>


        <div style={{ position: 'relative' }}>
  <svg width="332" height="50">  
  <path id="Path_1280" data-name="Path 1280" d="M1387.318,5930.639v-41.872l-107.349,1.128H1062v29.346l11.842,11.4Z" transform="translate(-1061 -5887.757)" fill="#202033" stroke="#fff" stroke-width="2" opacity="0.66"/>
  </svg>
  <input
            placeholder="Add a non existing tag..."
            type="text"
            value={newTag}
            style={{position: 'absolute',top: '1px'}}
            onChange={(event) => setNewTag(event.target.value)}
            className="border-none p-2 w-full rounded-sm bg-transparent text-white"
          />
    </div>


<div style={{ position: 'relative' }}>
  <svg width="100" height="50" style={{ position: 'absolute', top: '0', left: '0', zIndex: '0',  pointerEvents: 'none' }}>
  <g id="Path_1279" data-name="Path 1279" transform="translate(0 1.724)" fill="none">
    <path d="M0-1.724H77.614L93.364,13.253V41.9H0Z" stroke="none"/>
    <path d="M 1.999992370605469 0.2755851745605469 L 1.999992370605469 39.90145111083984 L 91.363525390625 39.90145111083984 L 91.363525390625 14.11148071289062 L 76.81528472900391 0.2755851745605469 L 1.999992370605469 0.2755851745605469 M -7.62939453125e-06 -1.724414825439453 L 77.61447143554688 -1.724414825439453 L 93.363525390625 13.25349235534668 L 93.363525390625 41.90145111083984 L -7.62939453125e-06 41.90145111083984 L -7.62939453125e-06 -1.724414825439453 Z" stroke="none" fill="#fff"/>
  </g>
  </svg>
  <button
            type="submit"
            onClick={handleTagChange}
            className=" text-white px-2 rounded-sm ml-1 mt-2"
          >
            Add Tag
          </button>
</div>
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
        <div style={{ position: 'relative' }}>
  <svg width="470" height="50">  
  <path id="Path_1280" data-name="Path 1280" d="M1524.318,5931.394v-42.626l-152.557,1.148H1062v29.876l16.828,11.6Z" transform="translate(-1061 -5887.761)" fill="#202033" stroke="#fff" stroke-width="2" opacity="0.66"/>
  </svg>
  <input
            placeholder="url..."

            type="text"
            value={newLink}
            onChange={(event) => setNewLink(event.target.value)}
            style={{position: 'absolute',top: '1px'}}
            className="border-none p-2 w-full rounded-sm bg-transparent text-white"
          />
    </div>
<div style={{ position: 'relative' }}>
  <svg width="100" height="50" style={{ position: 'absolute', top: '0', left: '0', zIndex: '0',  pointerEvents: 'none' }}>
  <g id="Path_1279" data-name="Path 1279" transform="translate(0 1.724)" fill="none">
    <path d="M0-1.724H77.614L93.364,13.253V41.9H0Z" stroke="none"/>
    <path d="M 1.999992370605469 0.2755851745605469 L 1.999992370605469 39.90145111083984 L 91.363525390625 39.90145111083984 L 91.363525390625 14.11148071289062 L 76.81528472900391 0.2755851745605469 L 1.999992370605469 0.2755851745605469 M -7.62939453125e-06 -1.724414825439453 L 77.61447143554688 -1.724414825439453 L 93.363525390625 13.25349235534668 L 93.363525390625 41.90145111083984 L -7.62939453125e-06 41.90145111083984 L -7.62939453125e-06 -1.724414825439453 Z" stroke="none" fill="#fff"/>
  </g>
  </svg>
  <button
            type="submit"
            onClick={handleLinkChange}
            className=" text-white px-2 rounded-sm ml-1 mt-2"
          >
            Add Link
          </button>
</div>
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
        <div style={{ position: 'relative' }}>
  <svg width="470" height="50">  
  <path id="Path_1280" data-name="Path 1280" d="M1524.318,5931.394v-42.626l-152.557,1.148H1062v29.876l16.828,11.6Z" transform="translate(-1061 -5887.761)" fill="#202033" stroke="#fff" stroke-width="2" opacity="0.66"/>
  </svg>
                    <input
            placeholder="url..."
            type="text"
            value={newYoutubeLink}
            style={{position: 'absolute',top: '1px'}}
            onChange={(event) => setNewYoutubeLink(event.target.value)}
            className="border-none p-2 w-full rounded-sm bg-transparent text-white"
          />
    </div>
    <div style={{ position: 'relative' }}>
  <svg width="100" height="50" style={{ position: 'absolute', top: '0', left: '0', zIndex: '0',  pointerEvents: 'none' }}>
  <g id="Path_1279" data-name="Path 1279" transform="translate(0 1.724)" fill="none">
    <path d="M0-1.724H77.614L93.364,13.253V41.9H0Z" stroke="none"/>
    <path d="M 1.999992370605469 0.2755851745605469 L 1.999992370605469 39.90145111083984 L 91.363525390625 39.90145111083984 L 91.363525390625 14.11148071289062 L 76.81528472900391 0.2755851745605469 L 1.999992370605469 0.2755851745605469 M -7.62939453125e-06 -1.724414825439453 L 77.61447143554688 -1.724414825439453 L 93.363525390625 13.25349235534668 L 93.363525390625 41.90145111083984 L -7.62939453125e-06 41.90145111083984 L -7.62939453125e-06 -1.724414825439453 Z" stroke="none" fill="#fff"/>
  </g>
  </svg>
  <button
            type="submit"
            onClick={handleYoutubeLinkChange}
            className=" text-white px-2 rounded-sm ml-1 mt-2"
          >
            Add Link
          </button>
</div>


          <br></br>

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
        <div style={{ position: 'relative' }}>
        <svg width="570" height="50">
    <path
      id="Path_1213"
      data-name="Path 1213"
      d="M1618.957,5931.394v-27.36l-18.019-13.388-538.938,1.6v27.544l17.982,11.6Z"
      transform="translate(-1061 -5889.645)"
      fill="#202033"
      stroke="#fff"
      strokeWidth="2"
      opacity="0.66"
    />
  </svg>
  <input
          type="file"
          id="pdfFile"
          name="pdfFile"
          onChange={handlePdfFileChange}
          accept=".pdf"
          style={{position:'absolute', top:'1px'}}
          className="border-none p-2 w-full rounded-sm bg-transparent text-white ml-5"
          ref={fileInputRef}
        />
        {pdfFileSelected ? (
          <span className="text-gray-400">{pdfFile ? pdfFile.name : ""}</span>
        ) : null}
    </div>

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

        <div style={{ position: 'relative' }}>
        <svg width="570" height="50">
    <path
      id="Path_1213"
      data-name="Path 1213"
      d="M1618.957,5931.394v-27.36l-18.019-13.388-538.938,1.6v27.544l17.982,11.6Z"
      transform="translate(-1061 -5889.645)"
      fill="#202033"
      stroke="#fff"
      strokeWidth="2"
      opacity="0.66"
    />
  </svg>
  <input
          ref={imageInputRef}
          type="file"
          id="images"
          name="images"
          onChange={handleFileChange}
          accept="image/*"
          style={{position:'absolute', top:'1px'}}
          className="border-none p-2 w-full rounded-sm bg-transparent text-white ml-5"
        />
    </div>
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

{  /*    <button
        type="submit"
        className="bg-green-500 text-white px-4 py-2 rounded-md mt-4 w-full"
      >
        Submit
      </button> */}
      <ButtonPink title="Submit" color='white' />
    </form>
  );
};

export default UploadProjectForm;
