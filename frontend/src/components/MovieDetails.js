import React from "react";

const MovieDetails = ({ selectedMovie }) => {
  return (
    <div className="movie-details">
      <h1>{selectedMovie.title}</h1>
    </div>
  );
};

export default MovieDetails;
