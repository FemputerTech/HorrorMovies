import React, { useState } from "react";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import { useNavigate } from "react-router-dom";
import "../styles/GetStarted.css";

const GetStarted = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    navigate("/signup", { state: { email } });
  };

  return (
    <div className="get-started-page">
      <Header />
      <main className="get-started-main">
        <div className="get-started-container">
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
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default GetStarted;
