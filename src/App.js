import React from "react";
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import { Home, Profile } from "./pages";
import { Header} from "./shared";

function App() {
  return (
      <Router>
        <Header/>
          <Routes>
            <Route path="/" element={<Home/>}/> 
            <Route path="/profile" element={<Profile/>}/> 
          </Routes>
      </Router>
  );
}

export default App;
