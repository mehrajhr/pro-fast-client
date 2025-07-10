import React, { useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import { auth } from '../../firebase/firebase.init';

const provider = new GoogleAuthProvider();

const AuthProvider = ({children}) => {

    const [user , setUser ]= useState([]);
    const [loading , setLoading] = useState(true);

    const createUser = (email , password) =>{
        setLoading(true);
        return createUserWithEmailAndPassword(auth , email ,password);
    }
    const signIn = (email , password )=>{
        setLoading(true);
        return signInWithEmailAndPassword(auth , email ,password);
    }

    const signInGoogle = () => {
        setLoading(true);
        return signInWithPopup(auth , provider);
    }

    const updateUserProfile = profileInfo => {
        return updateProfile(auth.currentUser , profileInfo);
    }

    const logOut = () =>{
        setLoading(true);
        return signOut(auth);
    }

    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser);
            setLoading(false);
        })

        return () => unsubscribe();
    },[])


    const authInfo = {
        user,
        loading,
        createUser,
        signIn,
        signInGoogle,
        updateUserProfile,
        logOut
    }


    return (
        <AuthContext value={authInfo}>
            {children}
        </AuthContext>
    );
};

export default AuthProvider;