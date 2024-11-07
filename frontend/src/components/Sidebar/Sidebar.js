import React from "react";
import Logo from "../Logo";
import SidebarLists from "./subcomponents/SidebarLists";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import "../../styles/components/Sidebar.css";

const Sidebar = ({ setSelectedList }) => {
  const subgenres = [
    { key: "analog-horror", label: "Analog Horror" },
    { key: "body-horror", label: "Body Horror" },
    { key: "creature-feature", label: "Creature Feature" },
    { key: "folk-horror", label: "Folk Horror" },
    { key: "found-footage", label: "Found Footage" },
    { key: "horror-comedy", label: "Horror Comedy" },
    { key: "giallo", label: "Giallo" },
    { key: "gothic", label: "Gothic" },
    { key: "occult", label: "Occult" },
    { key: "paranormal", label: "Paranormal" },
    { key: "psychological", label: "Psychological Horror" },
    { key: "slasher", label: "Slasher" },
    { key: "supernatural", label: "Supernatural Horror" },
    { key: "survival-horror", label: "Survival Horror" },
    { key: "vampire", label: "Vampire" },
    { key: "werewolf", label: "Werewolf" },
    { key: "zombie", label: "Zombie Feature" },
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
      <SidebarLists
        subgenres={subgenres}
        decades={decades}
        setSelectedList={setSelectedList}
      />
      <div className="settings">
        Settings
        <FontAwesomeIcon icon={faUser} />
      </div>
    </div>
  );
};

export default Sidebar;
