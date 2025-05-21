import { useState } from 'react'
import './App.css'
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LandingPage from './LandingPage/LandingPage.jsx';
import HowItWorks from './LandingPage/HowItWorks.jsx';
import Categories from './LandingPage/Categories.jsx';
import SignIn from './AuthPages/SignIn.jsx';
import SignUp from './AuthPages/SignUp.jsx';
import Dashboard from './Dashboard/Dashboard.jsx';
import Marketplace from './Dashboard/Marketplace.jsx';
import SellItem from './Dashboard/SellItem.jsx';
import AuthCallback from './AuthPages/AuthCallback.jsx';
// import InAppMessanger from './Dashboard/InAppMessanger.jsx';

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
       {/* Add this new route */}
       <Route path="/auth/callback" element={<AuthCallback />} />
       <Route path="/dashboard" element={<Dashboard />} />
       <Route path="/marketplace" element={<Marketplace />} />
       {/* <Route path="/message" element={<InAppMessanger />} /> */}
       <Route path="/sell" element={<SellItem />} />
     </Routes>
     </BrowserRouter>
    </>
  );
}

export default App;