import { collection, getDocs } from 'firebase/firestore';
import { firestore } from '../../../lib/firebase';

export default async function handler(req, res) {
    const { uid } = req.query;
    if (req.method === 'POST') {
        // Process a POST request
    } else {
        // Handle any other HTTP method
        let list = [];
        const querySnapshot = await getDocs(collection(firestore, 'projects'));
        querySnapshot.forEach((doc) => {
            const data = {
                id: doc.id,
                ...doc.data(),
            };
            list.push(data);
        });
        res.status(200).json(list);
    }
}
