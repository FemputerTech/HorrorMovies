import React from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar/Sidebar";
import MoviesHome from "../components/Movies/MoviesHome";
import Footer from "../components/Footer";
import "../styles/Home.css";

const Home = ({ firstName, movies, setMovies }) => {
  const subtractWidth = 250;
  return (
    <div className="home-page">
      <Header
        firstName={firstName}
        subtractWidth={subtractWidth}
        setMovies={setMovies}
      />
      <Sidebar setMovies={setMovies} />
      <main className="main-content">
        <div className="home-header">
          <div className="welcome-text">
            <h1>Welcome to Your Next Nightmare!</h1>
            <p style={{ fontStyle: "italic" }}>
              The ultimate destination for horror lovers.
            </p>
            <h3>Terror, Thrills, & Unforgettable Horrors</h3>
            <p>
              Explore creepy classics, terrifying new releases, and hidden gems.
              Rate your favorites and save them for later!{" "}
            </p>
            <h3>Browse. Discover. Prepare to be Scared.</h3>
          </div>
        </div>
        <MoviesHome />
      </main>
      <Footer />
    </div>
  );
};

export default Home;
