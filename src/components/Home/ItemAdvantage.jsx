import React from "react";

import "./itemadvantage.css";

const ItemAdvantage = ({ svgIcon, title, text }) => {

  return (
    <div className="col-12 col-md-6 home-item-advantage">
      <div className="home-icon-advantage">{svgIcon}</div>
      <div className="home-body-advantage">
        <div className="home-title-advantage">{title}</div>
        <div className="home-text-advantage">{text}</div>
      </div>
    </div>
  );
};

export default ItemAdvantage;
