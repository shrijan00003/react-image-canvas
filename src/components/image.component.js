import React, { useEffect, useState } from "react";
// import useImage from "use-image";
import { pure } from "recompose";
import { Image } from "react-konva";
import { getResolution } from "../utils/image.utils";

const ImageComponent = ({
  file,
  onDragStart,
  onDragEnd,
  filters = [],
  properties = {}
}) => {
  let imgRef = React.createRef();

  // for getting image from url
  // const [image] = useImage(file.imgUrl);

  const [image] = useState(new window.Image());

  useEffect(() => {
    image.src = file.base64url;
    image.onload = () => {
      imgRef && imgRef.cache();
      imgRef && imgRef.getLayer().batchDraw();
    };
  }, [file.base64url, image, imgRef]);

  const windowSize = {
    width: window.innerWidth,
    height: window.innerHeight
  };
  const canvasSize = {
    width: 700,
    height: 700
  };

  const width = getResolution(file.imageSize, windowSize, canvasSize).width;
  const height = getResolution(file.imageSize, windowSize, canvasSize).height;

  return (
    <Image
      {...file}
      image={image}
      draggable
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      width={width || 200}
      height={height || 200}
      ref={node => {
        imgRef = node;
      }}
    />
  );
};

export default pure(ImageComponent);
