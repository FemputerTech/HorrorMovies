import React from "react";
import Logo from "../Logo";
import { useNavigate, useLocation } from "react-router-dom";
import { useUserContext } from "../../App";
import "../../styles/components/Header.css";

const Header = () => {
  const { isLoggedIn, handleLogout } = useUserContext();
  const navigate = useNavigate();
  const location = useLocation();

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
        ) : location.pathname !== "/home" ? (
          <Logo />
        ) : null}
      </div>
      <button className="button" id="auth-button" onClick={handleLoginLogout}>
        {isLoggedIn ? "Logout" : "Login"}
      </button>
    </div>
  );
};

export default Header;
