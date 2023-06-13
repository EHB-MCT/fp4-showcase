import { collection, getDocs } from "firebase/firestore";
import { firestore } from "../../../lib/firebase";

export default async function handler(req, res) {
  if (req.method === "GET") {
    // Get all users
    let list = [];
    const querySnapshot = await getDocs(collection(firestore, "users"));
    querySnapshot.forEach((doc) => {
      const data = {
        id: doc.id,
        ...doc.data(),
      };
      list.push(data);
    });
    res.status(200).json(list);
  } else {
    res.status(400).json({ message: "Invalid request method." });
  }
}
