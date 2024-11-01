import React from "react";
import { useNavigate } from "react-router-dom";
import "./Header.css";

const Header = ({ name, isLoggedIn, setIsLoggedIn }) => {
  const navigate = useNavigate();

  const handleAuth = () => {
    if (!isLoggedIn) {
      // User is not logged in
      setIsLoggedIn(true);
      navigate("/home");
    } else {
      // User is logged in
      setIsLoggedIn(false);
      navigate("/");
    }
  };

  return (
    <div className="header">
      <div>
        {isLoggedIn ? (
          <span>Welcome back {name}!</span>
        ) : (
          <span className="logo-title">Creepy Cinema</span>
        )}
      </div>
      <button className="auth-button" onClick={handleAuth}>
        {isLoggedIn ? "Logout" : "Login"}
      </button>
    </div>
  );
};

export default Header;
