import { Stage, Layer, Rect } from "react-konva";
import React, { useState, useEffect } from "react";

import ImageComponent from "./ImageComponent";
import TransformerComponent from "./Transformer";
import BackgroundComponent from "./BackgroundComponent";

const ImageEditor = props => {
  let stageNode = React.createRef();

  useEffect(() => {
    console.log(stageNode);
    const parent = stageNode.getParent();
    console.log("parent", parent);
  }, [stageNode]);

  const [selectedShapeName, setSelectedShapeName] = useState("");

  const handleStageMouseDown = e => {
    if (e.target === e.target.getStage()) {
      setSelectedShapeName("");
      return;
    }
    const clickedOnTransformer =
      e.target.getParent().className === "Transformer";
    if (clickedOnTransformer) {
      return;
    }

    const name = e.target.name();

    const obj = props.canvasObjects.find(
      obj => String(obj.name) === String(name)
    );
    if (obj) {
      setSelectedShapeName(name);
    } else {
      setSelectedShapeName("");
    }
  };

  // const onSaveImage = e => {
  //   console.log("event here", e);
  //   console.log("stage node here", stageNode.getStage().toDataURL());
  // };

  return (
    <>
      <p> Hello from editor !!</p>
      <p> you can upload multiple images at once as well!!</p>
      <div
        style={{
          width: props.canvasWidth,
          height: props.canvasHeight,
          background: "#eee",
          margin: "0 auto"
        }}
      >
        <Stage
          width={props.canvasWidth}
          height={props.canvasHeight}
          onClick={handleStageMouseDown}
          ref={node => {
            stageNode = node;
          }}
        >
          <Layer>
            <BackgroundComponent
              width={props.canvasWidth}
              height={props.canvasHeight}
              color="#ddd"
              shadowBlur={10}
            />
            {props.canvasObjects &&
              props.canvasObjects.map(obj => (
                <ImageComponent
                  key={obj.id}
                  file={obj}
                  onDragStart={props.onItemDragStart}
                  onDragEnd={props.onItemDragEnd}
                />
              ))}
            <TransformerComponent selectedShapeName={selectedShapeName} />
          </Layer>
        </Stage>
        <br />
        {/* <button onClick={onSaveImage}>save image</button> */}
      </div>
    </>
  );
};

export default ImageEditor;
