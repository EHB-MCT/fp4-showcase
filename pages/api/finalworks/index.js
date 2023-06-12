import { addDoc, collection, deleteDoc, getDocs } from 'firebase/firestore';
import { firestore } from '../../../lib/firebase';

export default async function handler(req, res) {
    if (req.method === 'GET') {
        try {
            // Handle GET all finalworks
            let list = [];
            const querySnapshot = await getDocs(collection(firestore, 'finalworks'));
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
    } else if (req.method === 'POST') {
        try {
            let data = {};

            // dynamically add all keys and values from req.body to data object
            for (let key in req.body) {
                data[key] = req.body[key];
            }

            let resp;
            let finalworkExists = false;
            const querySnapshot = await getDocs(collection(firestore, 'finalworks'));
            querySnapshot.forEach(async (doc) => {
                console.log(doc.data().title, data.title);
                if ((doc.data().title == data.title && doc.data().title != undefined) || data.title != undefined) {
                    // finalwork already exists
                    resp = { message: 'Finalwork already exists', finalwork: data };
                    finalworkExists = true;
                } else {
                    data.id = doc.id;
                }
            });

            if (!finalworkExists) {
                resp = { message: 'Finalwork added', finalwork: data };
                const docRef = await addDoc(collection(firestore, 'finalworks'), data);
            }

            res.status(200).json(resp);
        } catch (e) {
            res.status(500).json({ message: e.message });
        }
    }
}
