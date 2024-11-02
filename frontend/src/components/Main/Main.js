import React, { useEffect, useState } from "react";
import MovieCard from "./subcomponents/MovieCard";
import "./Main.css";

const Main = ({ selectedList }) => {
  const [movies, setMovies] = useState([]);
  const [hoveredMovieId, setHoveredMovieId] = useState(null);

  useEffect(() => {
    const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
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
          console.error(error);
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
          <div
            key={movie.id}
            className="movie-container"
            onMouseEnter={() => setHoveredMovieId(movie.id)}
            onMouseLeave={() => setHoveredMovieId(null)}
          >
            <img
              className="movie-poster"
              src={
                movie.poster_path
                  ? `https://image.tmdb.org/t/p/w185${movie.poster_path}`
                  : ""
              }
              alt={movie.title}
            />
            {hoveredMovieId === movie.id && <MovieCard movie={movie} />}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Main;
