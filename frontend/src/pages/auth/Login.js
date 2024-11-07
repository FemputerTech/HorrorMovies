import React, { useState } from "react";
import axios from "axios";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { Link, useNavigate } from "react-router-dom";
import { useUserContext } from "../../App";
import "../../styles/Auth.css";

const Login = ({ setMovies }) => {
  const { setUser, handleLogin } = useUserContext();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const subtractWidth = 0;

  const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      const response = await axios.post(`${BACKEND_URL}/auth/login`, {
        email,
        password,
      });
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
    <div className="auth-page" id="login-page">
      <Header subtractWidth={subtractWidth} setMovies={setMovies} />
      <main className="auth-main">
        <div className="auth-container" id="login-container">
          <div className="login-title">
            <h1>Login to Creepy Cinema</h1>
          </div>
          {error && <p className="error-message">{error}</p>}
          <form className="login-form" action="POST" onSubmit={handleSubmit}>
            <input
              className="login-username"
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
            <button className="button" id="login-button" type="submit">
              Login
            </button>
          </form>
          <div className="link-container">
            Don't have an account? <br />
            <span>
              <Link to="/" className="link">
                Click here
              </Link>{" "}
              to sign up.
            </span>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Login;
