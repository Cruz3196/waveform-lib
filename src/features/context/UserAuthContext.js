import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth } from '../firebase.config';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, signInWithPopup, GoogleAuthProvider, onAuthStateChanged } from 'firebase/auth';

const userAuthContext = createContext();

export function useUserAuth() {
    return useContext(userAuthContext);
}

export function UserAuthContextProvider({ children }) {
    const [user, setUser] = useState(null);

  // Log in function
    function logIn(email, password) {
        return signInWithEmailAndPassword(auth, email, password);
    }

  // Sign up function
    function signUp(email, password) {
        return createUserWithEmailAndPassword(auth, email, password);
    }

  // Log out function
    function logOut() {
        return signOut(auth);
    }

  // Google Sign-In function
    function googleSignIn() {
        const googleAuthProvider = new GoogleAuthProvider();
        return signInWithPopup(auth, googleAuthProvider);
    }

  // Firebase listener to track authentication state changes
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            console.log("Auth state changed:", currentUser);
            setUser(currentUser);  // Update user state based on the auth state
        });

      return () => unsubscribe(); // Clean up listener when component is unmounted
    }, []);

    return (
        <userAuthContext.Provider value={{ user, logIn, signUp, logOut, googleSignIn }}>
            {children}
        </userAuthContext.Provider>
    );
}
