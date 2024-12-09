import './App.css';
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Admin from './Admin/Admin';
import Web from './web/web';
import Add from './Admin/content-type/Add';
import List from './Admin/content-type/List';
import View from './Admin/content-type/View';
import Update from './Admin/content-type/Update';
import CategoryForm from './Admin/category/CategoryForm';
import CategoryList from './Admin/category/CategoryList';
import CategoryView from './Admin/category/CategoryView';
import CategoryUpdate from './Admin/category/CategoryUpdate';


function App() {

  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Web />} />
          <Route path="/admin" element={<Admin />} >
            <Route path="content-type" element={<List />} />
            <Route path="content-type/add" element={<Add />} />
            <Route path="content-type/view/:id" element={<View />} />
            <Route path="content-type/update/:id" element={<Update />} />
            <Route path="category-type/add" element={<CategoryForm />} />
            <Route path="category-type/list" element={<CategoryList />} />
            <Route path="category-type/view/:id" element={<CategoryView />} />
            <Route path="category-type/update/:id" element={<CategoryUpdate />} />
          </Route>
        </Routes>
      </Router>
    </div>



  );
}

export default App;
