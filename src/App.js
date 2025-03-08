import React from "react";
import { Routes, Route} from "react-router-dom";
import { AuthProvider } from "./features";
import { Home, Profile } from "./pages";
import { Header} from "./shared";

function App() {
  return (
    <AuthProvider>
        <Header/>
          <Routes>
            <Route path="/" element={<Home/>}/> 
            <Route path="/profile" element={<Profile/>}/> 
          </Routes>
    </AuthProvider>
  );
}

export default App;
