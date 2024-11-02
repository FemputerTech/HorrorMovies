import React from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const SignUp = ({ isLoggedIn, setIsLoggedIn }) => {
  const location = useLocation();
  const email = location.state?.email || "";
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsLoggedIn(true);
    navigate("/home", { state: { isLoggedIn: true } });
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
          <div className="email-label">
            <label className="email-text" htmlFor="email">
              Email
            </label>
            <span className="email-display">{email}</span>
          </div>
          <input
            className="password"
            id="password"
            type="password"
            placeholder="Enter your password"
            aria-label="password"
            required
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
