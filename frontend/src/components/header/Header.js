import React from "react";
import "./Header.css";

const Header = (props) => {
  return (
    <div className="header">
      <div>Welcome back {props.name}!</div>
    </div>
  );
};

export default Header;
