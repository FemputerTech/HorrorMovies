import React, { createContext, useState, useContext } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import GetStarted from "./pages/GetStarted";
import Signup from "./pages/auth/Signup";
import Login from "./pages/auth/Login";
import Home from "./pages/Home";
import "./App.css";

// Create the context for logged in
const UserContext = createContext({ isLoggedIn: false });

function App() {
  // Check local storage for logged in status on initial render
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem("isLoggedIn") === "true";
  });

  const handleLogin = () => {
    setIsLoggedIn(true);
    localStorage.setItem("isLoggedIn", "true");
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("isLoggedIn");
  };

  return (
    <UserContext.Provider value={{ isLoggedIn, handleLogin, handleLogout }}>
      <div className="App">
        <Router>
          <Routes>
            <Route path="/" element={<GetStarted />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/home" element={<Home />} />
          </Routes>
        </Router>
      </div>
    </UserContext.Provider>
  );
}

// Custom hook to use the UserContext
export const useUserContext = () => useContext(UserContext);

export default App;
