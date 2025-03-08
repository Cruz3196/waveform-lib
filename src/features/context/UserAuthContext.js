import { createContext, useContext } from "react";

const userAuthContext = createContext; 

export function userAuthContext() {
    return useContext(userAuthContext); 
}
