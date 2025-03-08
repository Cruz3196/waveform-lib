import { useState } from "react";
import UserAuthContext from "../context/UserAuthContext";

export function UserAuthContextProvider({ children }) {
    const [user, setUser] = useState(null);

    const logIn = () => {};  
    const signUp = () => {}; 
    const logOut = () => {}; 
    const googleSignIn = () => {}; 

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
