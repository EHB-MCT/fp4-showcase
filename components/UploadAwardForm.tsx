import React, { useState, useEffect, useContext ,useRef} from "react";
import tagsData from "../data/tags.json";
import { firestore, uploadProject, uploadAward } from "../lib/firebase";
import { UserContext } from "../lib/context";
import ButtonPink from "./ButtonPink";

const UploadAwardForm = () => {
  const { user } = useContext(UserContext);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [imageFiles, setImageFiles] = useState([]);

  const [cardImage, setCardImage] = useState(null);
  const [bannerImage, setBannerImage] = useState(null);
  const [winnerBadgeImage, setWinnerBadgeImage] = useState(null);
  const [cardImagePreview, setCardImagePreview] = useState(null);
  const [bannerImagePreview, setBannerImagePreview] = useState(null);
  const [winnerBadgeImagePreview, setWinnerBadgeImagePreview] = useState(null);

  // for the error messages
  const [uploadStatus, setUploadStatus] = useState(null);
  // for the spinner loader animation
  const [loading, setLoading] = useState(false);


  // file refs for each input field
  const cardImageRef = useRef(null);
  const bannerImageRef = useRef(null);
  const winnerBadgeImageRef = useRef(null)


  // does the award have a category, "yes" = true
  const [awardBelongsToCategory, setAwardBelongsToCategory] = useState(false);

 

  const handleCategorySelect = (event) => {

    const selectedCategory = event.target.value;

    setCategory(selectedCategory);

  };


  const handleAwardBelongsToSelect = (event) => {
    const value = event.target.value === 'true';
    if (!value){
      setCategory("");
    }
    setAwardBelongsToCategory(value);
  };
  
  const handleCardImageChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = Array.from(event.target.files);
    const imageFiles = files.filter((file) => file.type.includes("image"));

    if (imageFiles.length > 0) {
      setCardImage(imageFiles[0]);
    }

    const imagePreviews = imageFiles.map((file) => URL.createObjectURL(file));
    setCardImagePreview(imagePreviews[0]);
  };

  const handleBannerImageChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = Array.from(event.target.files);
    const imageFiles = files.filter((file) => file.type.includes("image"));

    if (imageFiles.length > 0) {
      setBannerImage(imageFiles[0]);
    }

    const imagePreviews = imageFiles.map((file) => URL.createObjectURL(file));
    setBannerImagePreview(imagePreviews[0]);
  };

  const handleWinnerBadgeImageChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = Array.from(event.target.files);
    const imageFiles = files.filter((file) => file.type.includes("image"));

    if (imageFiles.length > 0) {
      setWinnerBadgeImage(imageFiles[0]);
    }

    const imagePreviews = imageFiles.map((file) => URL.createObjectURL(file));
    setWinnerBadgeImagePreview(imagePreviews[0]);
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
    const getCurrentYear = new Date().getFullYear();
    const project = {
      title,
      description,
      category,
      cardImage,
      bannerImage,
      winnerBadgeImage,
      currentYear: getCurrentYear,
    };

    try {
      await uploadAward(project);
      setUploadStatus("success");
      console.log("Project uploaded successfully");
    } catch (error) {
      setUploadStatus("error");
      console.error("Error uploading project:", error);
    }

    setLoading(false);

    setTitle("");
    setDescription("");
    setImageFiles([]);
    setCardImage(null);
    setBannerImage(null);
    setWinnerBadgeImage(null);
    setCardImagePreview(null);
    setBannerImagePreview(null);
    setWinnerBadgeImagePreview(null);
    setAwardBelongsToCategory(false);
    // Reset the file input field
    cardImageRef.current.value = "";
    bannerImageRef.current.value = "";
    winnerBadgeImageRef.current.value = ""; 

  };

  useEffect (( ) => {
    console.log(awardBelongsToCategory);
    console.log(category);
  
  },[category,awardBelongsToCategory,title,description])

  useEffect(() => {
    let timer;
    if (uploadStatus) {
      timer = setTimeout(() => {
        setUploadStatus(null);
      }, 5000);
    }
    return () => clearTimeout(timer);
  }, [uploadStatus]);

  const onClick = () => {
    console.log("clicked");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-2/2 flex flex-col gap-4 items-cente p-5 rounded-xl mb-5 mt-5 border-2 border-purple-500"
    >
      <h1 className="text-center text-white text-2xl">Upload Award</h1>
      <hr className="h-px my-3 bg-gray-200 border-0 w-full "></hr>
      <div className="flex flex-col gap-2 items-start w-full">
        <label className="text-white" htmlFor="title">
          Title: <span className="font-thin ml-3 text-pink-500">*</span>
        </label>

        <div style={{ position: "relative" }}>
          <svg
            width="100%"
            height="50"
            viewBox="0 0 570 50"
            preserveAspectRatio="none"
          >
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
            placeholder="Write the award title here..."
            type="text"
            id="title"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            style={{ position: "absolute", top: "1px", width: "80%" }}
            className="border-none p-2 w-full rounded-sm bg-transparent text-white w-90 mx-4  "
            required
          />
        </div>
      </div>

      <div className="flex flex-col gap-2 items-start w-full">
        <label className="text-white" htmlFor="description">
          Description: <span className="font-thin ml-3 text-pink-500">*</span>
        </label>

        <div style={{ position: "relative" }}>
          <svg
            width="100%"
            height="115"
            viewBox="0 0 570 115"
            preserveAspectRatio="none"
          >
            <path
              id="Path_1266"
              data-name="Path 1266"
              d="M1618.957,6012.24v-83.484l-18.074-28.486L1062,5900.263v81.768l18.916,30.211Z"
              transform="translate(-1061 -5899.263)"
              fill="#202033"
              stroke="#fff"
              stroke-width="2"
              opacity="0.66"
            />
          </svg>
          <textarea
            placeholder="Write a description about the award..."
            id="description"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            style={{
              position: "absolute",
              top: "1px",
              width: "98%",
              height: "110px",
              borderRadius: "30px",
            }}
            className="border-none p-2 w-full rounded-sm bg-transparent text-white"
            required
          />
        </div>
      </div>
      <hr className="h-px my-3 bg-gray-200 border-0 w-full "></hr>

      <div>
      <label className="text-white flex items-top" htmlFor="category">
        Does the award belong to a category?:
       
      </label>

      <div>
        <input
          type="radio"
          id="yes"
          name="awardBelongsTo"
          value="true"
          checked={awardBelongsToCategory === true}
          onChange={handleAwardBelongsToSelect}
        />
        <label htmlFor="yes">Yes</label>
      </div>

      <div>
        <input
          type="radio"
          id="no"
          name="awardBelongsTo"
          value="false"
          checked={awardBelongsToCategory === false}
          onChange={handleAwardBelongsToSelect}
        />
        <label htmlFor="no">No</label>
      </div>
    </div>

      {awardBelongsToCategory !== false ? (
        <div className="flex flex-col gap-2 items-start w-full relative">
          <label className="text-white flex items-top" htmlFor="category">
            Choose Category:
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

            <option value="Emerging Technology">Emerging Technology</option>

            <option value="Extended Reality">Extended Reality</option>
            
            <option value="Finalwork">Finalwork</option>
          </select>
        </div>
      ) : null}


      <hr className="h-px my-3 bg-gray-200 border-0 w-full "></hr>
      <div className="flex flex-col gap-2 items-start w-full">
        <label className="text-white" htmlFor="images">
          Card Image (Thumbnail) :{" "}
          <span className="font-thin ml-3 text-pink-500">*</span>
        </label>
        <div style={{ position: "relative" }}>
          <svg
            width="100%"
            height="50"
            viewBox="0 0 570 50"
            preserveAspectRatio="none"
          >
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
            required
            type="file"
            id="images"
            name="images"
            onChange={handleCardImageChange}
            accept="image/*"
            style={{ position: "absolute", top: "1px", width: "80%" }}
            className="border-none p-2 w-full rounded-sm bg-transparent text-white ml-5"
            ref={cardImageRef}
          />
        </div>

        {cardImagePreview && (
          <div className="relative h-40 overflow-hidden w-2/3 bg-gray-400 bg-opacity-10 rounded-lg flex items-center justify-center">
            <img
              src={cardImagePreview}
              alt="Card Image Preview"
              className="h-full w-full object-contain"
            />
          </div>
        )}
      </div>
      <hr className="h-px my-3 bg-gray-200 border-0 w-full" />
      <div className="flex flex-col gap-2 items-start w-full">
        <label className="text-white" htmlFor="images">
          Banner Image : <span className="font-thin ml-3 text-pink-500">*</span>
        </label>

        <div style={{ position: "relative" }}>
          <svg
            width="100%"
            height="50"
            viewBox="0 0 570 50"
            preserveAspectRatio="none"
          >
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
            required
            type="file"
            id="images"
            name="images"
            onChange={handleBannerImageChange}
            accept="image/*"
            style={{ position: "absolute", top: "1px", width: "80%" }}
            className="border-none p-2 w-full rounded-sm bg-transparent text-white w-90 mx-4  "
            ref={bannerImageRef}
          />
        </div>
        {bannerImagePreview && (
          <div className="relative h-40 overflow-hidden w-2/3 bg-gray-400 bg-opacity-10 rounded-lg flex items-center justify-center">
            <img
              src={bannerImagePreview}
              alt="Banner Image Preview"
              className="h-full w-full object-contain"
            />
          </div>
        )}
      </div>
      <hr className="h-px my-3 bg-gray-200 border-0 w-full" />
      <div className="flex flex-col gap-2 items-start w-full">
        <label className="text-white" htmlFor="images">
          Winner Badge Image : <span className="font-thin ml-3 text-pink-500">*</span>
        </label>
        <div style={{ position: "relative" }}>
          <svg
            width="100%"
            height="50"
            viewBox="0 0 570 50"
            preserveAspectRatio="none"
          >
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
            required
            type="file"
            id="images"
            name="images"
            onChange={handleWinnerBadgeImageChange}
            accept="image/*"
            style={{ position: "absolute", top: "1px", width: "80%" }}
            className="border-none p-2 w-full rounded-sm bg-transparent text-white ml-5"
            ref={winnerBadgeImageRef}
          />
        </div>

        {winnerBadgeImagePreview && (
          <div className="relative h-40 overflow-hidden w-2/3 bg-gray-400 bg-opacity-10 rounded-lg flex items-center justify-center">
            <img
              src={winnerBadgeImagePreview}
              alt="Winner Badge Image Preview"
              className="h-full w-full object-contain"
            />
          </div>
        )}
      </div>
      {loading && <div className="text-white">Loading...</div>}
      {uploadStatus === "success" && (
        <p className="text-green-500">Upload successful!</p>
      )}

      {uploadStatus === "error" && (
        <p className="text-red-500">Upload failed. Please try again.</p>
      )}
      <ButtonPink title="Submit" color="white" onClick={onClick} />
      {/* <button
        type="submit"
        className="bg-green-500 text-white px-4 py-2 rounded-md mt-4 w-full"
      >
        Submit
      </button> */}
    </form>
  );
};

export default UploadAwardForm;
