import React, { useState } from "react";

const Auth = () => {
  const [auth, setAuth] = useState("Login");

  const handleAuth = () => {
    setAuth((previousAuth) => {
      if (previousAuth === "Login") {
        return "Logout";
      } else {
        return "Login";
      }
    });
  };

  return (
    <div className="auth">
      <button className="auth-button" onClick={handleAuth}>
        {auth}
      </button>
    </div>
  );
};

export default Auth;
