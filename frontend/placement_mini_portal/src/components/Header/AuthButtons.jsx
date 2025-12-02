import React from "react";
import "./AuthButtons.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function AuthButtons() {
  const navigate = useNavigate();
  const { token, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="auth-buttons">
      {token ? (
        <>
          <button className="login-btn" onClick={() => navigate("/dashboard")}>Dashboard</button>
          <button className="signup-btn" onClick={handleLogout}>Logout</button>
        </>
      ) : (
        <>
          <button className="signup-btn" onClick={() => navigate("/Signup")}>Sign Up</button>
          <button className="login-btn" onClick={() => navigate("/Login")}>Login</button>
        </>
      )}
    </div>
  );
}

export default AuthButtons;