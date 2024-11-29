import Button from "./ui/Button/Button";
import Mode from "./ui/mode/mode";
import "./App.css";
import Freatures from "./Features/Freatures";

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
      <Freatures />
    </div>
  );
};

export default App;
