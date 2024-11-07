import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import classNames from "classnames";

const SidebarLists = ({ decades, subgenres, setMovies }) => {
  const navigate = useNavigate();
  const [clickedSubgenre, setClickedSubgenre] = useState(null);
  const [activeSubgenre, setActiveSubgenre] = useState(null);

  const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

  const handleMouseDown = (key) => {
    setClickedSubgenre(key);
  };

  const handleListClick = (key, label) => {
    setActiveSubgenre(key);
    setClickedSubgenre(null);
    fetchMovies(key, label);
  };

  // Function to fetch movies from the seleted endpoint
  const fetchMovies = async (key, label) => {
    try {
      const response = await fetch(`${BACKEND_URL}/movies/subgenre/${key}`);
      if (!response.ok) {
        throw new Error("Failed to fetch movies");
      }
      const data = await response.json();
      setMovies({ title: label, list: data });
      navigate(`/home/list/${key}`);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="sidebar-lists">
      <ul className="filters">
        <li className="filter-item">
          <h3 className="filter-title">Subgenres</h3>
          <ul className="list">
            {subgenres.map((subgenre, index) => (
              <li
                key={index}
                className={classNames("list-item", {
                  active: activeSubgenre === subgenre.key,
                  clicked: clickedSubgenre === subgenre.key,
                })}
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

export default SidebarLists;
