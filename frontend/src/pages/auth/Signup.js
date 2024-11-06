import React, { useState } from "react";
import axios from "axios";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useUserContext } from "../../App";
import "../../styles/Auth.css";

const Signup = () => {
  const { setUser, handleLogin } = useUserContext();
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email || "";
  let [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      const response = await axios.post(`${BACKEND_URL}/auth/signup`, {
        firstName,
        lastName,
        email,
        password,
      });
      // On successful signup
      if (response.status === 201) {
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
    <div className="auth-page" id="signup-page">
      <Header />
      <main className="auth-main">
        <div className="auth-container" id="signup-container">
          <div className="signup-title">
            <h1>Joining Creepy Cinema is easy.</h1>
            <p>
              Enter your password and you'll be getting creeped out in no time.
            </p>
          </div>
          {error && <p className="error-message">{error}</p>}
          <form className="signup-form" action="POST" onSubmit={handleSubmit}>
            <div className="input-container">
              <label className="label" htmlFor="first-name">
                First Name
              </label>
              <input
                className="first-name"
                id="first-name"
                name="firstName"
                type="text"
                placeholder="Enter your first name"
                aria-label="first name"
                onChange={(event) => setFirstName(event.target.value)}
                autoComplete="given-name"
                required
              />
            </div>
            <div className="input-container">
              <label className="label" htmlFor="last-name">
                Last Name
              </label>
              <input
                className="last-name"
                id="last-name"
                name="lastName"
                type="text"
                placeholder="Enter your last name"
                aria-label="last name"
                onChange={(event) => setLastName(event.target.value)}
                autoComplete="family-name"
                required
              />
            </div>
            <div className="input-container">
              <label className="label" htmlFor="username">
                Email
              </label>
              <input
                className="signup-username"
                id="username"
                name="username"
                type="email"
                value={email}
                autoComplete="email"
                readOnly
              />
            </div>
            <div className="input-container">
              <label className="label" htmlFor="password">
                Password
              </label>
              <input
                className="password"
                id="password"
                name="password"
                type="password"
                placeholder="Enter your password"
                aria-label="password"
                onChange={(event) => setPassword(event.target.value)}
                autoComplete="off"
                required
              />
            </div>
            <button className="button" id="signup-button" type="submit">
              Sign Up
            </button>
          </form>
          <div className="link-container">
            Already have an account? <br />
            <span>
              <Link to="/login" className="link">
                Click here
              </Link>{" "}
              to login.
            </span>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Signup;
