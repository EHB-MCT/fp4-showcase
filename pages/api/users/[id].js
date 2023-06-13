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
}
