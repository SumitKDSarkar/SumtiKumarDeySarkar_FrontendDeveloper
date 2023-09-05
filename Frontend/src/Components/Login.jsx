import React, { useState } from "react";
import "./Style/Login.css";
import axios from "axios";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleToggle = () => {
    setIsSignUp(!isSignUp);
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }

    try {
      if (isSignUp) {
        // Signup
        const response = await axios.post(
          "https://server-brain-strome.onrender.com/user/register",
          {
            useremail: email,
            password: password,
          }
        );
        alert(response.data);
      } else {
        // Login
        const response = await axios.post("https://server-brain-strome.onrender.com/user/login", {
          useremail: email,
          password: password,
        });
        alert(response.data.message);
        window.location.href = "/";
      }
    } catch (error) {
      console.error("Error:", error);
      setError("Wrong credentials.");
    }
  };

  return (
    <div className="login-form">
      <h2>{isSignUp ? "Signup" : "Login"}</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={handleEmailChange}
            placeholder="Enter your email"
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
            placeholder="Enter your password"
          />
        </div>
        <button type="submit">{isSignUp ? "Signup" : "Login"}</button>
      </form>
      <p>
        {isSignUp ? "Already have an account? " : "Don't have an account? "}
        <button type="button" onClick={handleToggle}>
          {isSignUp ? "Login here" : "Signup here"}
        </button>
      </p>
    </div>
  );
}

export default Login;
