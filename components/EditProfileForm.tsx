import { useEffect, useState, useRef, useContext } from "react";
import { UserContext } from "../lib/context";
import { getUserById, editProfile } from "../lib/users";
import { useRouter } from "next/router";
import Image from "next/image";
import tagsData from "../data/tags.json";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-regular-svg-icons";
const EditProfileForm = ({ uid }) => {
  const maxCharAboutMe = 350;
  // router
  const router = useRouter();
  const { user } = useContext(UserContext);
  const [aboutMe, setAboutMe] = useState("");

  const [profileImage, setProfileImage] = useState(null);
  const [userObject, setUserObject] = useState(null);

  //interests
  const [newInterest, setNewInterest] = useState("");
  const [selectedInterests, setSelectedInterests] = useState([]);
  const [isPageLoading, setIsPageLoading] = useState(true);
  // upload form project tsatus
  const [uploadFormStatus, setUploadFormStatus] = useState(null);
  // loading state
  const [submitLoading, setSubmitLoading] = useState(false);
  // aboutme textarea remaining characters
  const [remainingChars, setRemainingChars] = useState(350);
  // links
  const [newLink, setNewLink] = useState("");
  const [addedLinks, setAddedLinks] = useState([]);
  // errors
  const [linkError, setLinkError] = useState(false);
  // profile image
  const previewImageInputRef = useRef(null);
  const [previewImageUrl, setPreviewImageUrl] = useState(null);
  const [previewImageUrlReplaced, setPreviewImageUrlReplaced] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const bannerImageInputRef = useRef(null);
  const [bannerImageUrl, setBannerImageUrl] = useState(null);
  const [bannerImageUrlReplaced, setBannerImageUrlReplaced] = useState(false);
  const [bannerImage, setBannerImage] = useState(null);



  useEffect(() => {
    async function fetchData() {
      if (uid === user?.uid) {
        const userObject = await getUserById(uid);
        setUserObject(userObject);
      } else {
        router.push(`/profile/${uid}`);
      }
      setIsPageLoading(false);
    }
    fetchData();
  }, [uid]);

  useEffect(() => {
    if (userObject) {
      setAboutMe(userObject.aboutMe);
      setSelectedInterests(userObject.interests);
      setAddedLinks(userObject?.socials || []);
      setPreviewImage(userObject?.previewImageUrl ||"");
      setPreviewImageUrl(userObject?.previewImageUrl || "");
      setBannerImage(userObject?.bannerImageUrl ||"");
      setBannerImageUrl(userObject?.bannerImageUrl || "");

      const remainingCharsCount = maxCharAboutMe - userObject.aboutMe.length;
      setRemainingChars(remainingCharsCount);
    }
  }, userObject);

  // console log changes to inputfield in the form
  useEffect(() => {
    console.log(aboutMe);
    console.log(selectedInterests);
    console.log(previewImage);
      console.log(bannerImage);
  }, [aboutMe, previewImage,bannerImage, selectedInterests]);

  // submit form handling
  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitLoading(true);
    console.log("submitted the form");
    const userObject = {
      uid,
      aboutMe,
      socials: addedLinks,
      interests: selectedInterests,
      previewImage: previewImage  ? previewImage : "",
      bannerImage: bannerImage ? bannerImage : "",
    };

    try {
      await editProfile(userObject);

      console.log("Project uploaded successfully");

      // Additional logic after successful upload

      setUploadFormStatus("success");

      setTimeout(() => {
        router.push(`/profile/${uid}`);
      }, 2000);
    } catch (error) {
      console.error("Error uploading project:", error);

      setUploadFormStatus("error");

      // Additional error handling
    }
    setSubmitLoading(false);
  };

  // handle the go back button click
  const handleGoBackClick = () => {
    router.push(`/profile/${uid}`);
  };

  // <-----properties changes and events------>

  const handleInterestChange = (event) => {
    event.preventDefault();

    // Check if the new tag already exists in the selected tags
    if (
      selectedInterests &&
      !selectedInterests.includes(newInterest) &&
      newInterest.trim() !== ""
    ) {
      setSelectedInterests((prevSelectedTags) => [
        ...prevSelectedTags,
        newInterest,
      ]);
    }

    // Clear the newTag input field
    setNewInterest("");
  };

  const handleInterestSelect = (event) => {
    const selectedTag = event.target.value;

    // Check if the selected tag is not empty and doesn't already exist in selectedTags
    if (
      selectedTag !== "" &&
      selectedInterests &&
      !selectedInterests.includes(selectedTag)
    ) {
      setSelectedInterests((prevSelectedTags) => [
        ...prevSelectedTags,
        selectedTag,
      ]);
    }
  };

  const handleRemoveInterest = (index) => {
    setSelectedInterests((prevSelectedTags) => {
      const updatedTags = [...prevSelectedTags];

      updatedTags.splice(index, 1);

      return updatedTags;
    });
  };
  const handleAboutMeChange = (event) => {
    const inputText = event.target.value;
    setAboutMe(inputText);
    const remainingCharsCount = maxCharAboutMe - inputText.length;
    setRemainingChars(remainingCharsCount);
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

  // profile picture

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

  // banner picture

  const handleBannerImageChange = (event) => {
    const file = event.target.files[0];
    setBannerImageUrlReplaced(true);
    if (file && file.type.includes("image")) {
      setBannerImage(file);
      const reader = new FileReader();
      reader.onload = () => {
        setBannerImageUrl(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setBannerImage(null);

    }
  };

  const handleRemoveBannerImage = () => {
    setBannerImage(null);
    setBannerImageUrl(null);

    // Clear the input field
    if (previewImageInputRef.current) {
      previewImageInputRef.current.value = "";
    }
  };


  useEffect(() => {
    let timer;

    if (uploadFormStatus) {
      timer = setTimeout(() => {
        setUploadFormStatus(null);
      }, 2000);
    }

    return () => clearTimeout(timer);
  }, [uploadFormStatus]);


  if (isPageLoading) {
    return <div>Loading...</div>;
  }


  //

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-2xl md:max-w-3xl lg:max-w-4xl xl:max-w-3xl 2xl:max-w-3xl mx-auto flex flex-col gap-4 items-center bg-gray-900 p-5 rounded-xl mb-5 mt-5 relative"
    >
      <h1 className="text-center text-white text-2xl inline-flex gap-4 object-center ">
        Edit Profile{" "}
        <FontAwesomeIcon
          icon={faUser}
          color="#ffffff"
          style={{ width: 40, height: 30 }}
        />
      </h1>
      <button
        onClick={handleGoBackClick}
        style={{ position: "absolute", left: "6%" }}
      >
        <Image
          style={{ rotate: "180deg" }}
          src="/images/sliderNext.svg"
          alt="Your SVG"
          width={30}
          height={30}
        />
      </button>
      <hr className="h-px my-3 bg-gray-200 border-0 w-full "></hr>

      <div className="flex flex-col gap-2 items-start w-full relative">
        <label className="text-white flex items-top" htmlFor="description">
          Description: <span className="font-thin ml-3 text-pink-500">*</span>
        </label>
        {userObject && (
          <div className="flex justify-end text-sm text-gray-400">
            Remaining characters: {remainingChars}
          </div>
        )}

        <textarea
          placeholder="Write a description about your project..."
          id="description"
          value={aboutMe}
          onChange={handleAboutMeChange}
          className=" border-gray-300 p-2 w-90 h-40 resize-none w-full rounded-sm bg-gray-700 text-white "
          required
          maxLength={maxCharAboutMe}
        />
      </div>

      <hr className="h-px my-3 bg-gray-200 border-0 w-full "></hr>

      <div className="flex flex-col gap-2 items-start w-full relative">
        <label className="text-white flex items-top" htmlFor="tags">
          Interests:
        </label>

        <div className="flex w-full">
          <select
            id="tags"
            value={newInterest}
            onChange={handleInterestSelect}
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
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                event.preventDefault();
              }
            }}
            placeholder="Add a non existing tag..."
            type="text"
            value={newInterest}
            onChange={(event) => setNewInterest(event.target.value)}
            className=" border-gray-300  ml-1 flex-grow rounded-r-sm bg-gray-700 text-white pl-3"
          />

          <button
            type="submit"
            onClick={handleInterestChange}
            className="bg-purple-600 text-white px-3 rounded-sm ml-1"
          >
            Add Tag
          </button>
        </div>

        {/* Render the selected tags */}

        <div className="flex flex-wrap gap-2 rounded-md">
          {selectedInterests?.map((tag, index) => (
            <span
              key={index}
              className="bg-white text-gray-600 px-3 py-1 rounded-xl"
            >
              {tag}

              <button
                type="button"
                onClick={() => handleRemoveInterest(index)}
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
          Socials:
        </label>

        <div className="flex w-full">
          <input
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                event.preventDefault();
              }
            }}
            placeholder="e.g. facebook profile, linkedIn profile, github profile"
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
            Add Social
          </button>
        </div>

        {linkError == true && (
          <p className="text-red-500">This is not a valid link</p>
        )}

        <div className="flex flex-wrap gap-2 rounded-md">
          {addedLinks?.map((link, index) => (
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
        <label className="text-white flex items-top" htmlFor="previewImage">
          Profile image:{" "}

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
  <label className="text-white flex items-top" htmlFor="previewImage">
    Banner image:{" "}
    
  </label>

  <input
   
    ref={bannerImageInputRef}
    type="file"
    id="previewImage"
    name="previewImage"
    onChange={handleBannerImageChange}
    accept="image/*"
    className="border-gray-300 w-full rounded-sm bg-gray-700 text-white py-1 px-3"
  />
</div>

{bannerImageUrl && typeof window !== "undefined" && (
  <div className="grid grid-cols-2 gap-3 w-full">
    <div className="relative h-40 overflow-hidden bg-gray-400 bg-opacity-10 rounded-lg">
      <img
        src={bannerImageUrl}
        alt="Project Preview Image"
        className="absolute top-0 left-0 h-full w-full object-contain pt-1"
      />

      <button
        type="button"
        onClick={handleRemoveBannerImage}
        className="absolute top-0 right-2 text-red-500 text-3xl p-1 cursor-pointer ml-2"
      >
        X
      </button>
    </div>
  </div>
)}


      {submitLoading && <div className="text-white">Loading...</div>}

      {uploadFormStatus === "success" && (
        <p className="text-green-500">Edit successful!</p>
      )}

      {uploadFormStatus === "error" && (
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

export default EditProfileForm;
