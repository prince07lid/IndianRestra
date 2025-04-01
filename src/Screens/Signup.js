import React, { useState } from "react";
import {Link} from "react-router-dom";
export default function Signup() {
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/createuser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (data.success) {
        alert("Signup Successful!");
      } else {
        alert("Error: " + data.error);
      }
    } catch (error) {
      console.error("Signup Error:", error);
    }
  };

  return (
    <div>
      <form onSubmit={submitHandler} className="container">
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input type="text" className="form-control" id="name" name="name" value={formData.name} onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label htmlFor="location" className="form-label">Location</label>
          <input type="text" className="form-control" id="location" name="location" value={formData.location} onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email address</label>
          <input type="email" className="form-control" id="email" name="email" value={formData.email} onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" className="form-control" id="password" name="password" value={formData.password} onChange={handleChange} />
        </div>
        <button type="submit" className=" m-3 btn btn-primary btn-success">Sign Up</button>
        <Link to="/login" className=" m-3 btn btn-primary btn-danger">Already Login</Link>
      </form>
    </div>
  );
}
