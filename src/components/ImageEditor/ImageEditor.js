import { Stage, Layer } from "react-konva";
import React, { useState } from "react";

import ImageComponent from "./ImageComponent";
import TextComponent from "./TextComponent";
import TransformerComponent from "./Transformer";
import BackgroundComponent from "./BackgroundComponent";

const ImageEditor = props => {
  let stageNode = React.createRef();

  /**
   * @param {*} e
   */
  const handleStageMouseDown = e => {
    if (e.target === e.target.getStage()) {
      props.setSelectedShapeName("");
      return;
    }
    const clickedOnTransformer =
      e.target.getParent().className === "Transformer";
    if (clickedOnTransformer) {
      return;
    }

    const name = e.target.name();
    console.log("name here", name);

    const obj = props.canvasObjects.find(
      obj => String(obj.name) === String(name)
    );
    const text = props.textObjects.find(
      obj => String(obj.name) === String(name)
    );
    if (obj || text) {
      props.setSelectedShapeName(name);
    } else {
      props.setSelectedShapeName("");
    }
  };

  // const onSaveImage = e => {
  //   console.log("event here", e);
  //   console.log("stage node here", stageNode.getStage().toDataURL());
  // };

  const handleDeletingNode = () => {
    //simply check if empty we need to add other condition as well
    if (props.selectedShapeName !== "") {
      props.onDeleteNode(props.selectedShapeName);
    }
  };

  return (
    <div>
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
              color={props.bgColor}
              shadowBlur={10}
            />
            {props.canvasObjects &&
              props.canvasObjects.map(obj => (
                <ImageComponent
                  key={obj.name}
                  file={obj}
                  filters={
                    obj.name === props.selectedShapeName
                      ? props.filters
                      : undefined
                  }
                  properties={
                    obj.name === props.selectedShapeName
                      ? props.filterProperties
                      : undefined
                  }
                  onBlur={props.handleImageOnBlur}
                  onDragStart={props.onItemDragStart}
                  onDragEnd={props.onItemDragEnd}
                />
              ))}

            {props.textObjects &&
              props.textObjects.map(obj => (
                <TextComponent key={obj.name} props={obj} />
              ))}
            <TransformerComponent selectedShapeName={props.selectedShapeName} />
          </Layer>
        </Stage>
        <br />
        {/* <button onClick={onSaveImage}>save image</button> */}
      </div>
      <div>
        <button onClick={handleDeletingNode}>Delete</button>
      </div>
    </div>
  );
};

export default ImageEditor;
