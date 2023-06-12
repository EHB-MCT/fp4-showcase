import { collection, getDoc, getDocs } from 'firebase/firestore';
import { firestore } from '../../../lib/firebase';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        // Process a POST request
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
