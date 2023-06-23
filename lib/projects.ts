import {
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

export async function getProjectsByUserID(uid) {
  try {
    // Get user
    const userRef = collection(firestore, "users");
    const q = query(userRef, where("uid", "==", uid));

    const userSnap = await getDocs(q);

    // Get projects
    const projectsRef = collection(firestore, "projects");
    const q2 = query(projectsRef, where("uid", "==", uid));

    const projectsSnap = await getDocs(q2);

    let list = [];
    if (!projectsSnap.empty) {
      projectsSnap.forEach((doc) => {
        const data = {
          user: userSnap.docs[0].data(),
          project_id: doc.id,
          ...doc.data(),
        };
        list.push(data);
      });
    }

    return list;
  } catch (e) {
    console.error("Error getting projects", e);
    return [];
  }
}

export async function getProjectFromUserByType(uid, type) {
  try {
    // Get user
    const userRef = collection(firestore, "users");
    const q = query(userRef, where("uid", "==", uid));

    const userSnap = await getDocs(q);

    // Get projects
    const projectsRef = collection(firestore, "projects");
    const q2 = query(
      projectsRef,
      and(where("projectBelongsTo", "==", type), where("uid", "==", uid))
    );

    const projectsSnap = await getDocs(q2);

    let list = [];
    if (!projectsSnap.empty) {
      projectsSnap.forEach((doc) => {
        const data = {
          user: userSnap.docs[0].data(),
          project_id: doc.id,
          ...doc.data(),
        };
        list.push(data);
      });
    }

    return list;
  } catch (e) {
    console.error(`Error getting project type: ${type}`, e);
    return [];
  }
}

export async function getProjectById(project_id) {
  try {
    const docRef = doc(firestore, "projects", project_id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      return null;
    }
  } catch (e) {
    console.error("Error getting project", e);
    return null;
  }
}

export async function getAllProjects() {
  let list = [];
  const querySnapshot = await getDocs(collection(firestore, "projects"));
  querySnapshot.forEach((doc) => {
    if (doc.data()) {
      const data = {
        project_id: doc.id,
        ...doc.data(),
      };
      list.push(data);
    }
  });
  return list;
}

export async function updateProjectInFirebase(project) {
  const projectId = project.id; // Update with the correct ID field from your project object

  try {
    const projectRef = doc(firestore, "projects", projectId);
    await updateDoc(projectRef, project);
  } catch (error) {
    throw new Error("Error updating project in Firebase:", error);
  }
}

export async function updateProjectsLike(project) {
  const projectId = project.id; // Update with the correct ID field from your project object

  try {
    const projectRef = doc(firestore, "projects", projectId);
    await updateDoc(projectRef, { likeCount: project.likeCount });
  } catch (error) {
    throw new Error("Error updating project in Firebase:", error);
  }
}
