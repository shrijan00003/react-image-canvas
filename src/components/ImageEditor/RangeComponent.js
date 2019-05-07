import React from "react";
const RangeComponent = ({
  id,
  min = 0,
  max = 40,
  step = 0.1,
  value = 20,
  classList = "",
  onChangeHandler = f => f
}) => (
  <input
    id={id}
    type="range"
    min={min}
    max={max}
    step={step}
    value={value}
    className={classList}
    onChange={onChangeHandler}
  />
);

export default RangeComponent;
