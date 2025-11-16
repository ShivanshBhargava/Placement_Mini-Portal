import React from "react";
import "./AuthButtons.css";
import { useNavigate } from "react-router-dom";

function AuthButtons() {

  const navigate = useNavigate();
  return (
    <div className="auth-buttons">
        <button className="signup-btn">Sign Up</button>
      <button className="login-btn" onClick={() => window.open("/login", "_blank")}>Login</button>
    </div>
  );
}

export default AuthButtons;