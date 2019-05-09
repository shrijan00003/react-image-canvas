import { Stage, Layer } from "react-konva";
import React from "react";

import ImageComponent from "./ImageComponent";
import TextComponent from "./TextComponent";
import TransformerComponent from "./Transformer";
import BackgroundComponent from "./BackgroundComponent";
import { isEmpty } from "./ImageUtils";

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
    if (!isEmpty(props.selectedShapeName)) {
      props.setSelectedShapeName("");
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
    const text = props.textObjects.find(
      obj => String(obj.name) === String(name)
    );
    if (obj || text) {
      props.setSelectedShapeName(name);
    } else {
      props.setSelectedShapeName("");
    }
  };

  const onSaveImage = e => {
    console.log("stage node here", stageNode.getStage().toDataURL());
  };

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
      </div>
      <div>
        <button onClick={handleDeletingNode}>Delete</button>
      </div>
      <div>
        <button onClick={onSaveImage}>save image</button>
      </div>
    </div>
  );
};

export default ImageEditor;
