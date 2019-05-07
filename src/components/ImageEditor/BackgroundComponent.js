import React from "react";
import { Rect } from "react-konva";
const BackgroundComponent = ({
  width = 500,
  height = 500,
  color = "#fff",
  shadowBlur = 10
}) => (
  <Rect
    x={0}
    y={0}
    width={width}
    height={height}
    fill={color}
    shadowBlur={shadowBlur}
  />
);

export default BackgroundComponent;
