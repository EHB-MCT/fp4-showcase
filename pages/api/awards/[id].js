import { collection, doc, getDoc, getDocs, setDoc, updateDoc } from 'firebase/firestore';
import { firestore } from '../../../lib/firebase';

export default async function handler(req, res) {
    if (req.method === 'GET') {
        try {
            const { id } = req.query;

            const docRef = doc(firestore, 'awards', id);
            const docSnap = await getDoc(docRef);
            const data = {
                id: docSnap.id,
                ...docSnap.data(),
            };

            res.status(200).json(data);
        } catch (e) {
            res.status(500).json({ message: e.message });
        }
    } else if (req.method === 'PUT') {
        try {
            const { id, newData } = req.body;

            const docRef = doc(firestore, 'awards', id);
            await setDoc(docRef, newData);

            res.status(200).json({ message: 'success' });
        } catch (e) {
            res.status(500).json({ message: e.message });
        }
    } else {
        res.status(400).json({ error: 'Invalid request method' });
    }
}
