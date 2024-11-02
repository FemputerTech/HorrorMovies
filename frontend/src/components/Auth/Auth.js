import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Auth.css";

const Auth = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    navigate("/signup", { state: { email } });
  };

  return (
    <div className="auth">
      <div className="get-started-container">
        <h1>Free Horror Movie Recommendation Site</h1>
        <form className="get-started" onSubmit={handleSubmit}>
          <input
            className="email"
            id="email"
            type="email"
            placeholder="Email address"
            value={email}
            required
            onChange={(event) => setEmail(event.target.value)}
          />
          <button className="get-started-button" type="submit">
            Get Started
          </button>
        </form>
      </div>
    </div>
  );
};

export default Auth;
