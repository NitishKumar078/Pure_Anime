import Button from "./ui/Button/Button";
import Mode from "./ui/mode/mode";
import "./App.css";
import AnimeList from "./AnimeList/AnimeList";

const App = () => {
  return (
    <div className="App">
      <h1>Pure Anime</h1>
      <Button />
      <AnimeList />
    </div>
  );
};

export default App;
