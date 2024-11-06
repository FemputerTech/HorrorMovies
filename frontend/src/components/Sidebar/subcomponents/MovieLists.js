import React, { useState } from "react";

const MovieLists = ({ decades, subgenres, onListSelect }) => {
  const [clickedSubgenre, setClickedSubgenre] = useState(null);
  const [activeSubgenre, setActiveSubgenre] = useState(null);

  const handleMouseDown = (key) => {
    setClickedSubgenre(key);
  };

  const handleListClick = (key, label) => {
    setActiveSubgenre(key);
    setClickedSubgenre(null);
    onListSelect(key, label, "subgenre");
  };

  return (
    <div className="movie-lists">
      <ul className="filters">
        <li className="filter-item">
          <h3 className="filter-title">Subgenres</h3>
          <ul className="list">
            {subgenres.map((subgenre, index) => (
              <li
                className={`list-item 
                ${activeSubgenre === subgenre.key ? "active" : ""} 
                ${clickedSubgenre === subgenre.key ? "clicked" : ""}`}
                key={subgenre.key}
                onMouseDown={() => handleMouseDown(subgenre.key)}
                onClick={() => handleListClick(subgenre.key, subgenre.label)}
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
