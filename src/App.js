import UUID from "uuid/v4";
import Konva from "konva";
import { SketchPicker } from "react-color";
import React, { useState, useEffect } from "react";

import "./App.css";
import MyEditor from "./components/ImageEditor/ImageEditor";
import FilterComponent from "./components/ImageEditor/FilterComponent";
import { getImageSize } from "./components/ImageEditor/ImageUtils";

// we can add more options availabe in konva js
const filterOptions = ["Blur", "Brighten", "Contrast", "RGB", "Noise"];
const formatName = str => str.replace(/\s+/g, "-").toLowerCase();
function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

const initialFilterProperties = {
  blurRadius: 0,
  shadowBlur: 10,
  brightness: 0,
  noise: 0,
  red: 150,
  blue: 150,
  green: 150,
  contrast: 0
};

function App() {
  // used for images
  const [canvasObjects, setcanvasObject] = useState([]);
  const [canvasBgColor, setCanvasBgColor] = useState("#ddd");
  const [textObjects, setTextObjects] = useState([]);

  const [selectedShapeName, setSelectedShapeName] = useState("");

  const [filters, setFilters] = useState([]);
  const [filterProperties, setFilterProperties] = useState(
    initialFilterProperties
  );

  let textAreaRef = React.createRef();

  useEffect(() => {
    const newFilters = [];
    for (let i = 0; i < filterOptions.length; i++) {
      newFilters.push(Konva.Filters[filterOptions[i]]);
    }
    setFilters(newFilters);
  }, []);

  /**
   * @description uploading image from the computer
   * @param {*} e
   */
  const fileChangedHandler = async e => {
    const imgFile = e.target.files[0];
    const imgId = UUID();
    const fileName = formatName(imgFile.name);
    const imgObj = {
      name: imgId,
      fileName,
      file: imgFile,
      type: imgFile.type,
      base64url: await getBase64(imgFile),
      imgUrl: URL.createObjectURL(imgFile),
      imageSize: await getImageSize(imgFile),
      x: Math.random() * 500, // we need to find blank spaces
      y: Math.random() * 500
    };

    console.log("image object", imgObj);
    const newCanvasObject = [...canvasObjects, imgObj];
    setcanvasObject(newCanvasObject);
  };

  /**
   * @description it will remove the selected object from the array and push it in the last
   * @param {*} e
   */
  const handleItemDragStart = e => {
    const name = e.target.name();
    const items = canvasObjects.slice();
    const item = items.find(i => String(i.name) === String(name));
    const index = items.indexOf(item);
    // remove from the list:
    items.splice(index, 1);
    // add to the top
    items.push(item);

    setcanvasObject(items);
  };

  /**
   * @description handle item drag end
   * @param {*} e
   */
  const handleItemDragEnd = e => {
    const name = e.target.name();
    const items = canvasObjects.slice();
    const item = items.find(i => String(i.name) === String(name));
    const index = items.indexOf(item);

    // update item position
    items[index] = {
      ...item,
      x: e.target.x(),
      y: e.target.y()
    };

    setcanvasObject(items);
  };

  /**
   *
   * @param {*} value value from range
   * @param {*} prop property of filter
   * @param {*} name of filter
   */
  const handleValueChange = (value, prop, name) => {
    // find the selected object in the object arrays
    // add filters to that objects
    const newFilterProperties = { ...filterProperties, [prop]: value };
    setFilterProperties(newFilterProperties);
  };

  const handleChangeComplete = color => {
    setCanvasBgColor(color.hex);
  };

  const handleImageOnBlur = e => {
    console.log("image on blur", e);
  };

  const addTextToCanvas = e => {
    console.log("event here", e);
    console.log("text area node", textAreaRef.value);
    const name = UUID();
    const newTextObject = {
      name,
      text: textAreaRef.value,
      fill: "#000"
    };
    const newTextObjects = [...textObjects, newTextObject];
    setTextObjects(newTextObjects);
    textAreaRef.value = "";
  };

  const deleteNode = name => {
    //find in canvasobjects if found delete that
    const imgFound = canvasObjects.find(
      obj => String(obj.name) === String(name)
    );
    if (imgFound) {
      const newImages = canvasObjects.filter(
        obj => String(obj.name) !== String(name)
      );
      setcanvasObject(newImages);
      return;
    }
    // else find in text objects and if found delete that as well
    const textFound = textObjects.find(
      obj => String(obj.name) === String(name)
    );

    if (textFound) {
      const newTextObjects = textObjects.filter(
        obj => String(obj.name) !== String(name)
      );
      setTextObjects(newTextObjects);
      return;
    }
  };

  return (
    <div className="App">
      <header style={{ background: "red" }}>Header</header>
      <div>
        <MyEditor
          filters={filters}
          canvasWidth={700}
          canvasHeight={700}
          bgColor={canvasBgColor}
          canvasObjects={canvasObjects}
          textObjects={textObjects}
          onItemDragEnd={handleItemDragEnd}
          filterProperties={filterProperties}
          onItemDragStart={handleItemDragStart}
          handleImageOnBlur={handleImageOnBlur}
          onDeleteNode={deleteNode}
          selectedShapeName={selectedShapeName}
          setSelectedShapeName={setSelectedShapeName}
        />
      </div>

      <div
        className="editor-text-input-wrapper"
        style={{
          display: "block",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <textarea rows="5" cols="30" ref={node => (textAreaRef = node)} />
        <button onClick={addTextToCanvas}>Add Text to Canvas</button>
      </div>

      <div className="editor-color-picker-wrapper">
        Please choose background color
        <span
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <SketchPicker
            color={canvasBgColor}
            onChangeComplete={handleChangeComplete}
          />
        </span>
      </div>
      <FilterComponent
        onValueChange={handleValueChange}
        filterProperties={filterProperties}
      />

      <input type="file" onChange={fileChangedHandler} />
    </div>
  );
}

export default App;
