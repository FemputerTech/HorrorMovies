import React, { useState } from "react";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import { Link, useNavigate } from "react-router-dom";
import "./GetStarted.css";

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
          <h1 className="get-started-title">
            Free Horror Movie Recommendation Site
          </h1>
          <form className="get-started-form" onSubmit={handleSubmit}>
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
        <Link to="/login">Login</Link>
      </main>
      <Footer />
    </div>
  );
};

export default GetStarted;
