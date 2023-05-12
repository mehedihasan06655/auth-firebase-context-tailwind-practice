import { createContext, useEffect, useState } from "react";
import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import app from "../../Firebase/firebase.config";

export const AuthContext = createContext(null);
const auth = getAuth(app);
const googleAuthProvider = new GoogleAuthProvider();

const AuthProviders = ({children}) => {

    const [user,setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    const createUser = (email,password) =>{
        return createUserWithEmailAndPassword(auth, email,password);
    }
    const signUser = (email, password) =>{
        return signInWithEmailAndPassword(auth, email, password);
    }
    const signInGoogle = () =>{
        return signInWithPopup(auth,googleAuthProvider);
    }

    const logOut = () =>{
        return signOut(auth)
    }

    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth, currentUser =>{
            console.log('current user',currentUser)
            setUser(currentUser)
            setLoading(false)
        });

        return ()=>{
            unsubscribe()
        }

    },[])

    const userInfo={
        user,
        createUser,
        signUser,
        signInGoogle,
        loading,
        logOut
    }

    return (
        <AuthContext.Provider value={userInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProviders;