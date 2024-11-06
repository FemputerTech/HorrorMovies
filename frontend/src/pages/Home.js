import React, { useState } from "react";
import Header from "../components/Header/Header";
import Sidebar from "../components/Sidebar/Sidebar";
import MovieDetails from "../components/MovieDetails";
import MovieList from "../components/Movies/MovieList";
import Footer from "../components/Footer/Footer";
import "../styles/Home.css";

const Home = () => {
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [selectedList, setSelectedList] = useState({
    key: null,
    name: null,
    endpoint: null,
  });

  const handleListSelect = (listKey, listName, endpoint) => {
    setSelectedMovie(null);
    setSelectedList({ key: listKey, name: listName, endpoint });
  };

  const handleMovieSelect = (movie) => {
    setSelectedMovie(movie);
  };

  return (
    <div className="home-page">
      <Header />
      <Sidebar onListSelect={handleListSelect} />
      <div className="main-content">
        {selectedMovie ? (
          <MovieDetails selectedMovie={selectedMovie} />
        ) : (
          <MovieList
            onMovieSelect={handleMovieSelect}
            selectedList={selectedList}
          />
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Home;
