import React from "react";
import { Route, Routes } from "react-router-dom";
import Header from "../components/Header/Header";
import Auth from "../components/Auth/Auth";
import SignUp from "../components/Auth/subcomponents/SignUp";
import Login from "../components/Auth/subcomponents/Login";
import Footer from "../components/Footer/Footer";

const AuthPage = ({ isLoggedIn, setIsLoggedIn }) => {
  return (
    <div className="auth-page">
      <Header
        name="Meghan"
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn}
      />
      <Routes>
        <Route path="/" element={<Auth />} />
        <Route
          path="/signup"
          element={
            <SignUp isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
          }
        />
        <Route
          path="/login"
          element={
            <Login isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
          }
        />
      </Routes>
      <Footer />
    </div>
  );
};

export default AuthPage;
