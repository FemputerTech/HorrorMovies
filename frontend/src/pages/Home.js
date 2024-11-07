import React from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar/Sidebar";
import Footer from "../components/Footer";
import "../styles/Home.css";

const Home = ({ firstName, setSelectedList }) => {
  return (
    <div className="home-page">
      <Header firstName={firstName} />
      <Sidebar setSelectedList={setSelectedList} />
      <div className="main-content">
        <h1>Welcome</h1>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
