import React, { useState } from "react";
import Header from "../components/Header/Header";
import Sidebar from "../components/Sidebar/Sidebar";
import Main from "../components/Main/Main";
import Footer from "../components/Footer/Footer";
// import { useLocation } from "react-router-dom";
import "../styles/Home.css";

const Home = () => {
  // const location = useLocation();

  const [selectedList, setSelectedList] = useState({
    key: null,
    name: null,
    endpoint: null,
  });

  const handleListClick = (listKey, listName, endpoint) => {
    setSelectedList({ key: listKey, name: listName, endpoint });
  };
  return (
    <div className="home-page">
      {/* <h1>CREEPY CINEMA {location.state.id}</h1> */}
      <Header />
      <Sidebar onListClick={handleListClick} />
      <Main selectedList={selectedList} />
      <Footer />
    </div>
  );
};

export default Home;
