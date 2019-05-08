import React, { useEffect, useState } from "react";
// import useImage from "use-image";
import { pure } from "recompose";
import { Image } from "react-konva";

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

  const [image, setImage] = useState(new window.Image());

  useEffect(() => {
    image.src = file.base64url;
    image.onload = () => {
      imgRef && imgRef.cache();
      imgRef && imgRef.getLayer().batchDraw();
    };
  }, [file.base64url, image, imgRef]);

  return (
    <Image
      filters={filters}
      {...properties}
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
      ref={node => {
        imgRef = node;
      }}
    />
  );
};

export default pure(ImageComponent);
