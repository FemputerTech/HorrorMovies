import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/components/SearchBar.css";

const SearchBar = ({ setMovies }) => {
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState("");
  const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      const response = await axios.get(
        `${BACKEND_URL}/movies/search/${searchText}`
      );
      setMovies({ title: searchText, list: response.data });
      navigate(`/home/list/${searchText}`);
    } catch (error) {
      console.error("not movies found:", error);
    }
  }
  return (
    <div className="search-bar">
      <form className="search-bar-form" action="GET" onSubmit={handleSubmit}>
        <input
          className="search-text"
          id="search"
          type="text"
          placeholder="search"
          aria-label="search"
          onChange={(event) => setSearchText(event.target.value)}
        />
      </form>
    </div>
  );
};

export default SearchBar;
