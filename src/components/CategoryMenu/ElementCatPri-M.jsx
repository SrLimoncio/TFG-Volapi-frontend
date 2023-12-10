import React, { useState, useEffect } from "react";

import { getSubCatsMenu } from "../../services/MenuService";
import ElementCatSecundary from "./ElementCatSec-M";

import "./elementcatpri-m.css";

const ElementCatPrimary = (props) => {
  const [subCategories, setSubCategories] = useState([]);

  useEffect(() => {
    setSubCategories(props.subcategories);
  }, [props.id]);

  return (
    <div className="row row-cat-menu margin-top-1">
      <div className="col-xl-5 col-lg-5">
        <div className="section-cat">
          <div className="title-fl title-cat">{props.title}</div>
          <p className="descrip-cat">{props.description}</p>
        </div>
      </div>

      <div className="col-xl-7 col-lg-7">
        <div className="section-command">
          <div>
            {subCategories
              ? subCategories.map((subCategory) => (
                  <ElementCatSecundary
                    key={subCategory.id}
                    id={subCategory.id}
                    title={subCategory.title}
                    description={subCategory.description}
                    command_id={subCategory.command_id}
                    state={subCategory.state}
                  />
                ))
              : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ElementCatPrimary;
