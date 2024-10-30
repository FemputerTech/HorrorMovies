import React, { useEffect, useState } from "react";
import MovieCard from "./subcomponents/MovieCard";
import "./Main.css";

const Main = ({ selectedList }) => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    // Function to fetch movies from the seleted endpoint
    const fetchMovies = async () => {
      if (selectedList.key) {
        try {
          const response = await fetch(
            `http://localhost:5000/movies/${selectedList.endpoint}/${selectedList.key}`
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
      <ul className="movies">
        {movies.map((movie) => (
          <li key={movie.id}>
            <MovieCard movie={movie} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Main;
