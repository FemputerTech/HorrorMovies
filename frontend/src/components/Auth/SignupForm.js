import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../../App";
import "../../styles/components/SignupForm.css";

function SignupForm({ signupForm, handleChange }) {
  const { setUser, handleLogin } = useUserContext();
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      const response = await axios.post(
        `${BACKEND_URL}/auth/signup`,
        signupForm
      );
      // On successful signup
      if (response.status === 201) {
        const userData = response.data.savedUser;
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
    <form className="signup-form" action="POST" onSubmit={handleSubmit}>
      <label className="auth-form-label">
        First Name
        <input
          className="auth-input"
          id="su-first-name"
          name="firstName"
          type="text"
          placeholder="Enter your first name"
          aria-label="first name"
          onChange={handleChange}
          autoComplete="given-name"
          required
        />
      </label>
      <label className="auth-form-label">
        Last Name
        <input
          className="auth-input"
          id="su-last-name"
          name="lastName"
          type="text"
          placeholder="Enter your last name"
          aria-label="last name"
          onChange={handleChange}
          autoComplete="family-name"
          required
        />
      </label>
      <label className="auth-form-label">
        Email
        <input
          className="auth-input"
          id="su-email"
          name="email"
          type="email"
          value={signupForm.email}
          readOnly
        />
      </label>
      <label className="auth-form-label">
        Password
        <input
          className="auth-input"
          id="su-password"
          name="password"
          type="password"
          placeholder="Enter your password"
          aria-label="password"
          onChange={handleChange}
          autoComplete="off"
          required
        />
      </label>
      <button className="button" id="signup-button" type="submit">
        Sign Up
      </button>
      {error && <p className="error-message">{error}</p>}
    </form>
  );
}

export default SignupForm;
