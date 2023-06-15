import { collection, getDocs,updateDoc,doc } from 'firebase/firestore';
import { firestore } from '../lib/firebase';

export  async function getProjectsByUserID(uid: string | string[]) {
    let list = [];
    const querySnapshot = await getDocs(collection(firestore, 'projects'));

    querySnapshot.forEach((doc) => {

        if (doc.data().uid == uid) {
            const data = {
                project_id: doc.id,
                ...doc.data()
            }
            list.push(data);
        }
        
     
    });
    return list;
}

export async function getAllProject(){
  let list = [];
  const querySnapshot = await getDocs(collection(firestore, 'projects'));
  querySnapshot.forEach((doc) => {

    if (doc.data()) {
        const data = {
            project_id: doc.id,
            ...doc.data()
        }
        list.push(data);
    }
    
 
});
return list;
}

export async function updateProjectInFirebase(project) {
    const projectId = project.id; // Update with the correct ID field from your project object
  
    try {
      const projectRef = doc(firestore, 'projects', projectId);
      await updateDoc(projectRef, project);
    } catch (error) {
      throw new Error('Error updating project in Firebase:', error);
    }
  }