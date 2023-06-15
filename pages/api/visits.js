import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
  update,
} from "firebase/firestore";
import { firestore } from "../../lib/firebase";

export default async function handler(req, res) {
  try {
    // get visits from database
    const querySnapshot = await getDocs(collection(firestore, "visits"));
    let visitObj = {};
    querySnapshot.forEach(async (doc) => {
      const data = {
        collection_id: doc.id,
        visitCount: doc.data().visitCount,
      };
      visitObj = data;
    });
    res.status(200).json(visitObj);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}
