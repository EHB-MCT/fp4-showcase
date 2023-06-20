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

export async function saveWinner(project_id, award_id) {
  try {
    const winnerRef = collection(firestore, "winners");
    const winnerDoc = await addDoc(winnerRef, {
      project_id: project_id,
      award_id: award_id,
    });
    return winnerDoc;
  } catch (e) {
    console.error("Error saving vote", e);
    return null;
  }
}
