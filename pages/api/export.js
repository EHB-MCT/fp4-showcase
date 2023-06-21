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
import { writeFileSync, mkdirSync, existsSync } from "fs-extra";
import { resolve } from "path";

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const projects = await getProjects();
      const backupFolderPath = resolve("backup");

      if (!existsSync(backupFolderPath)) {
        mkdirSync(backupFolderPath);
      }

      const filePath = resolve("backup", "projects.json");
      writeFileSync(filePath, JSON.stringify(projects));
      console.log(projects.length);
      return res.status(200).json(filePath);
    } catch (e) {
      console.log(e);
    }
  }
}

async function getProjects() {
  try {
    const projectsDoc = await getDocs(collection(firestore, "projects"));
    const projects = projectsDoc.docs.map((doc) => {
      return {
        collection_id: doc.id,
        ...doc.data(),
      };
    });
    return projects;
  } catch (e) {
    console.log(e);
  }
}
