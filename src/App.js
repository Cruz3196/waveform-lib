import React from "react";
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import { AuthProvider } from "./features";
import { Home, Profile } from "./pages";
import { Header} from "./shared";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Header/>
          <Routes>
            <Route path="/" element={<Home/>}/> 
            <Route path="/profile" element={<Profile/>}/> 
          </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
