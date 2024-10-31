import React from "react";

const MovieCard = ({ movie }) => {
  return (
    <div className="movie-card">
      <div className="movie-image">
        <img
          className="movie-backdrop"
          src={
            movie.poster_path
              ? `https://image.tmdb.org/t/p/w400${movie.backdrop_path}`
              : ""
          }
          alt={movie.title}
          referrerPolicy="strict-origin-when-cross-origin"
        />
      </div>
      <div className="movie-content">
        <h3 className="movie-title">{movie.title}</h3>
      </div>
    </div>
  );
};

export default MovieCard;
