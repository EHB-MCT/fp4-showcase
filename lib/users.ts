import { and, collection, doc, getDoc, getDocs, query, where } from 'firebase/firestore';
import { firestore } from '../lib/firebase';

export async function getUserById(id) {
    try {
        // Get user
        const userRef = collection(firestore, 'users');
        const q = query(userRef, where('uid', '==', id));

        const userSnap = await getDocs(q);

        let user = {};
        if (!userSnap.empty) {
            userSnap.forEach((doc) => {
                user = { ...doc.data() };
            });
        }

        return user;
    } catch (e) {
        console.error('Error getting user', e);
    }
}
