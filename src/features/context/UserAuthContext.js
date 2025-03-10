import React, { createContext, useState, useContext } from 'react';

// Create the context
const userAuthContext = createContext();

// Custom hook to use the UserAuthContext
export function useUserAuth() {
    return useContext(userAuthContext);
}

// The context provider that holds the authentication state and functions
export function UserAuthContextProvider({ children }) {
    const [user, setUser] = useState(null);

  // Function to handle login
    const logIn = (email, password) => {
    // Add login logic here (e.g., Firebase authentication)
    // For example: firebase.auth().signInWithEmailAndPassword(email, password)
    setUser({ email }); // Example, you'd replace this with actual user info from your auth service
    };

  // Function to handle signup
    const signUp = (email, password) => {
    // Add signup logic here
    // For example: firebase.auth().createUserWithEmailAndPassword(email, password)
    setUser({ email }); // Example
    };

  // Function to handle logout
  const logOut = () => {
    setUser(null); // Reset user state
  };

  // Function to handle Google Sign-In
    const googleSignIn = () => {
      // Add Google Sign-In logic here
      // For example: firebase.auth().signInWithPopup(googleProvider)
      setUser({ email: 'googleuser@example.com' }); // Example
    };

  return (
    <userAuthContext.Provider value={{ user, logIn, signUp, logOut, googleSignIn }}>
        {children}
    </userAuthContext.Provider>
  );
}
