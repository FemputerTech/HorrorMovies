import React, { useState } from "react";
import MovieCard from "./subcomponents/MovieCard";
import "../../styles/components/MovieList.css";

const Movies = ({ setSelectedMovie, movies }) => {
  const [hoveredMovieId, setHoveredMovieId] = useState(null);

  return (
    <div className="movie-list">
      <h2 className="movie-list-heading">{movies.title}</h2>
      <div className="movies">
        {movies.list.map((movie) => (
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
            {hoveredMovieId === movie.id && (
              <MovieCard setSelectedMovie={setSelectedMovie} movie={movie} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Movies;
