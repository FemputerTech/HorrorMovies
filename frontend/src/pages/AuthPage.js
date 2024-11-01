import React from "react";
import Header from "../components/Header/Header";
import Register from "../components/Auth/Register";
import Footer from "../components/Footer/Footer";

const AuthPage = ({ isLoggedIn, setIsLoggedIn }) => {
  return (
    <div className="auth-page">
      <Header
        name="Meghan"
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn}
      />
      <Register />
      <Footer />
    </div>
  );
};

export default AuthPage;
