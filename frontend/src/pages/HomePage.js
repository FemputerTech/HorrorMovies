import React, { useState } from "react";
import Header from "../components/Header/Header";
import Sidebar from "../components/Sidebar/Sidebar";
import Main from "../components/Main/Main";
import Footer from "../components/Footer/Footer";

const HomePage = ({ isLoggedIn, setIsLoggedIn }) => {
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
      <Header
        name="Meghan"
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn}
      />
      <Sidebar onListClick={handleListClick} />
      <Main selectedList={selectedList} />
      <Footer />
    </div>
  );
};

export default HomePage;
