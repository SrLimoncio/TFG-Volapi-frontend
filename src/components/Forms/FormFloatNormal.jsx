import React, { useState } from "react";

import "./formfloat.css";

const FormFloatWithCheck = (props) => {
  const [input, setInput] = useState("");

  const handleUpdateInput = (value) => {
    setInput(value);
    // Actualiza el valor en el componente padre.
    props.updateInput(value);
  };

  return (
    <div className="form-floating form-hero">
      <input
        type={props.type}
        className="form-control"
        id={props.id}
        placeholder={props.placeholder}
        value={input}
        onChange={(e) => {
          handleUpdateInput(e.target.value);
        }}
      />
      <label htmlFor={props.id}>{props.textLabel}</label>
    </div>
  );
};

export default FormFloatWithCheck;
