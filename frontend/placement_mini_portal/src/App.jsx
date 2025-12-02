import Hero from './components/Landing_page/Hero';
import Login from './components/Login/login';
import { Routes, Route } from "react-router-dom"
import { BrowserRouter } from "react-router-dom";
import CompanyDashboard from './components/Company/CompanyDashboard';
import StudentDashboard from './components/Student/StudentDashboard';

import './App.css'
import Signup from '../components/Signup/Signup.jsx';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/Routing/ProtectedRoute';
import PublicRoute from './components/Routing/PublicRoute';

function App() {

  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Hero />}></Route>

          {/* Public Routes - only accessible if NOT logged in */}
          <Route element={<PublicRoute />}>
            <Route path="/Login" element={<Login />}></Route>
            <Route path="/Signup" element={<Signup />}></Route>
          </Route>

          {/* Protected Routes - only accessible if logged in */}
          <Route element={<ProtectedRoute />}>
            <Route path="/student-dashboard" element={<StudentDashboard />}></Route>
            <Route path="/company-dashboard" element={<CompanyDashboard />}></Route>
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
