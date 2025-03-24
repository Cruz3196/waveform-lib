import React, { useEffect, useState } from "react";
import { Routes, Route, BrowserRouter as Router} from "react-router-dom";
import { Home, Profile, LogIn, Register, ProfileLibrary} from "./pages";
import { Header, PostDetails, Footer} from "./shared";
import { ToastContainer } from 'react-toastify';
import { auth } from "./features/firebase.config";
import "react-loading-skeleton/dist/skeleton.css";



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
              <Route path="/profileLibrary" element={<ProfileLibrary/>}/>
              <Route path="/post/:id" element={<PostDetails/>}/>
            </Routes>
          <ToastContainer/>
        <Footer/>
    </Router>
  );
}

export default App;
