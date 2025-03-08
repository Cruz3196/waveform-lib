import { useState, useEffect } from "react";
import UserAuthContext from "../context/UserAuthContext"; 
import { 
    GoogleAuthProvider, 
    signInWithEmailAndPassword, 
    createUserWithEmailAndPassword, 
    signOut, 
    onAuthStateChanged, 
    signInWithPopup, 
} from "firebase/auth";
import { auth } from "../firebase.config"; 

export function UserAuthContextProvider({ children }) {
    const [user, setUser] = useState(null);

    const logIn = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password);
    };  

    const signUp = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password);
    }; 

    const logOut = () => {
        return signOut(auth);
    }; 

    const googleSignIn = () => {
        const googleAuthProvider = new GoogleAuthProvider(); 
        return signInWithPopup(auth, googleAuthProvider);
    }; 

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            console.log("Auth State Changed:", currentUser);
            setUser(currentUser);
        });

        return () => unsubscribe(); 
    }, []);

    return (
        <UserAuthContext.Provider
            value={{
                user,
                logIn,
                signUp,
                logOut,
                googleSignIn
            }}
        >
            {children}
        </UserAuthContext.Provider>
    );
}
