import React from "react";

const MovieCard = ({ movie }) => {
  return (
    <div className="movie-card">
      <img
        className="movie-image"
        src={
          movie.poster_path
            ? `https://image.tmdb.org/t/p/w154${movie.poster_path}`
            : ""
        }
        alt={movie.title}
        referrerPolicy="strict-origin-when-cross-origin"
      />
      <h3 className="movie-title">{movie.title}</h3>
    </div>
  );
};

export default MovieCard;
