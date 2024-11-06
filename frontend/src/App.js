import React, { createContext, useState, useContext, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import GetStarted from "./pages/GetStarted";
import Signup from "./pages/auth/Signup";
import Login from "./pages/auth/Login";
import Home from "./pages/Home";
import "./App.css";

// Create the context for logged in
const UserContext = createContext({
  isLoggedIn: false,
  user: null,
  userMovies: null,
});

function App() {
  // Check local storage for logged in status on initial render
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem("isLoggedIn") === "true";
  });
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const [userMovies, setUserMovies] = useState(() => {
    const storedUserMovies = localStorage.getItem("userMovies");
    return storedUserMovies ? JSON.parse(storedUserMovies) : null;
  });

  // Store user data and login status in localStorage when they change
  useEffect(() => {
    if (isLoggedIn && user) {
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("userMovies", JSON.stringify(userMovies));
    } else {
      localStorage.removeItem("isLoggedIn");
      localStorage.removeItem("user");
      localStorage.removeItem("userMovies");
    }
  }, [isLoggedIn, user, userMovies]);

  const handleLogin = () => {
    setIsLoggedIn(true);
    localStorage.setItem("isLoggedIn", "true");
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUser(null);
    setUserMovies(null);
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("user");
    localStorage.removeItem("userMovies");
  };

  return (
    <UserContext.Provider
      value={{
        isLoggedIn,
        user,
        setUser,
        userMovies,
        setUserMovies,
        handleLogin,
        handleLogout,
      }}
    >
      <div className="App">
        <Router>
          <Routes>
            {/* Public Routes: Only accessible if the user is not logged in */}
            {!isLoggedIn && (
              <>
                <Route path="/" element={<GetStarted />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/login" element={<Login />} />
              </>
            )}
            <Route path="/home" element={<Home />} />
            {/* Redirect paths to home on logged-in status */}
            <Route
              path="*"
              element={
                isLoggedIn ? <Navigate to="/home" /> : <Navigate to="/" />
              }
            />
          </Routes>
        </Router>
      </div>
    </UserContext.Provider>
  );
}

// Custom hook to use the UserContext
export const useUserContext = () => useContext(UserContext);

export default App;
