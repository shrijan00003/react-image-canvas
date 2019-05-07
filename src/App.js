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
      imgUrl: URL.createObjectURL(imgFile)
    };
    const newCanvasObject = [...canvasObjects, imgObj];
    setcanvasObject(newCanvasObject);
  };
  const uploadHandler = () => {
    console.log("image will be uploaded here");
  };

  return (
    <div className="App">
      <header style={{ background: "red" }}>Header</header>
      <MyEditor
        canvasWidth={700}
        canvasHeight={700}
        canvasObjects={canvasObjects}
      />
      <input type="file" onChange={fileChangedHandler} />
      <button onClick={uploadHandler}>Next</button>
      <br />
    </div>
  );
}

export default App;
