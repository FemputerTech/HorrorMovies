import React from "react";

const MovieLists = ({ decades, subgenres }) => {
  return (
    <div className="movie-lists">
      <ul className="filters">
        <li className="filter-item">
          <h3>Popular</h3>
          <ul className="list">
            <li className="list-item">Top 100</li>
          </ul>
        </li>
        <li className="filter-item">
          <h3 className="filter-title">Subgenres</h3>
          <ul className="list">
            {subgenres.map((subgenre, index) => (
              <li className="list-item" key={index}>
                {subgenre}
              </li>
            ))}
          </ul>
        </li>
        <li className="filter-item">
          <h3 className="filter-title">Decades</h3>
          <ul className="list">
            {decades.map((decade, index) => (
              <li className="list-item" key={index}>
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
