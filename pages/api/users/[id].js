import { collection, getDocs, doc, getDoc } from "firebase/firestore";
import { firestore } from "../../../lib/firebase";

export default async function handler(req, res) {
  if (req.method === "GET") {
    // Get user by id
    const { id } = req.query;
    const docRef = doc(firestore, "users", id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      res.status(200).json(docSnap.data());
    } else {
      res.status(404).json({ message: "User not found." });
    }
  } else {
    res.status(400).json({ message: "Invalid request method." });
  }
}
