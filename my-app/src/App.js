import './App.css';
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Admin from './Admin/admin';
import Web from './web/web';
import Add from './Admin/content-type/Add';
import List from './Admin/content-type/List';
import View from './Admin/content-type/View';
import Update from './Admin/content-type/Update';
import CountryState from './Country-state/Country-state'; // Import CountryState

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<CountryState />} />
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
