import { addDoc, and, collection, doc, getDoc, getDocs, query, updateDoc, where } from 'firebase/firestore';
import { firestore } from '../lib/firebase';

export async function saveVote(vote) {
    try {
        // Check if docent has already voted on award
        const voteRef = collection(firestore, 'votes');
        const q = query(voteRef, and(where('docent_id', '==', vote.docent_id), where('award_id', '==', vote.award_id)));

        const voteSnap = await getDocs(q);

        if (voteSnap.empty) {
            // Save vote
            const voteDoc = await addDoc(voteRef, vote);
            return voteDoc;
        }

        // const voteDoc = await addDoc(voteRef, vote);
        return vote;
    } catch (e) {
        console.error('Error saving vote', e);
        return null;
    }
}

export async function updateVote(vote) {
    try {
        // Check if docent has already voted on award
        const voteRef = collection(firestore, 'votes');
        const q = query(voteRef, and(where('docent_id', '==', vote.docent_id), where('award_id', '==', vote.award_id)));

        const voteSnap = await getDocs(q);

        if (!voteSnap.empty) {
            // Update vote
            const voteDoc = voteSnap.docs[0];
            const voteDocRef = doc(firestore, 'votes', voteDoc.id);
            await updateDoc(voteDocRef, vote);
            return vote;
        }

        // const voteDoc = await addDoc(voteRef, vote);
        return vote;
    } catch (e) {
        console.error('Error saving vote', e);
        return null;
    }
}

export async function getVotesOnAwardFromDocent(award_id, docent_id) {
    try {
        // Get votes based on award_id and docent_id
        const voteRef = collection(firestore, 'votes');
        const q = query(voteRef, and(where('docent_id', '==', docent_id), where('award_id', '==', award_id)));

        const voteSnap = await getDocs(q);

        if (!voteSnap.empty) {
            const voteDoc = voteSnap.docs[0];
            const vote = {
                vote_id: voteDoc.id,
                order: voteDoc.data().order,
                ...voteDoc.data(),
            };

            return vote;
        } else {
            return null;
        }
    } catch (e) {
        console.error('Error getting votes', e);
        return null;
    }
}

export async function getTop3OnAwardFromDocent(ranking) {
    try {
        // Get Projects out of ranking order
        const projectsList = [];
        for (const rank of ranking) {
            const projectDoc = await getDoc(doc(collection(firestore, 'projects'), rank.projectId));
            const project = {
                project_id: projectDoc.id,
                ...projectDoc.data(),
            };
            projectsList.push(project);
        }

        return projectsList;
    } catch (e) {
        console.error('Error getting votes', e);
        return null;
    }
}
