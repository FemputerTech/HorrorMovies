import React, { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as faStarRegular } from "@fortawesome/free-regular-svg-icons";
import { faStar as faStarSolid } from "@fortawesome/free-solid-svg-icons";
import { useUserContext } from "../App";
import "../styles/components/MovieDetails.css";

const MovieDetails = ({ selectedMovie }) => {
  const { user, userMovies } = useUserContext();
  const [selectedOption, setSelectedOption] = useState("");
  const [rating, setRating] = useState(0);
  const [ratingHover, setRatingHover] = useState(0);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    if (userMovies) {
      for (let i = 0; i < userMovies.length; i++) {
        if (userMovies[i].tmdbId === selectedMovie.id) {
          setSelectedOption(userMovies[i].status);
          setRating(userMovies[i].rating);
        }
      }
    }
  }, [userMovies, selectedMovie.id]);

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

    if (!user) {
      setError("You must be logged in to rate this movie.");
      return;
    }

    const movieData = {
      tmdbId: selectedMovie.id,
      userId: user._id,
      title: selectedMovie.title,
      rating,
      status: selectedOption,
    };

    try {
      await axios.post(
        `${BACKEND_URL}/users/${user._id}/movies/add`,
        movieData
      );
      setSuccess("Thank you for your submission!");
    } catch (error) {
      if (error.response) {
        setError(error.response.data.message || "An error occurred.");
      }
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
        {error && <p className="error-message">{error}</p>}
        {success && <p className="success-message">{success}</p>}
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
