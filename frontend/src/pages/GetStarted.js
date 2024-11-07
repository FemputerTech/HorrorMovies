import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Auth.css";

const GetStarted = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const subtractWidth = 0;

  const handleSubmit = (event) => {
    event.preventDefault();
    navigate("/signup", { state: { email } });
  };

  return (
    <div className="auth-page" id="get-started-page">
      <Header subtractWidth={subtractWidth} />
      <main className="auth-main">
        <div className="auth-container" id="get-started-container">
          <div className="get-started-title">
            <h1>Unlimited horror movie recommendations</h1>
            <h2>It's completely free!</h2>
            <p>Enter your email to unlock terrifying recommendations.</p>
          </div>
          <form className="get-started-form" onSubmit={handleSubmit}>
            <input
              className="email"
              id="email"
              type="email"
              placeholder="Email address"
              value={email}
              autoComplete="email"
              required
              onChange={(event) => setEmail(event.target.value)}
            />
            <button className="button" id="get-started-button" type="submit">
              Get Started
            </button>
          </form>
          <div className="link-container">
            Don't want to sign up? <br />
            <span>
              <Link to="/home" className="link">
                Click here
              </Link>{" "}
              to just browse.
            </span>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default GetStarted;
