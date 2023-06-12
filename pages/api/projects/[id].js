import { collection, deleteDoc, doc, getDoc, getDocs, setDoc } from 'firebase/firestore';
import { firestore } from '../../../lib/firebase';

export default async function handler(req, res) {
    if (req.method === 'GET') {
        try {
            const { id } = req.query;

            const docRef = doc(firestore, 'projects', id);
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
            const { id } = req.query;
            const { newData } = req.body;
            console.log(newData);

            const docRef = doc(firestore, 'projects', id);
            await setDoc(docRef, newData);

            res.status(200).json({ message: 'Document updated successfully' });
        } catch (e) {
            res.status(500).json({ message: e.message });
        }
    } else if (req.method === 'DELETE') {
        try {
            const { id } = req.query;

            const docRef = doc(firestore, 'projects', id);
            await deleteDoc(docRef);

            res.status(200).json({ message: 'Document deleted successfully' });
        } catch (e) {
            res.status(500).json({ message: e.message });
        }
    } else {
        res.status(400).json({ error: 'Invalid request method' });
    }
}
