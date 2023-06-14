import { collection, doc, getDoc, getDocs, setDoc, updateDoc,query,where } from 'firebase/firestore';
import { firestore } from '../../../lib/firebase';

export default async function handler(req, res) {
    if (req.method === 'GET') {
        try {
          const { id } = req.query;
    
          const usersRef = collection(firestore, 'users');
          const q = query(usersRef, where('uid', '==', id));
          const querySnapshot = await getDocs(q);
    
          if (querySnapshot.empty) {
            res.status(404).json({ message: 'User not found' });
            return;
          }
          
          // Assign full name based on first.last.name@email.com
          const atIndex = querySnapshot.docs[0].email.indexOf('@');
          querySnapshot.docs[0].username = querySnapshot.docs[0].email.substring(0, atIndex).replace(/\./g, ' ');

          // capitalize full name
          querySnapshot.docs[0].username = querySnapshot.docs[0].username
              .split(' ')
              .map((name) => name.charAt(0).toUpperCase() + name.slice(1))
              .join(' ');
    
          const docSnapshot = querySnapshot.docs[0];
          const data = {
            id: docSnapshot.id,
            ...docSnapshot.data(),
          };
    
          res.status(200).json(data);
        } catch (e) {
          res.status(500).json({ message: e.message });
        }
      }
    } else {
        res.status(400).json({ message: 'Invalid request method.' });
    }
}
