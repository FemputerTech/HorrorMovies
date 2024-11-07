import React from "react";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar/Sidebar";
import Movies from "../../components/Movies/Movies";
import Footer from "../../components/Footer";

const MovieList = ({ firstName, setSelectedMovie, movies, setMovies }) => {
  const subtractWidth = 250;
  return (
    <div className="home-page">
      <Header firstName={firstName} subtractWidth={subtractWidth} />
      <Sidebar setMovies={setMovies} />
      <main className="main-content">
        <Movies setSelectedMovie={setSelectedMovie} movies={movies} />
      </main>
      <Footer />
    </div>
  );
};

export default MovieList;
