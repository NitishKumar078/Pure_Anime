import Button from "./ui/Button/Button";
import "./App.css";
import AnimeList from "./AnimeList/AnimeList";


const App = () => {
  return (
    <div className="App">
      <div className="header">
        <h1>Pure Anime</h1>
        <p>No distractions. Just anime.</p>
      </div>
      <Button />
      <AnimeList />

    </div>
  );
};

export default App;
