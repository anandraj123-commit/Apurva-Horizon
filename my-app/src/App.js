import './App.css';
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Admin from './Admin/Admin';
import Web from './web/web';
import Add from './Admin/content-type/Add';
import List from './Admin/content-type/List';
import View  from './Admin/content-type/View';
import Update from './Admin/content-type/Update';

function App() {

  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Web />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/admin/content-type" element={<List />} />
          <Route path="/admin/content-type/add" element={<Add />} />
          <Route path="/admin/content-type/view/:id" element={<View />} />
          <Route path="/admin/content-type/update/:id" element={<Update />} />
        </Routes>
      </Router>
    </div>



  );
}

export default App;
