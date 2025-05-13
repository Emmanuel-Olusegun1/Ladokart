import { useState } from 'react'
import './App.css'
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LandingPage from './LandingPage/LandingPage.jsx';
import HowItWorks from './LandingPage/HowItWorks.jsx';
import Categories from './LandingPage/Categories.jsx';



function App() {
  return (
    <>
     <BrowserRouter>
     <Routes>

     <Route path="/" element={<LandingPage />} />
     <Route path="/how-it-works" element={<HowItWorks />} />
     <Route path="/categories" element={<Categories />} />

     </Routes>
     </BrowserRouter>
    </>
  );
};

export default App;
