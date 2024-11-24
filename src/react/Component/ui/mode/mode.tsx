import "../ui.css";

const Mode = () => {
  return (
    <div>
      <label className="switch">
        <input type="checkbox" className="toggle" />
        <span className="slider"></span>
        <span className="card-side"></span>
      </label>
    </div>
  );
};

export default Mode;
