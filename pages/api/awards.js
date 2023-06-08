import {firestore} from '../../lib/firebase' 
import { collection, getDocs } from 'firebase/firestore';

export default async function handler(req, res) {

    if (req.method === 'POST') {
        // Process a POST request
      } else {
        // Handle any other HTTP method
        //retrieve projects from projects collection
        let list = [];
        const querySnapshot = await getDocs(collection(firestore, "awards"));
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          list.push(doc.data());
        });
        res.status(200).json(list)

            
        // }).catch((error) => {
        //     res.status(500).json({error: error.message})
        // })



        
      }
    
  }