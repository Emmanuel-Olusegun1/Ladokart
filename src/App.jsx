import { useState } from 'react'
import './App.css'
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LandingPage from './LandingPage/LandingPage.jsx';
import HowItWorks from './LandingPage/HowItWorks.jsx';
import Categories from './LandingPage/Categories.jsx';
import SignIn from './AuthPages/SignIn.jsx';
import SignUp from './AuthPages/SignUp.jsx';



function App() {
  return (
    <>
     <BrowserRouter>
     <Routes>

     <Route path="/" element={<LandingPage />} />
     <Route path="/how-it-works" element={<HowItWorks />} />
     <Route path="/categories" element={<Categories />} />
     <Route path="/login" element={<SignIn />} />
     <Route path="/register" element={<SignUp />} />

     </Routes>
     </BrowserRouter>
    </>
  );
};

export default App;
