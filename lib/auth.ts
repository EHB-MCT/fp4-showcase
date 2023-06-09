import { addDoc, collection, doc } from "firebase/firestore";
import { sendPasswordResetEmail, confirmPasswordReset } from "firebase/auth";
import { auth, firestore } from "../lib/firebase";

import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
} from "firebase/auth";

export async function registerUser(email, password) {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    if (userCredential) {
      let role = null;
      if (/@student\.ehb\.be$/.test(userCredential.user.email)) {
        role = "student";
      } else if (/@ehb\.be$/.test(userCredential.user.email)) {
        role = "docent";
      }

      // Assign full name based on first.last.name@email.com
      const atIndex = email.indexOf("@");
      let username = email.substring(0, atIndex).replace(/\./g, " ");

      // capitalize full name
      username = username
        .split(" ")
        .map((name) => name.charAt(0).toUpperCase() + name.slice(1))
        .join(" ");

      // Add a new document in collection "users"
      let collRef = collection(firestore, "users");
      let result = await addDoc(collRef, {
        username: username,
        email: userCredential.user.email,
        uid: userCredential.user.uid,
        role,
        created_at: Date.now(),
      });

      return userCredential;
    } else {
      throw new Error("Failed to register user.");
    }
  } catch (error) {
    throw error;
    // ..
  }
}

export async function loginUser(email, password) {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    if (userCredential) {
      return userCredential;
    } else {
      throw new Error("Failed to login user.");
    }
  } catch (error) {
    throw error;
  }
}
export async function logoutUser() {
  try {
    const userCredential = await getAuth().signOut();
    return null;
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    return error;
  }
}

export const passwordReset = async (email: string) => {
  return await sendPasswordResetEmail(auth, email);
};

export const confirmThePasswordReset = async (
  oobCode: string,
  newPassword: string
) => {
  if (!oobCode && !newPassword) return;

  return await confirmPasswordReset(auth, oobCode, newPassword);
};
