import React from "react";
import Logo from "./subcomponents/Logo";
import MovieLists from "./subcomponents/MovieLists";
import "./Sidebar.css";

const Sidebar = ({ onListClick }) => {
  const subgenres = [
    "Analog Horror",
    "Body Horror",
    "Comedy Horror",
    "Creature Feature",
    "Folk Horror",
    "Found Footage",
    "Giallo",
    "Gothic",
    "Occult",
    "Paranormal",
    "Pyschological Horror",
    "Slasher",
    "Supernatural Horror",
    "Survival Horror",
    "Vampire",
    "Zombie Feature",
  ];
  const decades = [
    "1920s",
    "1930s",
    "1940s",
    "1950s",
    "1960s",
    "1970s",
    "1980s",
    "1990s",
    "2000s",
    "2010s",
    "2020s",
  ];
  return (
    <div className="sidebar">
      <Logo />
      <MovieLists
        subgenres={subgenres}
        decades={decades}
        onListClick={onListClick}
      />
      <div className="settings">Settings</div>
    </div>
  );
};

export default Sidebar;
