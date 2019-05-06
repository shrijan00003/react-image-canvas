import React, { useState, useEffect } from "react";
import { Stage, Layer, Image } from "react-konva";
import useImage from "use-image";
import TransformerComponent from "./Transformer";

const ImageComponent = ({ file }) => {
  const [image] = useImage(file.imgUrl);
  return <Image image={image} name={file.name} draggable />;
};

const ImageEditor = props => {
  const [availableOptions, setAvailableOptions] = useState({
    image: false,
    shapes: false,
    filter: false
  });

  let stageNode = React.createRef();

  const [selectedShapeName, setSelectedShapeName] = useState("");

  const handleStageMouseDown = e => {
    // clicked on stage - cler selection
    if (e.target === e.target.getStage()) {
      setSelectedShapeName("");
      return;
    }
    // clicked on transformer - do nothing
    const clickedOnTransformer =
      e.target.getParent().className === "Transformer";
    if (clickedOnTransformer) {
      return;
    }

    // find clicked rect by its name
    const name = e.target.name();

    // const rect = this.state.rectangles.find(r => r.name === name);
    // if (rect) {
    //   this.setState({
    //     selectedShapeName: name
    //   });
    // } else {
    //   this.setState({
    //     selectedShapeName: ''
    //   });
    // }
    setSelectedShapeName(name);
  };

  useEffect(() => {
    const newOptions = { ...availableOptions, shapes: false };
    setAvailableOptions(newOptions);
  }, [availableOptions]);

  const onSaveImage = e => {
    console.log("event here", e);
    console.log("stage node here", stageNode.getStage().toDataURL());
  };

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
          onMouseDown={handleStageMouseDown}
          ref={node => {
            stageNode = node;
          }}
        >
          <Layer>
            {props.canvasObjects &&
              props.canvasObjects.map((obj, index) => (
                <ImageComponent key={index} file={obj} />
              ))}
            <TransformerComponent selectedShapeName={selectedShapeName} />
          </Layer>
        </Stage>
        <br />
        <button onClick={onSaveImage}>save image</button>
      </div>
    </>
  );
};

export default ImageEditor;
