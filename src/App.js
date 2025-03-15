import React, { useEffect, useState } from "react";
import { Routes, Route, BrowserRouter as Router} from "react-router-dom";
import { Home, Profile, LogIn, Register } from "./pages";
import { Header,ProfileLib} from "./shared";
import { ToastContainer } from 'react-toastify';
import { auth } from "./features/firebase.config";

function App() {
  const [user, setUser] = useState(null);

  useEffect(()=> {
    const unsubscribe  = auth.onAuthStateChanged((user) => {
      setUser(user);
    });
    return () => unsubscribe(); 
  }, []);

  return (
    <Router>
        <Header user={user}/>
          <Routes>
            <Route path="/" element={<Home/>}/> 
            <Route path="/login" element={<LogIn/>}/>
            <Route path="/register" element={<Register/>}/>
            <Route path="/profile" element={<Profile/>}/> 
            <Route path="/profilelib" element={<ProfileLib/>}/>
          </Routes>
          <ToastContainer/>
    </Router>
  );
}

export default App;
