import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = ({ isLoggedIn, setIsLoggedIn }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Prepare the data for the POST request
    const userData = {
      email,
      password,
    };

    const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
    try {
      const response = await fetch(`${BACKEND_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });
      if (response.ok) {
        setIsLoggedIn(true);
        navigate("/home", { state: { isLoggedIn: true } });
      } else {
        const errorData = await response.json();
        console.error("Login failed. Please try again:", errorData);
      }
    } catch (error) {
      console.error("Network error:", error);
    }
  };
  return (
    <div className="auth">
      <div className="login-container">
        <div className="login-title">
          <h1>Login</h1>
          <form className="login" onSubmit={handleSubmit}>
            <input
              className="username"
              id="username"
              type="email"
              placeholder="Enter your email"
              aria-label="email"
              autoComplete="new-email"
              required
              onChange={(event) => setEmail(event.target.value)}
            />
            <input
              className="password"
              id="password"
              type="password"
              placeholder="Enter your password"
              aria-label="password"
              autoComplete="new-password"
              required
              onChange={(event) => setPassword(event.target.value)}
            />
            <button className="login-button" type="submit">
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
