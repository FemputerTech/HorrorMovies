import React, { useEffect, useState } from "react";
import MovieCard from "./subcomponents/MovieCard";
import "./Main.css";

const Main = ({ selectedList }) => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
    console.log(
      `Fetched url: ${BACKEND_URL}/movies/${selectedList.endpoint}/${selectedList.key}`
    );
    // Function to fetch movies from the seleted endpoint
    const fetchMovies = async () => {
      if (selectedList.key) {
        try {
          const response = await fetch(
            `${BACKEND_URL}/movies/${selectedList.endpoint}/${selectedList.key}`
          );
          if (!response.ok) {
            throw new Error("Failed to fetch movies");
          }
          const data = await response.json();
          setMovies(data);
        } catch (error) {
          console.error("Error fetching movies:", error);
        }
      }
    };

    fetchMovies();
  }, [selectedList]);

  return (
    <div className="main">
      <h2 className="movie-list-heading">{selectedList.name}</h2>
      <div className="movies">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default Main;
