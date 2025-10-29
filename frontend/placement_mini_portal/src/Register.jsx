import React, { useState } from "react";
import "./Register.css";

function Register() {
  const [isStudent, setIsStudent] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });

  const toggleUserType = () => {
    setIsStudent(!isStudent);
    setFormData({ name: "", email: "", phone: "", password: "" });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("User Type:", isStudent ? "Student" : "Company");
    console.log("Form Data:", formData);

    console.log(
      `${isStudent ? "Student" : "Company"} Registered!\n` +
        JSON.stringify(formData, null, 2)
    );
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <h2>{isStudent ? "Student Registration" : "Company Registration"}</h2>

        <div className="toggle">
          <button
            onClick={() => setIsStudent(true)}
            className={isStudent ? "active" : ""}
          >
            Student
          </button>
          <button
            onClick={() => setIsStudent(false)}
            className={!isStudent ? "active" : ""}
          >
            Company
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          {isStudent ? (
            <>
              <input
                type="text"
                name="name"
                placeholder="Student Name"
                value={formData.name}
                onChange={handleChange}
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Student Email"
                value={formData.email}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="phone"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </>
          ) : (
            <>
              <input
                type="text"
                name="name"
                placeholder="Company Name"
                value={formData.name}
                onChange={handleChange}
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Company Email"
                value={formData.email}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="phone"
                placeholder="Company Phone Number"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </>
          )}

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <button type="submit" className="register-btn">
            Register
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;
