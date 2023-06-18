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

        const voteDoc = await addDoc(voteRef, vote);
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

        // display ranking order as key value pair
        if (!voteSnap.empty) {
            const ranking = voteSnap.docs[0].data().order;
            const rankingOrder = [];
            for (const key in ranking) {
                const pair = { key: key, value: ranking[key] };
                rankingOrder.push(pair);

                const voteDoc = voteSnap.docs[0];
                const vote = {
                    vote_id: voteDoc.id,
                    order: rankingOrder,
                    ...voteDoc.data(),
                };
                return vote;
            }
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

export async function getGlobalNominatedProjects(awardId) {
    try {
        // Get all votes on award
        const voteRef = collection(firestore, 'votes');
        const q = query(voteRef, where('award_id', '==', awardId));

        const voteSnap = await getDocs(q);

        // Calculate global ranking
        let projectsList = [];
        if (voteSnap.empty) return;
        // Make a list of all projects that got voted on

        projectsList = [];
        for (const voteDoc of voteSnap.docs) {
            const ranking = voteDoc.data().order;
            for (const key in ranking) {
                if (key === '0') {
                    const pair = { value: ranking[key], points: 5 };
                    projectsList.push(pair);
                }
                if (key === '1') {
                    const pair = { value: ranking[key], points: 3 };
                    projectsList.push(pair);
                }
                if (key === '2') {
                    const pair = { value: ranking[key], points: 1 };
                    projectsList.push(pair);
                }
            }
        }
        /*  
              Make a map that uses the project id as key and the amount of votes as value,
              for "first" u should get 5 points, for "second" 3 points and for "third" 1 point
              then sort the map by value and return the top 3 projects
            */
        const map = new Map();
        for (const pair of projectsList) {
            if (!map.has(pair.value)) {
                map.set(pair.value, pair.points);
            } else {
                map.set(pair.value, map.get(pair.value) + pair.points);
            }
        }
        // Sort map by value
        const sortedMapArray = Array.from(map).sort((a, b) => b[1] - a[1]);

        // Get top 3 projects
        const top3 = sortedMapArray.slice(0, 3);

        const top3ProjectsData = [];
        // Get projects from top 3
        for (const project of top3) {
            const projectDoc = await getDoc(doc(collection(firestore, 'projects'), project[0]));

            const projectData = {
                project_id: projectDoc.id,
                points: project[1],
                ...projectDoc.data(),
            };

            top3ProjectsData.push(projectData);
        }

        return top3ProjectsData;
    } catch (e) {
        console.error('Error getting global nominated projects', e);
        return null;
    }
}
