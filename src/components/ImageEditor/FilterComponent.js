import React from "react";
const FilterComponent = ({ onValueChange = f => f, selectedObject = {} }) => {
  const handleChange = (e, type) => {
    const name = e.target.name;
    onValueChange(Number(e.target.value), type, name);
  };
  return (
    <>
      <div>Add filters</div>
      <div className="filter-blur-wrapper">
        Blur
        <span>
          <input
            type="range"
            min={0}
            max={40}
            step={0.05}
            value={selectedObject.blurRadius || 0}
            name="Blur"
            onChange={e => handleChange(e, "blurRadius")}
          />
        </span>
      </div>
      <div className="filter-rgb-wrapper">
        <div className="filter-rgb-red-wrapper">
          Red
          <span>
            <input
              type="range"
              min={0}
              max={256}
              step={1}
              name="RGB"
              value={selectedObject.red || 150}
              onChange={e => handleChange(e, "red")}
            />
          </span>
        </div>
        <div className="filter-rgb-green-wrapper">
          Green
          <span>
            <input
              type="range"
              min={0}
              max={256}
              step={1}
              name="RGB"
              value={selectedObject.green || 150}
              onChange={e => handleChange(e, "green")}
            />
          </span>
        </div>
        <div className="filter-rgb-blue-wrapper">
          Blue
          <span>
            <input
              type="range"
              min={0}
              max={256}
              step={1}
              name="RGB"
              value={selectedObject.blue || 150}
              onChange={e => handleChange(e, "blue")}
            />
          </span>
        </div>
      </div>
      <div className="filter-brighten-wrapper">
        Brightess:
        <span>
          <input
            type="range"
            min={-1}
            max={1}
            step={0.05}
            name="Brighten"
            value={selectedObject.brightness || 0}
            onChange={e => handleChange(e, "brightness")}
          />
        </span>
      </div>
    </>
  );
};

export default FilterComponent;
