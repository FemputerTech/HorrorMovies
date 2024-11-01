import React from "react";
import "./Auth.css";

const Register = () => {
  return (
    <div className="auth">
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
  );
};

export default Register;
