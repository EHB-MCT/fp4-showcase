import {auth,firestore } from '../lib/firebase';
import { doc, addDoc,collection } from "firebase/firestore"; 


import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

export async function registerUser(email, password) {
    try{
        const userCredential = await createUserWithEmailAndPassword(auth, email, password)
        if(userCredential){
            let role = null
            if (/@student\.ehb\.be$/.test(userCredential.user.email)) {
                role = "student";
              } else if (/@ehb\.be$/.test(userCredential.user.email)) {
                role = "docent";
              }

            // Add a new document in collection "users"
            let collRef = collection(firestore, "users")
            let result = await addDoc(collRef , {
                email: userCredential.user.email,
                uid: userCredential.user.uid,
                role,
                created_at: Date.now()
            });

            console.log(result)
            return userCredential;
        }else{
            return null;
        }
    }catch(error) {
        return error;
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
    };
   
    

}

export async function loginUser(email, password) {
    try{
        const userCredential = await signInWithEmailAndPassword(auth, email, password)
        if(userCredential){
            return userCredential;
        }else{
            return null;
        }
    }catch(error) {
        return error;
        const errorCode = error.code;
        const errorMessage = error.message;
        
    };
   
    

}
export async function logoutUser() {
    try{
        const userCredential = await getAuth().signOut();
        if(userCredential){
            return userCredential;
        }else{
            return null;
        }
    }catch(error) {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
    };
   
    

}