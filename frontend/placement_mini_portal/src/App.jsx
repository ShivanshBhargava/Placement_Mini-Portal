import { useState } from 'react'
// import Register from './components/Register.jsx'
import Hero from './components/Landing_page/Hero';
import Login from './components/Login/login';
import { Routes, Route } from "react-router-dom"
import { BrowserRouter } from "react-router-dom";

import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
        <BrowserRouter>
        <Routes>
            <Route path="/" element={<Hero/>}></Route>
            <Route path="/Login" element={<Login/>}></Route>
        </Routes>
        </BrowserRouter>
  )
}

export default App
