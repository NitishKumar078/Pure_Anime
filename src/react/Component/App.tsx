import Button from "./ui/Button/Button";
import Mode from "./ui/mode/mode";
import "./App.css";
import Freatures from "./Features/Freatures";
import AnimeList from "./AnimeList/AnimeList";

const App = () => {
  return (
    <div className="App">
      <h1>Pure Anime</h1>
      <Button />
      <div id="mode">
        <label>
          <span>Strict Mode :</span>
        </label>
        <Mode />
      </div>
      <AnimeList />
      <Freatures />
    </div>
  );
};

export default App;
