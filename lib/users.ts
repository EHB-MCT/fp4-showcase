import { getFirestore, collection, where, getDocs,getDoc, query, limit,addDoc , serverTimestamp, updateDoc,doc} from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { initializeApp, getApps, getApp } from "firebase/app";
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
export async function getUserById(id) {
    try {
        // Get user
        const userRef = collection(firestore, 'users');
        const q = query(userRef, where('uid', '==', id));

        const userSnap = await getDocs(q);

        let user = {};
        if (!userSnap.empty) {
            userSnap.forEach((doc) => {
                user = { ...doc.data() };
            });
        }

        return user;
    } catch (e) {
        console.error('Error getting user', e);
    }
}


export async function editProfile(userObject){
    const {uid,previewImage,bannerImage,...restData} = userObject;

    let previewImageUrl;
    
    // Check if the previewImage is a URL
    if (typeof previewImage === "string") {
      // if its an URL, use it as the previewImageUrl
    previewImageUrl = previewImage;
  } else {

    // Find the user document by querying the collection
    const q = query(collection(firestore, "users"), where("uid", "==", uid));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      const userDoc = querySnapshot.docs[0];
      const userData = userDoc.data();
       // Check if there is a previous previewImageUrl
     if (
      userData &&
        userData.previewImageUrl &&
        userData.previewImageUrl !== previewImageUrl
    ){
      // Delete the previous image file from storage
      const previousImageRef = ref(storage, userData.previewImageUrl);
      deleteObject(previousImageRef)
        .then(() => {
          console.log("Previous image file deleted successfully");
        })
        .catch((error) => {
          console.error("Error deleting previous image file:", error);
        });
    }
   
      console.log("Profile edited successfully");
      // Additional logic after successful update
    } else {
      console.error("User not found");
      // Handle case when user document is not found
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


  let bannerImageUrl;
    
    // Check if the previewImage is a URL
    if (typeof bannerImage === "string") {
      // if its an URL, use it as the previewImageUrl
    bannerImageUrl = bannerImage;
  } else {

    // Find the user document by querying the collection
    const q = query(collection(firestore, "users"), where("uid", "==", uid));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      const userDoc = querySnapshot.docs[0];
      const userData = userDoc.data();
       // Check if there is a previous previewImageUrl
     if (
      userData &&
        userData.bannerImageUrl &&
        userData.bannerImageUrl !== bannerImageUrl
    ){
      // Delete the previous image file from storage
      const previousImageRef = ref(storage, userData.bannerImageUrl);
      deleteObject(previousImageRef)
        .then(() => {
          console.log("Previous image file deleted successfully");
        })
        .catch((error) => {
          console.error("Error deleting previous image file:", error);
        });
    }
   
      console.log("Profile edited successfully");
      // Additional logic after successful update
    } else {
      console.error("User not found");
      // Handle case when user document is not found
    }
     // Upload the Preview image file to Firebase Storage
     bannerImageUrl = await new Promise((resolve, reject) => {
      const storageRef = ref(storage, `images/${bannerImage.name}`);
      const uploadTask = uploadBytes(storageRef, bannerImage);

      uploadTask
        .then((snapshot) => getDownloadURL(snapshot.ref))
        .then((downloadUrl) => resolve(downloadUrl))
        .catch((error) => reject(error));
    });
  }









    const timestamp = serverTimestamp()
    const editedUserData = {
        ...restData,
        previewImageUrl,
        bannerImageUrl,
        updatedAt: timestamp
      };


    try {
        // Find the user document by querying the collection
        const q = query(collection(firestore, "users"), where("uid", "==", uid));
        const querySnapshot = await getDocs(q);
        
        if (!querySnapshot.empty) {
          const userDoc = querySnapshot.docs[0];
          
          // Update the user document with the edited data
          await updateDoc(userDoc.ref, editedUserData);
          console.log("Profile edited successfully");
          // Additional logic after successful update
        } else {
          console.error("User not found");
          // Handle case when user document is not found
        }
      } catch (error) {
        console.error("Error editing profile:", error);
        // Additional error handling
      }

}
