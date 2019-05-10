import React, { useState } from "react";
export const SelectFont = ({ arr }) => {
  const [value, setValue] = useState("");
  const handleChange = e => {
    console.log("value here", e.target.value);
    setValue(e.target.value);
  };
  return (
    <div className="form-group">
      <label>Select Font</label>
      <select onChange={handleChange} value={value} disabled>
        {arr &&
          arr.map((f, idx) => {
            return (
              f &&
              f.map((font, index) => {
                return (
                  <option key={index} value={font.family}>
                    {font.name}
                  </option>
                );
              })
            );
          })}
      </select>
    </div>
  );
};
