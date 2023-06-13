import React, { useState, useEffect, useContext } from "react";
import tagsData from "../data/tags.json";
import { firestore, uploadProject, uploadAward } from "../lib/firebase";
import { UserContext } from "../lib/context";

const UploadAwardForm = () => {
  const { user } = useContext(UserContext);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [cluster, setCluster] = useState("");
  const [imageFiles, setImageFiles] = useState([]);
  const [year, setYear] = useState("");
  const [cardImage, setCardImage] = useState(null);
  const [bannerImage, setBannerImage] = useState(null);
  const [cardImagePreview, setCardImagePreview] = useState(null);
  const [bannerImagePreview, setBannerImagePreview] = useState(null);
  // for the error messages
  const [uploadStatus, setUploadStatus] = useState(null);
  // for the spinner loader animation
  const [loading, setLoading] = useState(false);

  const handleYearSelect = (event) => {
    const selectedYear = event.target.value;
    setYear(selectedYear);
  };

  const handleClusterSelect = (event) => {
    const selectedCluster = event.target.value;
    setCluster(selectedCluster);
  };

  const handleCardImageChange = (event) => {
    const files = Array.from(event.target.files);
    const imageFiles = files.filter((file) => file.type.includes("image"));

    if (imageFiles.length > 0) {
      setCardImage(imageFiles[0]);
    }

    const imagePreviews = imageFiles.map((file) => URL.createObjectURL(file));
    setCardImagePreview(imagePreviews[0]);
  };

  const handleBannerImageChange = (event) => {
    const files = Array.from(event.target.files);
    const imageFiles = files.filter((file) => file.type.includes("image"));

    if (imageFiles.length > 0) {
      setBannerImage(imageFiles[0]);
    }

    const imagePreviews = imageFiles.map((file) => URL.createObjectURL(file));
    setBannerImagePreview(imagePreviews[0]);
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
      cardImage,
      bannerImage,
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
    setCardImagePreview(null);
    setBannerImagePreview(null);
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
      className="w-9/10 md:w-1/2 flex flex-col gap-4 items-center bg-gray-900 p-5 rounded-xl mb-5 mt-5"
    >
      <h1 className="text-center text-white text-2xl">Upload Award</h1>
      <hr className="h-px my-3 bg-gray-200 border-0 w-full "></hr>
      <div className="flex flex-col gap-2 items-start w-full">
        <label className="text-white" htmlFor="title">
          Title:
        </label>
        <input
          placeholder="Write the award title here..."
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
          placeholder="Write a description about the award..."
          id="description"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          className=" border-gray-300 p-2 w-90 h-40 resize-none w-full rounded-sm bg-gray-700 text-white "
          required
        />
      </div>

   



      <hr className="h-px my-3 bg-gray-200 border-0 w-full "></hr>
      <div className="flex flex-col gap-2 items-start w-full">
        <label className="text-white" htmlFor="images">
          Card Image (Thumbnail) :
        </label>
        <input
          required
          type="file"
          id="images"
          name="images"
          onChange={handleCardImageChange}
          accept="image/*"
          className="border-gray-300 w-full rounded-sm bg-gray-700 text-white py-1 px-3"
        />
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
          Banner Image :
        </label>
        <input
          required
          type="file"
          id="images"
          name="images"
          onChange={handleBannerImageChange}
          accept="image/*"
          className="border-gray-300 w-full rounded-sm bg-gray-700 text-white py-1 px-3"
        />
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

export default UploadAwardForm;
