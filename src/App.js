import React, { useEffect, useState } from "react";
import { Routes, Route, BrowserRouter as Router, Navigate} from "react-router-dom";
import { Home, Profile, LogIn, Register } from "./pages";
import { Header} from "./shared";
import { ToastContainer } from 'react-toastify';
import { auth } from "./features/firebase.config";

function App() {
  const [user, setUser] = useState();
  useEffect(()=> {
    auth.onAuthStateChanged(user => {
      setUser(user);
    });
  });

  return (
    <Router>
        <Header/>
          <Routes>
            <Route path="/" element={<Home/>}/> 
            <Route path="/login" element={<LogIn/>}/>
            <Route path="/register" element={<Register/>}/>
            <Route path="/profile" element={<Profile/>}/> 
          </Routes>
          <ToastContainer/>
    </Router>
  );
}

export default App;
