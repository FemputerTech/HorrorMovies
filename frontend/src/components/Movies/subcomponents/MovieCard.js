import React from "react";
import { useNavigate } from "react-router-dom";
import backDrop from "../../../assets/creepyCinemaBackDrop.png";

const MovieCard = ({ setSelectedMovie, movie }) => {
  const navigate = useNavigate();
  const handleMovieClick = (movie) => {
    setSelectedMovie(movie);
    navigate(`/home/movie/${movie.id}`);
  };

  return (
    <div className="movie-card" onClick={() => handleMovieClick(movie)}>
      <div className="movie-card-image">
        <img
          className="movie-backdrop"
          src={
            movie.backdrop_path
              ? `https://image.tmdb.org/t/p/w400${movie.backdrop_path}`
              : backDrop
          }
          alt={movie.title}
          referrerPolicy="strict-origin-when-cross-origin"
        />
      </div>
      <div className="movie-content">
        <h3 className="movie-title">{movie.title}</h3>
        <h4 className="movie-overview">{movie.tagline}</h4>
        <div className="movie-details">
          <p className="movie-vote">{movie.vote_average}</p>
          <p className="movie-runtime">{movie.runtime} mins</p>
          <p className="movie-language">{movie.language}</p>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
