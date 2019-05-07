import React from "react";
import useImage from "use-image";
import { pure } from "recompose";
import { Image } from "react-konva";

const ImageComponent = ({ file, onDragStart, onDragEnd }) => {
  console.log("laoded");
  const [image] = useImage(file.imgUrl);
  return (
    <Image
      x={file.x}
      y={file.y}
      image={image}
      name={file.name}
      id={file.id}
      draggable
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      width={200}
      height={200}
    />
  );
};

export default pure(ImageComponent);
