import { addDoc, collection, deleteDoc, getDocs } from 'firebase/firestore';
import { firestore } from '../../lib/firebase';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        // Process a POST request

        // dynamically add all keys and values from req.body to data object
        let data = {};
        for (let key in req.body) {
            data[key] = req.body[key];
        }
        data.iframe = `<i class='fa-brands fa-${data.name}' style='color: ${data.color};'>`;

        let socialDoesExist = false;
        // Check if social already exists
        const querySnapshot = await getDocs(collection(firestore, 'socials'));
        querySnapshot.forEach(async (doc) => {
            if (doc.data().name == data.name) {
                // Social already exists
                socialDoesExist = true;
            }
        });
        if (!socialDoesExist) await addDoc(collection(firestore, 'socials'), data);
        else data = { message: 'Social media platform already exists' };

        res.status(200).json(data);
    } else if (req.method === 'DELETE') {
        // Delete all socials in collection without deleting the collection itself
        const querySnapshot = await getDocs(collection(firestore, 'socials'));
        querySnapshot.forEach(async (doc) => {
            await deleteDoc(doc.ref);
        });
        // Adding a social "instagram" to prevent collection from being deleted
        const docRef = await addDoc(collection(firestore, 'socials'), {
            name: 'instagram',
            iframe: "<i class='fa-brands fa-instagram' style='color: #c9a6bc;'>",
        });
        res.status(200).json('deleted');
    } else if (req.method === 'PUT') {
        // Update a social
        let { name, newName } = req.body;
        name = name.toLowerCase();
        newName = newName.toLowerCase();

        let data = {};

        // dynamically add all keys and values from req.body to data object
        for (let key in req.body) {
            data[key] = req.body[key];
        }
        data.name = newName;
        delete data['newName'];

        data.iframe = `<i class='fa-brands fa-${data.name}' style='color: ${data.color};'>`;

        // Check if social with newName already exists
        let socialDoesExist = false;
        const querySnapshot = await getDocs(collection(firestore, 'socials'));
        querySnapshot.forEach(async (doc) => {
            if (doc.data().name == newName) {
                // Social already exists
                socialDoesExist = true;
            }
        });

        if (socialDoesExist) {
            data = { message: `Social media platform ${req.body.newName} already exists` };
        } else {
            // Check if social exists && delete if it does so we can update it
            const querySnapshot2 = await getDocs(collection(firestore, 'socials'));
            querySnapshot2.forEach(async (doc) => {
                if (doc.data().name == name) {
                    // Social exists
                    await deleteDoc(doc.ref);
                }
            });

            // Update social in collection
            await addDoc(collection(firestore, 'socials'), data);
        }

        res.status(200).json(data);
    } else {
        // Handle any other HTTP method
        const querySnapshot = await getDocs(collection(firestore, 'socials'));
        let socials = [];
        querySnapshot.forEach((doc) => {
            socials.push(doc.data());
        });
        res.status(200).json(socials);
    }
}
