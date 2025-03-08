import { createContext, useContext } from "react";

const UserAuthContext = createContext(); 

export function useUserAuth() {  
    return useContext(UserAuthContext);
}

export default UserAuthContext; 
