import React from "react";

const MovieCard = ({ movie }) => {
  return (
    <div className="movie-card">
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
      />
    </div>
  );
};

export default MovieCard;
