import {
  addDoc,
  and,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { firestore } from "../lib/firebase";

export async function getAwardDeadlines() {
  try {
    const datesRef = collection(firestore, "dates");
    const datesSnap = await getDocs(datesRef);
    if (!datesSnap.empty) {
      const dates = datesSnap.docs[0].data();
      return dates;
    }

    return null;
  } catch (e) {
    console.log("Error getting award deadlines", e);
  }
}
