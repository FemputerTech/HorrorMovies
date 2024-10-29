import React, { useState } from "react";
import Header from "./components/Header/Header";
import Sidebar from "./components/Sidebar/Sidebar";
import Main from "./components/Main/Main";
import Footer from "./components/Footer/Footer";
import "./App.css";

function App() {
  const [selectedList, setSelectedList] = useState(null);

  const handleListClick = (listName) => {
    setSelectedList(listName);
  };

  return (
    <div className="App">
      <Header name="Meghan" />
      <Sidebar onListClick={handleListClick} />
      <Main selectedList={selectedList} />
      <Footer />
    </div>
  );
}

export default App;
