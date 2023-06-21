import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore, collection, where, getDocs,getDoc, query, limit,addDoc , serverTimestamp, updateDoc,doc} from "firebase/firestore";
import { getStorage , ref, uploadBytes, getDownloadURL,UploadTask,deleteObject} from "firebase/storage";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAIJKrsy0b0BZVHdsd0MWQY7yKVGzIwrDs",
  authDomain: "nextfire-projects-ehb.firebaseapp.com",
  projectId: "nextfire-projects-ehb",
  storageBucket: "nextfire-projects-ehb.appspot.com",
  messagingSenderId: "420606651434",
  appId: "1:420606651434:web:b87701594aac7f2c836753",
  measurementId: "G-FT4CDNVTPG"
};

// Initialize Firebase
function createFirebaseApp(config) {
    try {
        return getApp();
    } catch {
        return initializeApp(config);
    }
}

// const firebaseApp = initializeApp(firebaseConfig);
const firebaseApp = createFirebaseApp(firebaseConfig);

// Auth exports
export const auth = getAuth(firebaseApp);
export const googleAuthProvider = new GoogleAuthProvider();

// Firestore exports
export const firestore = getFirestore(firebaseApp);
// export const firestore = firebase.firestore();
// export { firestore };
// export const serverTimestamp = serverTimestamp;
// export const fromMillis = fromMillis;
// export const increment = increment;

// Storage exports
export const storage = getStorage(firebaseApp);
export const STATE_CHANGED = 'state_changed';

///Helper functions
// Gets a users/{uid} document with username
export async function getUserWithUsername(username) {
    const usersRef = collection(firestore, 'users');
    const q = query(usersRef, where('username', '==', username), limit(1));
    const querySnapshot = await getDocs(q);
    const userDoc = querySnapshot.docs[0];
    return userDoc;
}

/**`
 * Converts a firestore document to JSON
 * @param  {DocumentSnapshot} doc
 */
export function postToJSON(doc) {
  const data = doc.data();
  return {
    ...data,
    // Gotcha! firestore timestamp NOT serializable to JSON. Must convert to milliseconds
    createdAt: data.createdAt.toMillis(),
    updatedAt: data.updatedAt.toMillis(),
  };
}


export async function getAllTags(){
  const usersRef = collection(firestore, 'tags');
  
}






// <-----UPLOAD A PROJECT------>

export async function uploadProject(data){
  const {imageFiles, pdfFile, previewImage,...restData} = data;


  const imageUrls = await Promise.all(
    imageFiles.map((file) => {
      return new Promise((resolve, reject) => {
        const storageRef = ref(storage, `images/${file.name}`);
        const uploadTask = uploadBytes(storageRef, file);
  
        uploadTask
          .then((snapshot) => getDownloadURL(snapshot.ref))
          .then((downloadUrl) => resolve(downloadUrl))
          .catch((error) => reject(error));
      });
    })
  );

   // Upload the PDF file to Firebase Storage
   let pdfUrl = null;
   if (pdfFile) {
     // Upload the PDF file to Firebase Storage
     pdfUrl = await new Promise((resolve, reject) => {
       const storageRef = ref(storage, `pdfs/${pdfFile.name}`);
       const uploadTask = uploadBytes(storageRef, pdfFile);
 
       uploadTask
         .then((snapshot) => getDownloadURL(snapshot.ref))
         .then((downloadUrl) => resolve(downloadUrl))
         .catch((error) => reject(error));
     });
   }

     // Upload the Preview image file to Firebase Storage
     const previewImageUrl = await new Promise((resolve, reject) => {
      const storageRef = ref(storage, `images/${previewImage.name}`);
      const uploadTask = uploadBytes(storageRef, previewImage);
  
      uploadTask
        .then((snapshot) => getDownloadURL(snapshot.ref))
        .then((downloadUrl) => resolve(downloadUrl))
        .catch((error) => reject(error));
    });



 

   // Add the createdAt and updatedAt fields to the data object
   const timestamp = serverTimestamp();

     // Update the data with the download URLs
  const updatedData = {
    ...restData,
    likeCount: 0,
    previewImageUrl: previewImageUrl,
    imageUrls: [...imageUrls], 
    pdfUrl: pdfUrl,
    createdAt: timestamp,
    updatedAt: timestamp
  };



  // add the data to the "projects" collection
  const projectRef = collection(firestore, "projects");

  try {
    // Add the data to the "projects" collection
    await addDoc(projectRef, updatedData);
    console.log("Project uploaded successfully");
    // Additional logic after successful upload
  } catch (error) {
    console.error("Error uploading project:", error);
    // Additional error handling
  }
}


// <------EDIT A PROJECT-------> 

export async function editProject(data){
  const {projectId,previewImage,pdfFile,...restData} = data;

  let previewImageUrl;// Declare and assign a default value


   // Check if the previewImage is a URL
   if (typeof previewImage === "string") {
    // if its an URL, use it as the previewImageUrl
   previewImageUrl = previewImage;

   } else {
     // Get the existing project data
     const projectDocRef = doc(firestore, "projects", projectId);
     const projectDocSnap = await getDoc(projectDocRef);
     const existingData = projectDocSnap.data();

     // Check if there is a previous previewImageUrl
     if (
       existingData &&
       existingData.previewImageUrl &&
       existingData.previewImageUrl !== previewImageUrl
     ) {
       // Delete the previous image file from storage
       const previousImageRef = ref(storage, existingData.previewImageUrl);
       deleteObject(previousImageRef)
         .then(() => {
           console.log("Previous image file deleted successfully");
         })
         .catch((error) => {
           console.error("Error deleting previous image file:", error);
         });
     }
     // Upload the Preview image file to Firebase Storage
     previewImageUrl = await new Promise((resolve, reject) => {
       const storageRef = ref(storage, `images/${previewImage.name}`);
       const uploadTask = uploadBytes(storageRef, previewImage);

       uploadTask
         .then((snapshot) => getDownloadURL(snapshot.ref))
         .then((downloadUrl) => resolve(downloadUrl))
         .catch((error) => reject(error));
     });
   }


    // Upload the PDF file to Firebase Storage
    let pdfUrl = null;
       // Check if the pdfFile is a URL
    if (typeof pdfFile === "string"){
       // if its an URL, use it as the pdfUrl
      pdfUrl = pdfFile;
    }else {
        // Get the existing project data
        const projectDocRef = doc(firestore, "projects", projectId);
        const projectDocSnap = await getDoc(projectDocRef);
        const existingData = projectDocSnap.data();

     // Check if there is a previous previewImageUrl
      if (
        existingData &&
        existingData.pdfUrl &&
        existingData.pdfUrl !== pdfUrl
     ) {
       // Delete the previous image file from storage
       const previousPdfRef = ref(storage, existingData.pdfUrl);
       deleteObject(previousPdfRef)
         .then(() => {
           console.log("Previous image file deleted successfully");
         })
         .catch((error) => {
           console.error("Error deleting previous image file:", error);
         });
     }
      // Upload the PDF file to Firebase Storage
      pdfUrl = await new Promise((resolve, reject) => {
        const storageRef = ref(storage, `pdfs/${pdfFile.name}`);
        const uploadTask = uploadBytes(storageRef, pdfFile);
  
        uploadTask
          .then((snapshot) => getDownloadURL(snapshot.ref))
          .then((downloadUrl) => resolve(downloadUrl))
          .catch((error) => reject(error));
      });
    }
 

    




 

   // Add the createdAt and updatedAt fields to the data object
   const timestamp = serverTimestamp();


  

   
     // Update the data with the download URLs
  const editedData = {
    ...restData,
    previewImageUrl,
    pdfUrl,
    updatedAt: timestamp
  };



  // add the data to the "projects" collection
  const projectRef = doc(firestore, "projects", projectId);


  try {
    // Add the data to the "projects" collection
    await updateDoc(projectRef, editedData);
    console.log("Project uploaded successfully");
    // Additional logic after successful upload
  } catch (error) {
    console.error("Error uploading project:", error);
    // Additional error handling
  }
}








// <------UPLOAD AN AWARD------->


export async function uploadAward(data) {
  const { cardImage, bannerImage,winnerBadgeImage, ...restData } = data;

  // Upload the card image and get its download URL
  const cardImageUrl = await uploadImageAndGetUrl(cardImage, "cardImage");

  // Upload the banner image and get its download URL
  const bannerImageUrl = await uploadImageAndGetUrl(bannerImage, "bannerImage");

  // Upload the winner badge image and get its download URL
  const winnerBadgeImageUrl = await uploadImageAndGetUrl(winnerBadgeImage, "bannerImage");


  // Update the data with the download URLs
  const updatedData = {
    ...restData,
    cardImageUrl,
    bannerImageUrl,
    winnerBadgeImageUrl,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp()
  };

  // Add the data to the "awards" collection
  const awardsRef = collection(firestore, "awards");

  try {
    await addDoc(awardsRef, updatedData);
    console.log("Award uploaded successfully");
    // Additional logic after successful upload
  } catch (error) {
    console.error("Error uploading award:", error);
    // Additional error handling
  }
}

// upload the image to the storage "images" and get the the download to save in the collection "awards" document for this award.
async function uploadImageAndGetUrl(file, imageName) {
  return new Promise((resolve, reject) => {
    const storageRef = ref(storage, `images/${imageName}_${file.name}`);
    const uploadTask = uploadBytes(storageRef, file);

    uploadTask
      .then((snapshot) => getDownloadURL(snapshot.ref))
      .then((downloadUrl) => resolve(downloadUrl))
      .catch((error) => reject(error));
  });
}


