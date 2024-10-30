import React from "react";

const MovieLists = ({ decades, subgenres, onListClick }) => {
  return (
    <div className="movie-lists">
      <ul className="filters">
        <li className="filter-item">
          <h3 className="filter-title">Subgenres</h3>
          <ul className="list">
            {subgenres.map((subgenre, index) => (
              <li
                className="list-item"
                key={subgenre.key}
                onClick={() =>
                  onListClick(subgenre.key, subgenre.label, "subgenre")
                }
              >
                {subgenre.label}
              </li>
            ))}
          </ul>
        </li>
      </ul>
    </div>
  );
};

export default MovieLists;
