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
    // Get current visits from database
    const querySnapshot = await getDocs(collection(firestore, "visits"));
    let visitObj = {};
    querySnapshot.forEach(async (doc) => {
      const data = {
        collection_id: doc.id,
        visitCount: doc.data().visitCount,
      };
      visitObj = data;
    });

    // get documentRef
    const docRef = doc(firestore, "visits", visitObj.collection_id);
    const updatedDoc = await updateDoc(docRef, {
      visitCount: visitObj.visitCount + 1,
    });

    await new Promise((resolve) => setTimeout(resolve, 500));
    // Set cache-control headers to prevent caching
    res.setHeader(
      "Cache-Control",
      "no-store, no-cache, must-revalidate, private"
    );

    res.redirect(301, "https://www.finalshow.be");
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}
