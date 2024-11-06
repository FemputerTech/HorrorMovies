import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as faStarRegular } from "@fortawesome/free-regular-svg-icons";
import {
  // faPencil,
  faStar as faStarSolid,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import "../styles/components/MovieDetails.css";

const MovieDetails = ({ selectedMovie }) => {
  const [selectedOption, setSelectedOption] = useState("");
  const [rating, setRating] = useState(0);
  const [ratingHover, setRatingHover] = useState(0);

  const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

  const handleStarClick = (index) => {
    if (rating === index + 1) {
      setRating(0);
    } else {
      setRating(index + 1);
    }
  };

  const handleStarHover = (index) => {
    setRatingHover(index + 1);
  };

  const handleStarHoverOut = () => {
    setRatingHover(0);
  };

  async function handleSubmit(event) {
    event.preventDefault();

    const movieData = {
      tmdbId: selectedMovie.id,
      title: selectedMovie.title,
      rating,
      status: selectedOption,
    };
    console.log(movieData);
    try {
      const response = await axios.post(`${BACKEND_URL}/user/movie`, movieData);
      console.log("Movie data submitted:", response.data);
    } catch (error) {
      console.error("Error submitting movie data:", error);
    }
  }

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
        <form className="add-movie-form" action="POST" onSubmit={handleSubmit}>
          <select
            id="dropdown"
            value={selectedOption}
            onChange={(event) => setSelectedOption(event.target.value)}
            aria-label="update status"
          >
            <option value="want to watch"> Want to watch</option>
            <option value="watching">Watching</option>
            <option value="watched">Watched</option>
          </select>
          <div className="stars" id="rating">
            {Array.from({ length: 5 }, (_, index) => (
              <FontAwesomeIcon
                className="star"
                key={index}
                icon={
                  index < (ratingHover || rating) ? faStarSolid : faStarRegular
                }
                size="xl"
                color={
                  index < ratingHover
                    ? "var(--primary-muted)"
                    : index < rating
                    ? "var(--primary)"
                    : "var(--text-faint)"
                }
                onClick={() => handleStarClick(index)}
                onMouseOver={() => handleStarHover(index)}
                onMouseOut={() => handleStarHoverOut()}
              />
            ))}
          </div>
          <label htmlFor="rating">Rate this movie</label>
          <button type="submit">Submit</button>
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
