import React from "react";
import RangeComponent from "./RangeComponent";
const FilterComponent = () => {
  return (
    <>
      <div>Add filters</div>
      <div className="filter-blur-wrapper">
        Blur
        <span>
          <RangeComponent />
        </span>
      </div>
      <div className="filter-rgb-wrapper">
        <div className="filter-rgb-red-wrapper">
          Red
          <span>
            <RangeComponent />
          </span>
        </div>
        <div className="filter-rgb-green-wrapper">
          Green
          <span>
            <RangeComponent />
          </span>
        </div>
        <div className="filter-rgb-blue-wrapper">
          Blue
          <span>
            <RangeComponent />
          </span>
        </div>
      </div>
      <div className="filter-brighten-wrapper">
        Brighten:
        <span>
          <RangeComponent />
        </span>
      </div>
    </>
  );
};

export default FilterComponent;
