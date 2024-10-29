import React from "react";
import MovieLists from "./subcomponents/MovieLists";
import "./Sidebar.css";

const Sidebar = () => {
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
  return (
    <div className="sidebar">
      <div className="logo-container">Creepy Cinema</div>
      <MovieLists decades={decades} subgenres={subgenres} />
    </div>
  );
};

export default Sidebar;
