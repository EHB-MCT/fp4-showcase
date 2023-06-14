import { and, collection, doc, getDoc, getDocs, query, where } from 'firebase/firestore';
import { firestore } from '../lib/firebase';

export async function getProjectsByUserID(uid) {
    try {
        // Get user
        const userRef = collection(firestore, 'users');
        const q = query(userRef, where('uid', '==', uid));

        const userSnap = await getDocs(q);

        if (!userSnap.empty) {
            userSnap.forEach((doc) => {
                console.log(doc.id, '=>', doc.data());
            });
        }

        // Get projects
        const projectsRef = collection(firestore, 'projects');
        const q2 = query(projectsRef, where('uid', '==', uid));

        const projectsSnap = await getDocs(q2);

        let list = [];
        if (!projectsSnap.empty) {
            projectsSnap.forEach((doc) => {
                const data = {
                    user: userSnap.docs[0].data(),
                    ...doc.data(),
                };
                list.push(data);
            });
        }

        return list;
    } catch (e) {
        console.error('Error getting projects', e);
        return [];
    }
}

export async function getProjectFromUserByType(uid, type) {
    try {
        // Get user
        const userRef = collection(firestore, 'users');
        const q = query(userRef, where('uid', '==', uid));

        const userSnap = await getDocs(q);

        // Get projects
        const projectsRef = collection(firestore, 'projects');
        const q2 = query(projectsRef, and(where('projectBelongsTo', '==', type), where('uid', '==', uid)));

        const projectsSnap = await getDocs(q2);

        let list = [];
        if (!projectsSnap.empty) {
            projectsSnap.forEach((doc) => {
                const data = {
                    user: userSnap.docs[0].data(),
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

export async function getAllProjects() {
    try {
        // Get projects
        const projectsRef = collection(firestore, 'projects');
        const q = query(projectsRef);

        const projectsSnap = await getDocs(q);

        let list = [];
        if (!projectsSnap.empty) {
            projectsSnap.forEach((doc) => {
                list.push(doc.data());
            });
        }

        return list;
    } catch (e) {
        console.error('Error getting projects', e);
        return [];
    }
}
