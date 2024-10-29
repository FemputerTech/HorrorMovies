import React from "react";

const MovieLists = ({ decades, subgenres, onListClick }) => {
  return (
    <div className="movie-lists">
      <ul className="filters">
        <li className="filter-item">
          <h3>Popular</h3>
          <ul className="list">
            <li className="list-item" onClick={() => onListClick("Top 100")}>
              Top 100
            </li>
          </ul>
        </li>
        <li className="filter-item">
          <h3 className="filter-title">Subgenres</h3>
          <ul className="list">
            {subgenres.map((subgenre, index) => (
              <li
                className="list-item"
                key={index}
                onClick={() => onListClick(subgenre)}
              >
                {subgenre}
              </li>
            ))}
          </ul>
        </li>
        <li className="filter-item">
          <h3 className="filter-title">Decades</h3>
          <ul className="list">
            {decades.map((decade, index) => (
              <li
                className="list-item"
                key={index}
                onClick={() => onListClick(decade)}
              >
                {decade}
              </li>
            ))}
          </ul>
        </li>
      </ul>
    </div>
  );
};

export default MovieLists;
