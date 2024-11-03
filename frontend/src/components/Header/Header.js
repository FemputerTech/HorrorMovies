import React from "react";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../../App";
import "./Header.css";

const Header = () => {
  const { isLoggedIn, handleLogout } = useUserContext();
  const navigate = useNavigate();

  const handleLoginLogout = () => {
    if (!isLoggedIn) {
      // User is not logged in, navigate to login page
      navigate("/login");
    } else {
      // User is logged in, handle logout and navigate to get started page
      handleLogout();
      navigate("/");
    }
  };

  return (
    <div className="header">
      <div>
        {isLoggedIn ? (
          // <span>Welcome back {name}!</span>
          <span>Welcome back!</span>
        ) : (
          <span className="logo-title">Creepy Cinema</span>
        )}
      </div>
      <button className="auth-button" onClick={handleLoginLogout}>
        {isLoggedIn ? "Logout" : "Login"}
      </button>
    </div>
  );
};

export default Header;
