import React, { useState } from "react";
import UUID from "uuid/v4";

import "./App.css";
import MyEditor from "./components/ImageEditor/ImageEditor";
import FilterComponent from "./components/ImageEditor/FilterComponent";

function App() {
  const [canvasObjects, setcanvasObject] = useState([]);

  /**
   * @description uploading image from the computer
   * @param {*} e
   */
  const fileChangedHandler = e => {
    const imgFile = e.target.files[0];
    const imgId = UUID();
    const imgObj = {
      name: `${imgFile.name}_${imgId}`,
      id: imgId,
      file: imgFile,
      type: imgFile.type,
      imgUrl: URL.createObjectURL(imgFile),
      x: Math.random() * 500,
      y: Math.random() * 500
    };
    const newCanvasObject = [...canvasObjects, imgObj];
    setcanvasObject(newCanvasObject);
  };
  const uploadHandler = () => {
    console.log("image will be uploaded here");
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

  const addFilter = () => {
    console.log("fileter will be added");
  };

  return (
    <div className="App">
      <header style={{ background: "red" }}>Header</header>
      <MyEditor
        canvasWidth={700}
        canvasHeight={700}
        canvasObjects={canvasObjects}
        onItemDragStart={handleItemDragStart}
        onItemDragEnd={handleItemDragEnd}
      />

      <FilterComponent />
      <input type="file" onChange={fileChangedHandler} />
    </div>
  );
}

export default App;
