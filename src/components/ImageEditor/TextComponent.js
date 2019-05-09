import React from "react";
import { pure } from "recompose";
import { Text } from "react-konva";

const TextComponent = ({ props }) => {
  return <Text {...props} draggable />;
};

export default pure(TextComponent);
