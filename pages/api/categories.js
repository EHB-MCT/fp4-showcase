import { firestore } from "../../lib/firebase";
import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  updateDoc,
  doc,
} from "firebase/firestore";

export default async function handler(req, res) {
  if (req.method === "POST") {
    // Process a post request
    let data = {};

    // dynamically add all keys and values from req.body to data object
    for (let key in req.body) {
      data[key] = req.body[key];
    }

    let { name } = req.body;
    data.name = name;

    // check if category already exists
    let resp;
    let categoryExists = false;
    const querySnapshot = await getDocs(collection(firestore, "categories"));
    querySnapshot.forEach(async (doc) => {
      if (doc.data().name == name) {
        // category already exists
        resp = { message: "Category already exists", category: data };
        categoryExists = true;
      }
    });

    if (!categoryExists) {
      resp = { message: "Category added", category: data };
      const docRef = await addDoc(collection(firestore, "categories"), data);
    }

    res.status(200).json(resp);
  } else if (req.method === "DELETE") {
    // Delete all categories in collection without deleting the collection itself
    const querySnapshot = await getDocs(collection(firestore, "categories"));
    querySnapshot.forEach(async (doc) => {
      await deleteDoc(doc.ref);
    });
    // Adding a category "Web & App" to prevent collection from being deleted

    const docRef = await addDoc(collection(firestore, "categories"), {
      name: "Web & App",
    });

    res.status(200).json("Deleted all categories");
  } else if (req.method === "PUT") {
    let { name, newCategory } = req.body;

    let data = {};
    for (let key in newCategory) {
      data[key] = newCategory[key];
    }

    // find matching category
    const categoryRef = doc(firestore, "categories", "kxiRX1XWhOQeRYEXlNve");
    await updateDoc(categoryRef, {
      name: newCategory.name,
    });

    res.status(200).json("OK");
  } else {
    // Handle GET all categories
    let list = [];
    const querySnapshot = await getDocs(collection(firestore, "categories"));
    querySnapshot.forEach((doc) => {
      list.push(doc.data());
    });
    res.status(200).json(list);
  }
}
