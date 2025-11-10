import React, { useState } from "react";
import "./AnimeList.css";

const AnimeList = () => {
  const [active, setActive] = useState(false);

  const show = () => {
    setActive((prev) => !prev);
  };

  const animes = [
    { link: "https://www.miruro.to/", name: "miruro" },
    { link: "https://zorotv.com.in/", name: "zorotv" },
    { link: "https://aniwatch.re/", name: "aniwatchtv" },
    // Add more anime objects as needed
  ];

  return (
    <div>
      <button
        className={`AnimeListcontainer collapsible ${active && "expand"}`}
        onClick={show}
        title="click to expand/collapse anime list"
      >
        Anime List
        <img
          width="24"
          height="24"
          src="./icons/about.png"
          title="Before click on anime link make sure deactivate the extension by clicking on button above"
          alt="about"
        />
      </button>
      <div className={`AnimeList content ${active ? "show" : ""}`}>
        <ul id="option_list">
          {animes.map((anime, index) => (
            <li key={index}>
              <a
                href={anime.link}
                target="_blank"
                rel="noreferrer"
                className="anime-link"
              >
                {anime.name}
                <img src="./icons/openthis.png" alt="open" />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AnimeList;
