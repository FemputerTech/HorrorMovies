import React, { useState } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar/Sidebar";
import MovieDetails from "../components/MovieDetails";
import Movies from "../components/Movies/Movies";
import Footer from "../components/Footer";
import { useUserContext } from "../App";
import "../styles/Home.css";

const Home = () => {
  const { user } = useUserContext();
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [selectedList, setSelectedList] = useState({
    key: null,
    name: null,
    endpoint: null,
  });

  let firstName = "";
  if (user) {
    firstName = user.firstName[0].toUpperCase() + user.firstName.slice(1);
  }

  const handleListSelect = (listKey, listName, endpoint) => {
    setSelectedMovie(null);
    setSelectedList({ key: listKey, name: listName, endpoint });
  };

  const handleMovieSelect = (movie) => {
    setSelectedMovie(movie);
  };

  return (
    <div className="home-page">
      <Header firstName={firstName} />
      <Sidebar onListSelect={handleListSelect} />
      <div className="main-content">
        {selectedMovie ? (
          <MovieDetails selectedMovie={selectedMovie} />
        ) : (
          <Movies
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
