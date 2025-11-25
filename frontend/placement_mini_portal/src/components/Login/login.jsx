import React, { useState } from "react";
import "./login.css";
import GooCursor from "../Cursor/GooCursor";
import Signup from "../Signup/Signup";

export default function Login() {
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const email = formData.get("email");
    const password = formData.get("password");

    try {
      const response = await fetch("http://localhost:5001/Login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      console.log(response)

      const data = await response.json();

      if (!response.ok) {
        setEmailError(data.error || "Login failed");
        return;
      }

      // save token in localStorage
      localStorage.setItem("token", data.token);

      // redirect user after login
      window.location.href = "/dashboard"; 
    } catch (error) {
      console.error(error);
      setEmailError("Something went wrong");
    }
};


  return (
    <div className="login-page">
      <GooCursor />

      {/* Background */}
      <div className="bg"></div>

      <div className="container">
        <div className="auth-card">

          {/* CUTOUT MASK AREA */}
          <div className="auth-image">
            <svg width="0" height="0">
              <defs>
                <clipPath id="authClip" clipPathUnits="objectBoundingBox">
                  <path d="
                    M 0.04 0
                    H 0.85
                    Q 0.90 0 0.90 0.03
                    L 0.78 0.97
                    Q 0.78 1 0.73 1
                    H 0.02
                    Q 0 1 0 0.98
                    V 0.02
                    Q 0 0 0.02 0 Z
                  " />
                </clipPath>
              </defs>
            </svg>
          </div>

          {/* RIGHT SIDE FORM */}
          <div className="auth-content">
            <div className="auth-header">
              <h1>Welcome Back</h1>
              <p>Sign in to your account</p>
            </div>

            <form id="loginForm" className="auth-form" onSubmit={handleSubmit}>

              {/* Email */}
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input type="email" id="email" name="email" placeholder="your@email.com" required />
                <span className="error-message">{emailError}</span>
              </div>

              {/* Password */}
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <div className="password-input">
                  <input type="password" id="password" name="password" placeholder="Enter your password" required />
                </div>
                <span className="error-message">{passwordError}</span>
              </div>

              <button type="submit" className="btn btn-primary btn-full">
                <span className="btn-text">Login</span>
              </button>
            </form>

            <div className="auth-footer">
              <p>
                Don't have an account? <a href="/signup">Sign up</a>
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
