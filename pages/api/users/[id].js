import { collection, doc, getDoc, getDocs } from 'firebase/firestore';
import { firestore } from '../../../lib/firebase';

export default async function handler(req, res) {
    if (req.method === 'GET') {
        // Get all users from database and filter by uid
        const usersRef = collection(firestore, 'users');
        const usersSnapshot = await getDocs(usersRef);
        const usersList = usersSnapshot.docs.map((doc) => doc.data());
        const user = usersList.filter((user) => user.uid === req.query.id);

        // Assign full name based on first.last.name@email.com
        const atIndex = user[0].email.indexOf('@');
        user[0].username = user[0].email.substring(0, atIndex).replace(/\./g, ' ');

        // capitalize full name
        user[0].username = user[0].username
            .split(' ')
            .map((name) => name.charAt(0).toUpperCase() + name.slice(1))
            .join(' ');

        if (user) {
            res.status(200).json(user[0]);
        } else {
            res.status(404).json({ message: 'User not found.' });
        }
    } else {
        res.status(400).json({ message: 'Invalid request method.' });
    }
}
