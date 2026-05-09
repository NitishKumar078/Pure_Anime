import React, { useState, useEffect } from "react";
import "./AnimeList.css";
import { getItem, setItem } from "../utils/LocalStorage";

const defaultAnimes = [
  { link: "https://hianime.re/", name: "hianime" },
  { link: "https://zorotv.com.in/", name: "zorotv" },
  { link: "https://aniwatch.re/", name: "aniwatchtv" },
];

const AnimeList = () => {
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
    } else {
      setItem("animes", defaultAnimes);
    }
  }, []);

  const saveAnimes = (newAnimes: typeof animes) => {
    setAnimes(newAnimes);
    setItem("animes", newAnimes);
  };

  const addCurrentPage = async () => {
    try {
      const tabs = await chrome.tabs.query({
        active: true,
        currentWindow: true,
      });
      if (tabs.length > 0 && tabs[0].url) {
        const url = tabs[0].url;
        let hostname = new URL(url).hostname;
        hostname = hostname.replace(/^www\./, "");
        setNewName(hostname);
        setNewLink(url);
      }
    } catch (error) {
      console.error("Error fetching current tab", error);
    }
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
      newAnimes[editingIndex] = {
        name: editName.trim(),
        link: editLink.trim(),
      };
      saveAnimes(newAnimes);
      setEditingIndex(-1);
    }
  };

  const cancelEdit = () => {
    setEditingIndex(-1);
  };

  return (
    <>
      <div className="AnimeList content show">
        <ul id="option_list">
          {animes.map((anime, index) => (
            <li key={index} className="anime-item">
              {editingIndex === index ? (
                <div className="edit-form">
                  <input
                    type="text"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    placeholder="Anime Name"
                    className="edit-input"
                  />
                  <input
                    type="url"
                    value={editLink}
                    onChange={(e) => setEditLink(e.target.value)}
                    placeholder="URL / Link"
                    className="edit-input"
                  />
                  <div
                    style={{ display: "flex", gap: "8px", marginTop: "4px" }}
                  >
                    <button
                      onClick={saveEdit}
                      className="save-btn"
                      style={{ flex: 1 }}
                    >
                      Save
                    </button>
                    <button
                      onClick={cancelEdit}
                      className="cancel-btn"
                      style={{ flex: 1 }}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <a
                    href={anime.link}
                    target="_blank"
                    rel="noreferrer"
                    className="anime-link"
                    title={anime.link}
                  >
                    {anime.name}
                  </a>
                  <div className="item-actions">
                    <button
                      onClick={() => startEdit(index)}
                      className="edit-btn"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteAnime(index)}
                      className="delete-btn"
                    >
                      Delete
                    </button>
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
            placeholder="Full URL link"
            className="add-input"
          />
          <div className="add-controls">
            <button
              onClick={addCurrentPage}
              className="current-page-btn"
              title="Add current active tab as favorite"
            >
              Use Current Tab
            </button>
            <button onClick={addAnime} className="add-btn">
              Add
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AnimeList;
