import UUID from "uuid/v4";
import Konva from "konva";
import { SketchPicker } from "react-color";
import React, { useState, useEffect } from "react";

import "./App.css";
import MyEditor from "./components/ImageEditor/ImageEditor";
import FilterComponent from "./components/ImageEditor/FilterComponent";
import { getImageSize, isEmpty } from "./components/ImageEditor/ImageUtils";

// we can add more options availabe in konva js
const formatName = str => str.replace(/\s+/g, "-").toLowerCase();
function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

function App() {
  // used for images
  const [canvasObjects, setcanvasObject] = useState([]);
  const [canvasBgColor, setCanvasBgColor] = useState("#ddd");
  const [textObjects, setTextObjects] = useState([]);

  const [selectedShapeName, setSelectedShapeName] = useState("");
  const [selectedObject, setSelectedObject] = useState({});

  useEffect(() => {
    if (!isEmpty(selectedShapeName)) {
      const imgFound = canvasObjects.find(
        obj => String(obj.name) === String(selectedShapeName)
      );
      const textFound = textObjects.find(
        obj => String(obj.name) === String(selectedShapeName)
      );
      if (imgFound) {
        setSelectedObject(imgFound);
      }
      if (textFound) {
        setSelectedObject(textFound);
      }
    }
  }, [selectedShapeName, canvasObjects, textObjects]);

  let textAreaRef = React.createRef();

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
      filters: [],
      base64url: await getBase64(imgFile),
      imgUrl: URL.createObjectURL(imgFile),
      imageSize: await getImageSize(imgFile),
      x: Math.random() * 500, // we need to find blank spaces
      y: Math.random() * 500
    };

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
   * @param {*} name of filter like Blur
   */
  const handleFilterValueChange = (value, prop, name) => {
    // find the selected object in the object arrays
    if (!isEmpty(selectedShapeName)) {
      const imgFound = canvasObjects.find(
        obj => String(obj.name) === String(selectedShapeName)
      );
      const textFound = textObjects.find(
        obj => String(obj.name) === String(selectedShapeName)
      );
      if (imgFound) {
        const items = canvasObjects.slice();
        const imgIndex = items.indexOf(imgFound);
        const filterFound = imgFound.filters.find(
          ff => String(ff) === String(Konva.Filters[name])
        );
        items[imgIndex] = {
          ...imgFound,
          filters: filterFound
            ? imgFound.filters
            : [...imgFound.filters, Konva.Filters[name]],
          [prop]: value
        };
        setcanvasObject(items);
        return;
      }
      if (textFound) {
        const items = textObjects.slice();
        const textIndex = items.indexOf(textFound);
        const filterFound = textFound.filters.find(
          ff => String(ff) === String(Konva.Filters[name])
        );
        items[textIndex] = {
          ...textFound,
          filters: filterFound
            ? textFound.filters
            : [...textFound.filters, Konva.Filters[name]],
          [prop]: value
        };
        setTextObjects(items);
        return;
      }
    }
    return null;

    // add filters to that objects
    // const newFilterProperties = { ...filterProperties, [prop]: value };
    // setFilterProperties(newFilterProperties);
  };

  const handleChangeComplete = color => {
    setCanvasBgColor(color.hex);
  };

  const addTextToCanvas = e => {
    const name = UUID();
    const newTextObject = {
      filters: [],
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
          canvasWidth={700}
          canvasHeight={700}
          bgColor={canvasBgColor}
          canvasObjects={canvasObjects}
          textObjects={textObjects}
          onItemDragEnd={handleItemDragEnd}
          onItemDragStart={handleItemDragStart}
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
        onValueChange={handleFilterValueChange}
        selectedObject={selectedObject}
      />

      <input type="file" onChange={fileChangedHandler} />
    </div>
  );
}

export default App;
