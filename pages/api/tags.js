import { addDoc, collection, deleteDoc, getDocs } from 'firebase/firestore';
import { firestore } from '../../lib/firebase';

export default async function handler(req, res) {
    if (req.method == 'POST') {
        // prepare object
        let data = {};

        // dynamically add all keys and values from req.body to data object
        for (let key in req.body) {
            data[key] = req.body[key];
        }

        // write post request that takes a string as property and adds it to the tags collection
        let { tag } = req.body;
        tag = tag.toLowerCase();
        let resp;
        // check if tag already exists
        const querySnapshot = await getDocs(collection(firestore, 'tags'));
        querySnapshot.forEach(async (doc) => {
            if (doc.data().tag == tag) {
                // tag already exists
                resp = { message: 'Tag already exists' };
            } else {
                // save to collection
                resp = { message: 'Tag added' };
                const docRef = await addDoc(collection(firestore, 'tags'), data);
            }
        });
        res.status(200).json(resp);
    } else if (req.method == 'DELETE') {
        // Delete all tags in collection without deleting the collection itself
        const querySnapshot = await getDocs(collection(firestore, 'tags'));
        querySnapshot.forEach(async (doc) => {
            await deleteDoc(doc.ref);
        });
        // Adding a tag "react" to prevent collection from being deleted
        const docRef = await addDoc(collection(firestore, 'tags'), { tag: 'react' });

        res.status(200).json('deleted');
    } else if (req.method == 'PUT') {
        // Update a tag
        let { tag, newTag } = req.body;
        tag = tag.toLowerCase();
        newTag = newTag.toLowerCase();
        let message = '';
        // check if tag already exists
        const querySnapshot = await getDocs(collection(firestore, 'tags'));
        querySnapshot.forEach(async (doc) => {
            if (doc.data().tag == tag) {
                message = 'Tag updated';
                // tag already exists
                const docRef = doc.ref;
                await deleteDoc(docRef);
                const docRef2 = await addDoc(collection(firestore, 'tags'), { tag: newTag });
                // success message
            } else {
                //error message
                message = 'Tag does not exist';
            }
        });
        res.status(200).json(message);
    } else {
        // handle any other HTTP method
        let list = [];

        const querySnapshot = await getDocs(collection(firestore, 'tags'));
        querySnapshot.forEach((doc) => {
            list.push(doc.data());
        });

        res.status(200).json(list);
    }
}
