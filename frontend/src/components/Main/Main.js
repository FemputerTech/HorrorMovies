import React, { useEffect, useState } from "react";
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
            <h3 className="movie-title">{movie.title}</h3>
            <img
              className="movie-image"
              src={
                movie.poster_path
                  ? `https://image.tmdb.org/t/p/w92${movie.poster_path}`
                  : ""
              }
              alt={movie.title}
              referrerPolicy="strict-origin-when-cross-origin"
              // crossOrigin="use-credentials"
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Main;
