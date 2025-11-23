import React from "react";
import "./AuthButtons.css";
import { useNavigate } from "react-router-dom";

function AuthButtons() {

  const navigate = useNavigate();
  return (
    <div className="auth-buttons">
      <button className="signup-btn" onClick={() => window.open("/signup")}>Sign Up</button>
      <button className="login-btn" onClick={() => window.open("/login")}>Login</button>
    </div>
  );
}

export default AuthButtons;