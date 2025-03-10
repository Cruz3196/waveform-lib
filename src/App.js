import React from "react";
import { Routes, Route} from "react-router-dom";
import { Home, Profile, LogIn, Register } from "./pages";
import { Header} from "./shared";
import { AuthProvider } from "./features";

function App() {
  return (
    <AuthProvider>
        <Header/>
          <Routes>
            <Route path="/" element={<Home/>}/> 
            <Route path="/profile" element={<Profile/>}/> 
            <Route path="/login" element={<LogIn/>}/>
            <Route path="/register" element={<Register/>}/>
          </Routes>
    </AuthProvider>
  );
}

export default App;
