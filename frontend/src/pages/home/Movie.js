import React from "react";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar/Sidebar";
import MovieDetails from "../../components/MovieDetails";
import Footer from "../../components/Footer";

const Movie = ({ firstName, setSelectedList, selectedMovie }) => {
  const subtractWidth = 250;
  return (
    <div className="home-page">
      <Header firstName={firstName} subtractWidth={subtractWidth} />
      <Sidebar setSelectedList={setSelectedList} />
      <main className="main-content">
        <MovieDetails selectedMovie={selectedMovie} />
      </main>
      <Footer />
    </div>
  );
};

export default Movie;
