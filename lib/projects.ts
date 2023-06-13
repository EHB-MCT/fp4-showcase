import { collection, getDocs } from 'firebase/firestore';
import { firestore } from '../lib/firebase';

export default async function getProjectsByUserID(uid: string | string[]) {
    let list = [];
    const querySnapshot = await getDocs(collection(firestore, 'projects'));
    querySnapshot.forEach((doc) => {
        if (doc.data().uid == uid) list.push(doc.data());
    });
    return list;
}
