import React, { useState, useEffect } from "react";
import "./AnimeList.css";
import { getItem, setItem } from "../utils/LocalStorage";

const defaultAnimes = [
  { link: "https://www.miruro.to/", name: "miruro" },
  { link: "https://zorotv.com.in/", name: "zorotv" },
  { link: "https://aniwatch.re/", name: "aniwatchtv" },
];

const AnimeList = () => {
  const [active, setActive] = useState(false);
  const [animes, setAnimes] = useState(defaultAnimes);
  const [newName, setNewName] = useState("");
  const [newLink, setNewLink] = useState("");
  const [editingIndex, setEditingIndex] = useState(-1);
  const [editName, setEditName] = useState("");
  const [editLink, setEditLink] = useState("");

  useEffect(() => {
    const stored = getItem("animes");
    if (stored) {
      setAnimes(stored);
    }
  }, []);

  const saveAnimes = (newAnimes: typeof animes) => {
    setAnimes(newAnimes);
    setItem("animes", newAnimes);
  };

  const show = () => {
    setActive((prev) => !prev);
  };

  const addAnime = () => {
    if (newName.trim() && newLink.trim()) {
      const newAnime = { name: newName.trim(), link: newLink.trim() };
      saveAnimes([...animes, newAnime]);
      setNewName("");
      setNewLink("");
    }
  };

  const deleteAnime = (index: number) => {
    const newAnimes = animes.filter((_, i) => i !== index);
    saveAnimes(newAnimes);
  };

  const startEdit = (index: number) => {
    setEditingIndex(index);
    setEditName(animes[index].name);
    setEditLink(animes[index].link);
  };

  const saveEdit = () => {
    if (editName.trim() && editLink.trim()) {
      const newAnimes = [...animes];
      newAnimes[editingIndex] = { name: editName.trim(), link: editLink.trim() };
      saveAnimes(newAnimes);
      setEditingIndex(-1);
    }
  };

  const cancelEdit = () => {
    setEditingIndex(-1);
  };

  return (
    <>
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
            <li key={index} className="anime-item">
              {editingIndex === index ? (
                <div className="edit-form">
                  <input
                    type="text"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    placeholder="Name"
                    className="edit-input"
                  />
                  <input
                    type="url"
                    value={editLink}
                    onChange={(e) => setEditLink(e.target.value)}
                    placeholder="Link"
                    className="edit-input"
                  />
                  <button onClick={saveEdit} className="save-btn">Save</button>
                  <button onClick={cancelEdit} className="cancel-btn">Cancel</button>
                </div>
              ) : (
                <>
                  <a
                    href={anime.link}
                    target="_blank"
                    rel="noreferrer"
                    className="anime-link"
                  >
                    {anime.name}

                  </a>
                  <div className="item-actions">
                    <button onClick={() => startEdit(index)} className="edit-btn">Edit</button>
                    <button onClick={() => deleteAnime(index)} className="delete-btn">Delete</button>
                  </div>
                </>
              )}
            </li>
          ))}
        </ul>
        <div className="add-form">
          <input
            type="text"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            placeholder="New anime name"
            className="add-input"
          />
          <input
            type="url"
            value={newLink}
            onChange={(e) => setNewLink(e.target.value)}
            placeholder="New anime link"
            className="add-input"
          />
          <button onClick={addAnime} className="add-btn">Add</button>
        </div>
      </div>
    </>
  );
};

export default AnimeList;
