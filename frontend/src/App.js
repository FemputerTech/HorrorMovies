import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AuthPage from "./pages/AuthPage";
import "./App.css";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route
            path="/*"
            element={
              <AuthPage isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
            }
          />

          <Route
            path="/home"
            element={
              <HomePage isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
