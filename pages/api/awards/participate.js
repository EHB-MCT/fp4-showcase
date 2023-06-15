import { collection, doc, getDoc, getDocs, setDoc, updateDoc } from 'firebase/firestore';
import { firestore } from '../../../lib/firebase';

export default async function handler(req, res) {
    if (req.method === 'POST') {
      const { awardId, projectId } = req.body;
  
      try {
        // Update the project document in Firestore
        const projectRef = doc(firestore, 'projects', projectId);
        const projectDoc = await getDoc(projectRef);
  
        if (projectDoc.exists()) {
          // Save the award ID in a new variable in the project document
          await updateDoc(projectRef, {
            awardId: awardId,
          });
  
          // Return a success response
          res.status(200).json({ message: 'Participation confirmed' });
        } else {
          // Return an error response if the project document doesn't exist
          res.status(404).json({ message: 'Project not found' });
        }
      } catch (error) {
        console.error('Error confirming participation:', error);
        // Return an error response
        res.status(500).json({ message: 'Failed to confirm participation' });
      }
    } else {
      // Return an error response for unsupported HTTP methods
      res.status(405).json({ message: 'Method Not Allowed' });
    }
  }