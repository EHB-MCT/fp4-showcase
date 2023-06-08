import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore, collection, where, getDocs, query, limit } from "firebase/firestore";
import { getStorage } from "firebase/storage";

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