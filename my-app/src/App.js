import './App.css';
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Admin from './Admin/Admin';
import Web from './web/web';
function App() {
  return (
    <div>
      <Router>
      <Routes>
      <Route path="/" element={<Web />} />
      <Route path="/admin" element={<Admin />} />
      </Routes>
    </Router>
    </div>
    


  );
}

export default App;
