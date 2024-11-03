import React, { useState } from "react";
import axios from "axios";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./Signup.css";

const Signup = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email || "";
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      const response = await axios.post(`${BACKEND_URL}/auth/signup`, {
        email,
        password,
      });
      // On successful signup
      if (response.status === 200) {
        console.log("success!");
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
    <div className="signup-page">
      <Header />
      <main className="signup-main">
        <div className="signup-container">
          <div className="signup-title">
            <h1>Joining Creepy Cinema is easy.</h1>
            <p>
              Enter your password and you'll be getting creeped out in no time.
            </p>
          </div>
          {error && <p className="error-message">{error}</p>}
          <form className="signup-form" action="POST" onSubmit={handleSubmit}>
            <div className="username-container">
              <label className="username-label" htmlFor="username">
                Email
              </label>
              <input
                className="username"
                id="username"
                type="email"
                value={email}
                autoComplete="new-email"
                readOnly
              />
            </div>
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
            <button className="signup-button" type="submit">
              Sign Up
            </button>
          </form>
        </div>
        <Link to="/login">Login</Link>
      </main>
      <Footer />
    </div>
  );
};

export default Signup;
