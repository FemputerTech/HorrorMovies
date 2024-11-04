import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/components/Logo.css";

const Logo = () => {
  const navigate = useNavigate();

  return (
    <div className="logo">
      <h2 className="logo-title" onClick={() => navigate("/home")}>
        Creepy Cinema
      </h2>
    </div>
  );
};

export default Logo;
