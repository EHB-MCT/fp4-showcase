import { addDoc, and, collection, doc, getDoc, getDocs, query, updateDoc, where } from 'firebase/firestore';
import { firestore } from '../lib/firebase';

export async function saveWinner(project_id, award_id) {
    try {
        const winnerRef = collection(firestore, 'winners');
        const winnerDoc = await addDoc(winnerRef, {
            project_id: project_id,
            award_id: award_id,
        });
        return winnerDoc;
    } catch (e) {
        console.error('Error saving vote', e);
        return null;
    }
}

export async function getWinner(awardId) {
    try {
        // get winner based on award_id
        const winnerRef = collection(firestore, 'winners');
        const q = query(winnerRef, where('award_id', '==', awardId));

        const winnerSnap = await getDocs(q);

        if (!winnerSnap.empty) {
            const winner = winnerSnap.docs[0].data();
            console.log(winner);

            return winner;
        }
        return null;
    } catch (e) {
        console.log(e);
    }
}
