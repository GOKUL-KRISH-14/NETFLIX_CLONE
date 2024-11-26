
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword,signOut} from 'firebase/auth'
import {addDoc, collection, getFirestore} from 'firebase/firestore'
import { toast } from "react-toastify";





const firebaseConfig = {
  apiKey: "AIzaSyCPs_XUpulOSEgJE7UnmaYxJI7fNGGprfs",
  authDomain: "movie-clone-5aaad.firebaseapp.com",
  projectId: "movie-clone-5aaad",
  storageBucket: "movie-clone-5aaad.appspot.com",
  messagingSenderId: "333307810470",
  appId: "1:333307810470:web:8eac855232c0e466301a67",
  measurementId: "G-7PQ6W7Q639"
};


const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const auth=getAuth(app);
const db=getFirestore(app);


const signup=async (name,email,password)=>{
try{
    const res=await createUserWithEmailAndPassword(auth,email,password);
    const user=res.user;
    await addDoc(collection(db,"user"),{
        uid:user.uid,
        name,
        authProvider:"local",
        email,
        
    });
}
catch(error)
{
console.log(error)
toast.error(error.code.split('/')[1].split('-').join(" "))
}

}

const login=async(email,password)=>{
    try
    {
        await signInWithEmailAndPassword(auth,email,password);
    }
    catch(error)
    {
        console.log(error)
       toast.error(error.code.split('/')[1].split('-').join(" "))
    }
}


const logout=()=>{
    signOut(auth);
}

export {auth,db,login,signup,logout}