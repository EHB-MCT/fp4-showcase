import { addDoc, collection, getDoc, getDocs } from 'firebase/firestore';
import { firestore } from '../../../lib/firebase';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        try {
            // Process a POST request
            let data = {};

            // dynamically add all keys and values from req.body to data object
            for (let key in req.body) {
                data[key] = req.body[key];
            }

            let resp;
            let awardExists = false;
            const querySnapshot = await getDocs(collection(firestore, 'awards'));
            querySnapshot.forEach(async (doc) => {
                if (doc.data().name == data.name) {
                    // award already exists
                    resp = { message: 'Award already exists', award: data };
                    awardExists = true;
                }
            });

            if (!awardExists) {
                resp = { message: 'Award added', award: data };
                const docRef = await addDoc(collection(firestore, 'awards'), data);
            }

            res.status(200).json({ message: 'Document added successfully', data });
        } catch (e) {
            res.status(500).json({ message: e.message });
        }
    } else {
        // Handle any other HTTP method
        //retrieve projects from projects collection
        let list = [];

        const querySnapshot = await getDocs(collection(firestore, 'awards'));
        querySnapshot.forEach((doc) => {
            const data = {
                id: doc.id,
                ...doc.data(),
            };
            list.push(data);
        });

        res.status(200).json(list);
        // }).catch((error) => {
        //     res.status(500).json({error: error.message})
        // })
    }
}
