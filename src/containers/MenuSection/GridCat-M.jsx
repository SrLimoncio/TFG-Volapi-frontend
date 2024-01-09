import React, { useState, useEffect } from "react";

import { getCatsMenu } from "../../services/MenuService";
import ElementCatPrimary from "../../components/CategoryMenu/ElementCatPri-M";

const GridCat = (props) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await getCatsMenu();

        setCategories(response.data.categories);

      } catch (error) {
        console.error("Error fetching menu", error);
      }
    };

    fetchCategories();
  }, [props]);

  return (
    <div>
      {categories.map((category) => (
        <ElementCatPrimary
          key={category.id}
          id={category.id}
          title={category.title}
          description={category.description}
          commands={category.commands || []}
        />
      ))}
    </div>
  );
};

export default GridCat;
