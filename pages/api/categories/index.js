import { addDoc, collection, deleteDoc, doc, getDocs, updateDoc } from 'firebase/firestore';
import { firestore } from '../../../lib/firebase';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        try {
            // Process a post request
            let data = {};

            // dynamically add all keys and values from req.body to data object
            for (let key in req.body) {
                data[key] = req.body[key];
            }

            let { name } = req.body;
            data.name = name;

            // check if category already exists
            let resp;
            let categoryExists = false;
            const querySnapshot = await getDocs(collection(firestore, 'categories'));
            querySnapshot.forEach(async (doc) => {
                if (doc.data().name == name) {
                    // category already exists
                    resp = { message: 'Category already exists', category: data };
                    categoryExists = true;
                }
            });

            if (!categoryExists) {
                resp = { message: 'Category added', category: data };
                const docRef = await addDoc(collection(firestore, 'categories'), data);
            }

            res.status(200).json(resp);
        } catch (e) {
            res.status(500).json({ message: e.message });
        }
    } else if (req.method === 'GET') {
        try {
            // Handle GET all categories
            let list = [];
            const querySnapshot = await getDocs(collection(firestore, 'categories'));
            querySnapshot.forEach((doc) => {
                const data = {
                    id: doc.id,
                    ...doc.data(),
                };
                list.push(data);
            });
            res.status(200).json(list);
        } catch (e) {
            res.status(500).json({ message: e.message });
        }
    } else {
        res.status(400).json({ error: 'Invalid request method' });
    }
}
