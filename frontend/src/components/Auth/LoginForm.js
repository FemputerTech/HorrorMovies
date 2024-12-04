import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../../App";
import axios from "axios";
import "../../styles/components/LoginForm.css";

function LoginForm({ loginForm, handleChange }) {
  const { setUser, handleLogin } = useUserContext();
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      const response = await axios.post(`${BACKEND_URL}/auth/login`, loginForm);
      // On successful login
      if (response.status === 200) {
        const userData = response.data.user;
        setUser(userData);
        handleLogin();
        navigate("/home");
      }
    } catch (error) {
      // Handle error response
      if (error.response) {
        // Server responded with a status other than 200 range
        setError(
          error.response.data.message || "An error occurred. Please try again."
        );
      } else {
        // Network error or something went wrong
        setError("An error occurred. Please try again.");
      }
    }
  }

  return (
    <form className="login-form" action="POST" onSubmit={handleSubmit}>
      <input
        className="auth-input"
        id="li-email"
        name="email"
        type="email"
        placeholder="Enter your email"
        aria-label="email"
        autoComplete="new-email"
        onChange={handleChange}
        required
      />
      <input
        className="auth-input"
        id="password"
        name="password"
        type="password"
        placeholder="Enter your password"
        aria-label="password"
        autoComplete="new-password"
        onChange={handleChange}
        required
      />
      <button className="button" id="login-button" type="submit">
        Login
      </button>
      {error && <p className="error-message">{error}</p>}
    </form>
  );
}

export default LoginForm;
