import React from "react";
import Logo from "./Logo";
import SearchBar from "./SearchBar";
import { useNavigate, useLocation } from "react-router-dom";
import { useUserContext } from "../App";
import "../styles/components/Header.css";

const Header = ({ firstName, subtractWidth, setMovies }) => {
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
    <div
      className="header"
      style={{
        left: `${subtractWidth}px`,
        width: `calc(100% - ${subtractWidth}px)`,
      }}
    >
      <div className="logo-container">
        {isLoggedIn ? (
          <span>Welcome back {firstName}!</span>
        ) : !location.pathname.startsWith("/home") ? (
          <Logo />
        ) : null}
      </div>
      <SearchBar setMovies={setMovies} />
      <div className="button-container">
        <button className="button" id="auth-button" onClick={handleLoginLogout}>
          {isLoggedIn ? "Logout" : "Login"}
        </button>
      </div>
    </div>
  );
};

export default Header;
