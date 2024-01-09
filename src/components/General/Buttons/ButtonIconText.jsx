import React from "react";

import "./buttonicontext.css";

const ButtonIconText = ({
  classType,
  svgIcon,
  text,
  eventOnClick,
  isDisabled = false,
}) => {
  return (
    <button
      type="button"
      className={`btn ${classType}`}
      onClick={eventOnClick}
      disabled={isDisabled}
    >
      <div className="line-item-icon-text">
        <div className="icon-item">{svgIcon}</div>
        <div className="title-item">{text}</div>
      </div>
    </button>
  );
};

export default ButtonIconText;
