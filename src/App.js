import React from "react";
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import { Home } from "./pages";
import { Header} from "./shared";

function App() {
  return (
      <Router>
        <Header/>
          <Routes>
            <Route path="/" element={<Home/>}/> 
          </Routes>
      </Router>
  );
}

export default App;
