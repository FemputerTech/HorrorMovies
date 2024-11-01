import React, { useState } from "react";
import Auth from "./subcomponents/Auth";
import "./Header.css";

const Header = ({ name }) => {
  return (
    <div className="header">
      <div>Welcome back {name}!</div>
      <Auth />
    </div>
  );
};

export default Header;
