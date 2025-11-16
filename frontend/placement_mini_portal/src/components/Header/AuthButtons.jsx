import React from "react";
import "./AuthButtons.css";
import "../Login/signup.html";
import "../Login/signup-role.html";
import "../Login/signup-student.html";
import "../Login/signup-company.html";
import "../Login/Login.html";

function AuthButtons() {
  return (
    <div className="auth-buttons">
        <button className="signup-btn">Sign Up</button>
      <button className="login-btn">Login</button>
    </div>
  );
}

export default AuthButtons;