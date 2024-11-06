import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-regular-svg-icons";
import "../styles/components/MovieDetails.css";

const MovieDetails = ({ selectedMovie }) => {
  const [selectedOption, setSelectedOption] = useState("");
  return (
    <div className="movie-details">
      <div className="movie-details-left">
        <img
          className="movie-image"
          src={
            selectedMovie.poster_path
              ? `https://image.tmdb.org/t/p/w185${selectedMovie.poster_path}`
              : ""
          }
          alt={selectedMovie.title}
        />
        <form className="add-movie-form">
          <select
            id="dropdown"
            value={selectedOption}
            onChange={(event) => setSelectedOption(event.target.value)}
            aria-label="update status"
          >
            <option value="want to watch">Want to watch</option>
            <option value="watching">Watching</option>
            <option value="watched">Watched</option>
          </select>
          <label htmlFor="rating">Rate this movie</label>
          <input className="rating" id="rating" type="number" />
          {Array.from({ length: 5 }, (_, index) => (
            <FontAwesomeIcon key={index} icon={faStar} />
          ))}
        </form>
      </div>
      <div className="movie-details-right">
        <h1>{selectedMovie.title}</h1>
        <h2>{selectedMovie.vote_average}</h2>
        <p>{selectedMovie.vote_count} ratings</p>
        <p>{selectedMovie.overview}</p>
        <div className="genres">
          Genres:{" "}
          {selectedMovie.genres.map((genre) => (
            <span key={genre.id}>{genre.name}</span>
          ))}
        </div>
        <div className="additional-details">
          <h3>Movie details & more</h3>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
