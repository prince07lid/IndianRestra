import React, { useState } from "react";
import {useNavigate} from "react-router-dom";
export default function Login() {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };
  const navigate = useNavigate();
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/loginuser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });

      const data = await response.json();
      if (data.success) {
        // alert("Login Successful!");
        // const navigate = useNavigate();
        localStorage.setItem("authToken",data.authToken);
        console.log(localStorage.getItem("authToken"));
        navigate("/");
      } else {
        alert("Error: " + data.error);
      }
    } catch (error) {
      console.error("Login Error:", error);
    }
  };

  return (
    <div>
      <form onSubmit={submitHandler} className="container">
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email address</label>
          <input type="email" className="form-control" id="email" name="email" value={credentials.email} onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" className="form-control" id="password" name="password" value={credentials.password} onChange={handleChange} />
        </div>
        <button type="submit" className="btn btn-primary">Login</button>
      </form>
    </div>
  );
}
