import React, { useState } from "react";
import "./signup.css";
import GooCursor from "../Cursor/GooCursor";

export default function Signup() {
  const [role, setRole] = useState("student"); // <-- NEW
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const name = formData.get("name");
    const email = formData.get("email");
    const password = formData.get("password");

    try {
      const response = await fetch("http://localhost:5001/Signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role, name, email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setNameError(data.error || "Signup failed");
        return;
      }

      alert("Signup successful!");
      window.location.href = "/login";

    } catch (error) {
      console.error(error);
      setEmailError("Something went wrong");
    }
  };

  return (
    <div className="signup-page2">
      <GooCursor />

      {/* Background */}
      <div className="bg2"></div>

      <div className="container2">
        <div className="auth-card2">

          {/* LEFT: Form */}
          <div className="auth-content2">
            <div className="auth-header2">
              <h1>Create Account</h1>
              <p>Join us today</p>
            </div>

            {/* ---------------- ROLE SELECTION ---------------- */}
            <div className="role-select-container2">
              {role === "" ? <h3>Select Account Type</h3>:<></>}

              <div className="role-options2">

                {/* STUDENT */}
                <div
                  className={`role-card2 improved ${role === "student" ? "active" : ""}`}
                  onClick={() => setRole(role === "student" ? "" : "student")}
                >
                  <h4>Student</h4>
                </div>

                {/* COMPANY */}
                <div
                  className={`role-card2 improved ${role === "company" ? "active" : ""}`}
                  onClick={() => setRole(role === "company" ? "" : "company")}
                >
                  <h4>Company</h4>
                </div>

              </div>
            </div>


            {/* FORM (only show after selecting a role) */}
            {role && (
              <form id="signupForm2" className={`auth-form2 collapsible-content2 ${role === "company" ? "open" : "open"}`} onSubmit={handleSubmit}>
                {/* Name */}
                <div className="form-group2">
                  <label htmlFor="name">Full Name</label>
                  <input type="text" name="name" id="name" placeholder="John Doe" required />
                  <span className="error-message2">{nameError}</span>
                </div>

                {/* Email */}
                <div className="form-group2">
                  <label htmlFor="email">Email</label>
                  <input type="email" name="email" id="email" placeholder="your@email.com" required />
                  <span className="error-message2">{emailError}</span>
                </div>

                {/* Password */}
                <div className="form-group2">
                  <label htmlFor="password">Password</label>
                  <div className="password-input2">
                    <input type="password" name="password" id="password" placeholder="Create a password" required />
                  </div>
                  <span className="error-message2">{passwordError}</span>
                </div>

                <button type="submit" className="btn2 btn-primary2 btn-full2">
                  <span className="btn-text2">
                    Sign Up as {role === "student" ? "Student" : "Company"}
                  </span>
                </button>
              </form>
            )}

            <div className="auth-footer2">
              <p>
                Already have an account? <a href="/login">Login</a>
              </p>
            </div>
          </div>

          {/* RIGHT: Image */}
          <div className="auth-image2">
            <svg width="0" height="0">
              <defs>
                <clipPath id="authClip" clipPathUnits="objectBoundingBox">
                  <path d="
                    M 0.96 0
                    H 0.15
                    Q 0.10 0 0.10 0.03
                    L 0.22 0.97
                    Q 0.22 1 0.27 1
                    H 0.98
                    Q 1 1 1 0.98
                    V 0.02
                    Q 1 0 0.98 0 Z
                  " />
                </clipPath>
              </defs>
            </svg>
          </div>

        </div>
      </div>
    </div>
  );
}
