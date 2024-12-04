import React, { createContext, useState, useContext, useEffect } from "react";
import AuthPage from "./pages/AuthPage";

import axios from "axios";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
// import GetStarted from "./pages/GetStarted";
// import Signup from "./pages/auth/Signup";
// import Login from "./pages/auth/Login";
import Home from "./pages/Home";
import MovieList from "./pages/home/MovieList";
import Movie from "./pages/home/Movie";
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
  const [movies, setMovies] = useState({ title: "", list: [] });
  const [selectedMovie, setSelectedMovie] = useState(null);

  // Store user data and login status in localStorage when they change
  useEffect(() => {
    const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
    async function fetchUserMovies(userId) {
      try {
        const response = await axios.get(
          `${BACKEND_URL}/users/${userId}/movies`
        );
        // On success
        if (response.status === 200) {
          const movieData = response.data.movies;
          setUserMovies(movieData);
          localStorage.setItem("userMovies", JSON.stringify(movieData));
        }
      } catch (error) {
        console.error("Error with fetching movies", error);
      }
    }

    if (isLoggedIn && user) {
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("user", JSON.stringify(user));
      fetchUserMovies(user._id);
    } else {
      localStorage.removeItem("isLoggedIn");
      localStorage.removeItem("user");
      localStorage.removeItem("userMovies");
      setUserMovies(null);
    }
  }, [isLoggedIn, user, userMovies]);

  let firstName = "";
  if (user) {
    firstName = user.firstName[0].toUpperCase() + user.firstName.slice(1);
  }

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
              <Route path="/" element={<AuthPage setMovies={setMovies} />} />
            )}
            <Route
              path="/home"
              element={
                <Home
                  firstName={firstName}
                  movies={movies}
                  setMovies={setMovies}
                />
              }
            />
            <Route
              path="/home/list/:listKey"
              element={
                <MovieList
                  firstName={firstName}
                  setSelectedMovie={setSelectedMovie}
                  movies={movies}
                  setMovies={setMovies}
                />
              }
            />
            <Route
              path="/home/movie/:movieId"
              element={
                <Movie
                  firstName={firstName}
                  selectedMovie={selectedMovie}
                  setMovies={setMovies}
                />
              }
            />
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
