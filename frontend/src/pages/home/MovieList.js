import React from "react";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar/Sidebar";
import Movies from "../../components/Movies/Movies";
import Footer from "../../components/Footer";

const MovieList = ({
  firstName,
  selectedList,
  setSelectedList,
  setSelectedMovie,
}) => {
  return (
    <div className="home-page">
      <Header firstName={firstName} />
      <Sidebar setSelectedList={setSelectedList} />
      <main className="main-content">
        <Movies
          setSelectedMovie={setSelectedMovie}
          selectedList={selectedList}
        />
      </main>
      <Footer />
    </div>
  );
};

export default MovieList;
