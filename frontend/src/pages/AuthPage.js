import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import Header from "../components/Header";
import GetStartedForm from "../components/Auth/GetStartedForm";
import SignupForm from "../components/Auth/SignupForm";
import LoginForm from "../components/Auth/LoginForm";
import Footer from "../components/Footer";
import "../styles/AuthPage.css";

function AuthPage({ setMovies }) {
  const [currentAuthForm, setCurrentAuthForm] = useState("getStarted");
  const [signupForm, setSignupForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });
  const location = useLocation();

  useEffect(() => {
    // Check if the authView is passed in the location state
    if (location.state?.authView) {
      setCurrentAuthForm(location.state.authView);
    }
  }, [location.state]);

  function changeCurrentAuthView(event, newAuthView) {
    event.preventDefault();
    setCurrentAuthForm(newAuthView);
  }

  function handleSignupChange(event) {
    const { name, value } = event.target;
    setSignupForm((prevSignupForm) => {
      return { ...prevSignupForm, [name]: value };
    });
  }

  function handleLoginChange(event) {
    const { name, value } = event.target;
    setLoginForm((prevLoginForm) => {
      return { ...prevLoginForm, [name]: value };
    });
  }

  const subtractWidth = 0;

  const views = {
    getStarted: {
      title: (
        <div className="auth-title" style={{ textAlign: "center" }}>
          <h1 style={{ fontSize: "3.4em" }}>
            Unlimited horror movie recommendations
          </h1>
          <h2 style={{ fontSize: "1.4em", marginBottom: "20px" }}>
            It's completely free!
          </h2>
          <p>Enter your email to unlock terrifying recommendations.</p>
        </div>
      ),
      form: (
        <GetStartedForm
          handleChange={handleSignupChange}
          handleSubmit={(event) => changeCurrentAuthView(event, "signup")}
        />
      ),
      link: (
        <div className="link-container">
          Don't want to sign up? <br />
          <span>
            <Link to="/home" className="link-button">
              Click here
            </Link>{" "}
            to just browse.
          </span>
        </div>
      ),
    },
    signup: {
      title: (
        <div className="auth-title">
          <h1>Joining Creepy Cinema is easy.</h1>
          <p>
            Enter your password and you'll be getting creeped out in no time.
          </p>
        </div>
      ),
      form: (
        <SignupForm signupForm={signupForm} handleChange={handleSignupChange} />
      ),
      link: (
        <div className="link-container">
          Already have an account? <br />
          <span>
            <button
              className="link-button"
              onClick={(event) => changeCurrentAuthView(event, "login")}
            >
              Click here
            </button>{" "}
            to login.
          </span>
        </div>
      ),
    },
    login: {
      title: <h1>Login to Creepy Cinema</h1>,
      form: (
        <LoginForm loginForm={loginForm} handleChange={handleLoginChange} />
      ),
      link: (
        <div className="link-container">
          Don't have an account? <br />
          <span>
            <button
              className="link-button"
              onClick={(event) => changeCurrentAuthView(event, "getStarted")}
            >
              Click here
            </button>{" "}
            to sign up.
          </span>
        </div>
      ),
    },
  };

  const { title, form, link } = views[currentAuthForm];

  return (
    <div className="auth-page" id="getting-started-page">
      <Header subtractWidth={subtractWidth} setMovies={setMovies} />
      <main className="auth-main">
        <div
          className="auth-container"
          style={
            currentAuthForm === "getStarted"
              ? { width: "700px" }
              : { width: "540px" }
          }
        >
          {title}
          {form}
          {link}
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default AuthPage;
