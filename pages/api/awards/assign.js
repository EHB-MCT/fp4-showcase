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
    // Assign all projects to a specific awardId
    const { awardId } = req.query;

    const querySnapshot = await getDocs(collection(firestore, "projects"));
    querySnapshot.forEach(async (doc) => {
      const data = {
        collection_id: doc.id,
        superAwardId: awardId,
        ...doc.data(),
      };
      const docRef = doc(firestore, "projects", doc.id);
      await updateDoc(docRef, data);
    });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}
