import React from "react";
import Auth from "./subcomponents/Auth";
import "./Header.css";

const Header = ({ name }) => {
  return (
    <div className="header">
      <div>Welcome back {name}!</div>
      {/* <Login /> */}
      <Auth />
    </div>
  );
};

export default Header;
