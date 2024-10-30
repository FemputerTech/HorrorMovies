import React, { useEffect, useState } from "react";
import "./Main.css";

const Main = ({ selectedList }) => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    // Fetch data from the endpoint
    const fetchMovies = async () => {
      try {
        const response = await fetch("http://localhost:5000/movies/top100");
        if (!response.ok) {
          throw new Error("Failed to fetch movies");
        }
        const data = await response.json();
        setMovies(data);
      } catch (error) {
        console.error("Failed to fetch movies from server:", error);
      }
    };

    if (selectedList) {
      if (selectedList === "Top 100") {
        fetchMovies();
      }
    }
  }, [selectedList]);

  return (
    <div className="main">
      <h2>{selectedList}</h2>
      {selectedList === "Top 100" && (
        <ul className="movie-list">
          {movies.map((movie) => (
            <li key={movie._id} className="movie-item">
              <img
                src={`${movie.poster}`}
                alt={movie.title}
                className="movie-poster"
              />
              <h3>{movie.title}</h3>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Main;
