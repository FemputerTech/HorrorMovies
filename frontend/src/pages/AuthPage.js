import React from "react";
import Header from "../components/Header/Header";
import "./AuthPage.css";

const AuthPage = ({ isLoggedIn, setIsLoggedIn }) => {
  return (
    <div className="auth-page">
      <Header
        name="Meghan"
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn}
      />
      <div className="auth-section">
        <div className="register-container">
          <h1>Free Horror Movie Recommendation Site</h1>
          <form className="register">
            <input
              className="email"
              id="email"
              type="email"
              placeholder="Email address"
              required
            />
            <button className="get-started" type="submit">
              Get Started
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
