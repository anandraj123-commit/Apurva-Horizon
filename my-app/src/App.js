import './App.css';
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Admin from './Admin/admin';
import Web from './web/web';
import Add from './Admin/content-type/Add';
import List from './Admin/content-type/List';
import View from './Admin/content-type/View';
import Update from './Admin/content-type/Update';
// import CountryState from './Country-state/Country-state'; // Import CountryState
import CategoryForm from './Admin/category/CategoryForm';
import CategoryList from './Admin/category/CategoryList';
import CategoryView from './Admin/category/CategoryView';
import CategoryUpdate from './Admin/category/CategoryUpdate';
import NewsForm from './Admin/news/NewsForm';
import NewsList from './Admin/news/NewsList';
import NewsView from './Admin/news/NewsView';
import ApurvaHorizon from './Admin/pages/ApurvaHorizon';
import RegionAdd from './Admin/regional/RegionAdd'
import RegionList from './Admin/regional/RegionList';
import RegionView from './Admin/regional/RegionView';
import RegionUpdate from './Admin/regional/RegionUpdate';
import SensorshipList from './Admin/sensorship/SensorshipList';
import SensorshipView from './Admin/sensorship/SensorshipView';


function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Web />} />
          {/* <Route path="/" element={<CountryState />} /> */}
          <Route path="/admin" element={<Admin />} >
            <Route path="content-type" element={<List />} />
            <Route path="apurva-horizon" element={<ApurvaHorizon />} />
            <Route path="news/add" element={<NewsForm />} />
            <Route path="news/list" element={<NewsList />} />
            <Route path="news/view/:id" element={<NewsView />} />
            <Route path="content-type/add" element={<Add />} />
            <Route path="content-type/view/:id" element={<View />} />
            <Route path="content-type/update/:id" element={<Update />} />
            <Route path="category-type/add" element={<CategoryForm />} />
            <Route path="category-type/list" element={<CategoryList />} />
            <Route path="category-type/view/:id" element={<CategoryView />} />
            <Route path="category-type/update/:id" element={<CategoryUpdate />} />
            <Route path="regional-news/add" element={<RegionAdd />} />
            <Route path="regional-news/list" element={<RegionList />} />
            <Route path="regional-news/view/:id" element={<RegionView />} />
            <Route path="regional-news/update/:id" element={<RegionUpdate />} />
            <Route path="sensorship-news/list" element={<SensorshipList />} />
            <Route path="sensorship-news/view/:id" element={<SensorshipView />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
