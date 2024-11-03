import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const SignUp = ({ isLoggedIn, setIsLoggedIn }) => {
  const location = useLocation();
  const email = location.state?.email || "";
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
      const response = await fetch(`${BACKEND_URL}/auth/signup`, {
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
        console.error("Error creating user:", errorData);
      }
    } catch (error) {
      console.error("Network error:", error);
    }
  };

  return (
    <div className="auth">
      <div className="signup-container">
        <div className="signup-title">
          <h1>Joining Creepy Cinema is easy.</h1>
          <p>
            Enter your password and you'll be getting creeped out in no time.
          </p>
        </div>
        <form className="signup" onSubmit={handleSubmit}>
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
    </div>
  );
};

export default SignUp;
