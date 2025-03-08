import { useState } from "react";
import UserAuthContext from "../context/UserAuthContext";
import { GoogleAuthProvider } from "firebase/auth/web-extension";

export function UserAuthContextProvider({ children }) {
    const [user, setUser] = useState(null);

    const logIn = (email,password) => {
        return signInWithEmailAndPassword(auth,email,password);
    };  
    const signUp = (email,password) => {
        return createUserWithEmailAndPassword(auth,email,password);
    }; 
    const logOut = () => {
        return signOut(auth);
    }; 
    const googleSignIn = () => {
        const googleAuthProvider = new GoogleAuthProvider(); 
        return signInWithPopup(auth, googleAuthProvider);
    }; 

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
