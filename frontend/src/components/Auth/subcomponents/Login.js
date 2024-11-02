import React from "react";
import { useNavigate } from "react-router-dom";

const Login = ({ isLoggedIn, setIsLoggedIn }) => {
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsLoggedIn(true);
    navigate("/home", { state: { isLoggedIn: true } });
  };
  return (
    <div className="auth">
      <div className="login-container">
        <div className="login-title">
          <h1>Login</h1>
          <form className="login" onSubmit={handleSubmit}>
            <button className="login-button" type="submit">
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
