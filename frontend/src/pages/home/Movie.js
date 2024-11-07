import React from "react";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar/Sidebar";
import MovieDetails from "../../components/MovieDetails";
import Footer from "../../components/Footer";

const Movie = ({ firstName, setSelectedList, selectedMovie }) => {
  return (
    <div className="home-page">
      <Header firstName={firstName} />
      <Sidebar setSelectedList={setSelectedList} />
      <div className="main-content">
        <MovieDetails selectedMovie={selectedMovie} />
      </div>
      <Footer />
    </div>
  );
};

export default Movie;
