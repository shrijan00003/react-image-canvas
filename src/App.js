import React, { useState } from "react";
import UUID from "uuid/v4";

import "./App.css";
import MyEditor from "./components/ImageEditor/ImageEditor";

function App() {
  const [canvasObjects, setcanvasObject] = useState([]);

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
   * @param {*} id
   */
  const handleItemDragStart = e => {
    console.log("on drag start", e.target.x(), e.target.y());
    const name = e.target.name();
    const items = canvasObjects.slice();
    const item = items.find(i => String(i.name) === String(name));
    const index = items.indexOf(item);
    // remove from the list:
    items.splice(index, 1);
    // add to the top
    items.push(item);

    console.log("items on drag start", items);

    console.log("item being dragged", name);

    setcanvasObject(items);
  };

  const handleItemDragEnd = async e => {
    console.log("on drag end", e.target.x(), e.target.y());
    const name = e.target.name();
    const items = canvasObjects.slice();
    const item = items.find(i => String(i.name) === String(name));
    const index = items.indexOf(item);

    console.log("index here", index);
    // update item position
    items[index] = {
      ...item,
      x: await e.target.x(),
      y: await e.target.y()
    };

    console.log("items on drag end", items);
    setcanvasObject(items);
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
      <input type="file" onChange={fileChangedHandler} />
      <button onClick={uploadHandler}>Next</button>
      <br />
    </div>
  );
}

export default App;
