import { addDoc, collection, deleteDoc, getDocs } from "firebase/firestore";
import { firestore } from "../../lib/firebase";

export default async function handler(req, res) {
  if (req.method == "POST") {
    // prepare object
    let data = {};

    // dynamically add all keys and values from req.body to data object
    for (let key in req.body) {
      data[key] = req.body[key];
    }

    // write post request that takes a string as property and adds it to the tags collection
    let { tag } = req.body;
    data.tag = tag.toLowerCase();

    // check if tag already exists
    let resp;
    let tagExists = false;
    const querySnapshot = await getDocs(collection(firestore, "tags"));
    querySnapshot.forEach(async (doc) => {
      if (doc.data().tag == tag) {
        // tag already exists
        resp = { message: "Tag already exists", tag: data };
        tagExists = true;
      }
    });

    if (!tagExists) {
      resp = { message: "Tag added", tag: data };
      const docRef = await addDoc(collection(firestore, "tags"), data);
    }

    res.status(200).json(resp);
  } else if (req.method == "DELETE") {
    // Delete all tags in collection without deleting the collection itself
    const querySnapshot = await getDocs(collection(firestore, "tags"));
    querySnapshot.forEach(async (doc) => {
      await deleteDoc(doc.ref);
    });
    // Adding a tag "react" to prevent collection from being deleted
    const docRef = await addDoc(collection(firestore, "tags"), {
      tag: "react",
    });

    res.status(200).json("deleted");
  } else if (req.method == "PUT") {
    // Update a tag
    let { tag, newTag } = req.body;
    tag = tag.toLowerCase();
    newTag = newTag.toLowerCase();

    let data = {};

    // dynamically add all keys and values from req.body to data object
    for (let key in req.body) {
      data[key] = req.body[key];
    }
    data.tag = newTag;
    delete data["newTag"];

    // Check if tag with newTag already exists
    let tagExists = false;
    const querySnapshot = await getDocs(collection(firestore, "tags"));
    querySnapshot.forEach(async (doc) => {
      if (doc.data().tag == newTag) {
        // tag already exists
        tagExists = true;
      }
    });

    if (!tagExists) {
      // tag does not exist
      const querySnapshot = await getDocs(collection(firestore, "tags"));
      querySnapshot.forEach(async (doc) => {
        if (doc.data().tag == tag) {
          // tag exists
          await deleteDoc(doc.ref);
          const docRef = await addDoc(collection(firestore, "tags"), data);
        }
      });

      await addDoc(collection(firestore, "tags"), data);
    } else {
      data = { message: "Tag already exists", tag: data };
    }

    res.status(200).json(data);
  } else {
    // handle any other HTTP method
    let list = [];

    const querySnapshot = await getDocs(collection(firestore, "tags"));
    querySnapshot.forEach((doc) => {
      list.push(doc.data());
    });

    res.status(200).json(list);
  }
}
