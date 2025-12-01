import { useState } from 'react'
import Hero from './components/Landing_page/Hero';
import Login from './components/Login/login';
import { Routes, Route } from "react-router-dom"
import { BrowserRouter } from "react-router-dom";
import CompanyDashboard from './components/Company/CompanyDashboard';

import './App.css'
import Signup from './components/Signup/Signup';

function App() {
  const [count, setCount] = useState(0)

  return (
        <BrowserRouter>
        <Routes>
            <Route path="/" element={<Hero/>}></Route>
            <Route path="/Login" element={<Login/>}></Route>
            <Route path="/Signup" element={<Signup/>}></Route>
            <Route path="/company-dashboard" element={<CompanyDashboard/>}></Route>
        </Routes>
        </BrowserRouter>
  )
}

export default App
