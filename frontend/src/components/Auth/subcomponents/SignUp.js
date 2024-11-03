import React from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const SignUp = ({ isLoggedIn, setIsLoggedIn }) => {
  const location = useLocation();
  const email = location.state?.email || "";
  const navigate = useNavigate();

  console.log(email);

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
