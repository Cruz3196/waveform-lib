import React from "react";
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import { Home } from "./pages";
import { Header} from "./shared";
import { ImageProvider } from "./shared/components/ImageContext/ImageContext";

function App() {
  return (
    <ImageProvider>
      <Router>
        <Header/>
          <Routes>
            <Route path="/" element={<Home/>}/> 
          </Routes>
      </Router>
    </ImageProvider>
  );
}

export default App;
