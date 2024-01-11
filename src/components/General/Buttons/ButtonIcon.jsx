import React from "react";

import "./buttonicontext.css";

const ButtonIcon = ({
  classType,
  svgIcon,
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
      </div>
    </button>
  );
};

export default ButtonIcon;
