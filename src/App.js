import React from "react";
import { Routes, Route, BrowserRouter as Router} from "react-router-dom";
import { Home, Profile, LogIn, Register } from "./pages";
import { Header} from "./shared";
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <Router>
        <Header/>
          <Routes>
            <Route path="/" element={<Home/>}/> 
            <Route path="/profile" element={<Profile/>}/> 
            <Route path="/login" element={<LogIn/>}/>
            <Route path="/register" element={<Register/>}/>
          </Routes>
          <ToastContainer/>
    </Router>
  );
}

export default App;
