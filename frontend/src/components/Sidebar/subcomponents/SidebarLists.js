import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import classNames from "classnames";

const SidebarLists = ({ decades, subgenres, setSelectedList }) => {
  const navigate = useNavigate();
  const [clickedSubgenre, setClickedSubgenre] = useState(null);
  const [activeSubgenre, setActiveSubgenre] = useState(null);

  const handleMouseDown = (key) => {
    setClickedSubgenre(key);
  };

  const handleListClick = (key, label) => {
    setActiveSubgenre(key);
    setClickedSubgenre(null);
    setSelectedList({ key, name: label, endpoint: "subgenre" });
    navigate(`/home/list/${key}`);
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
