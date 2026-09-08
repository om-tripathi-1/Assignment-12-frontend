import React from "react";
import { Link } from "react-router-dom";

const dressStyles = [
  { className: "container-1", name: "Casual", path: "/category/Casual" },
  { className: "container-2", name: "Formal", path: "/category/Formal" },
  { className: "container-3", name: "Party", path: "/category/Party" },
  { className: "container-4", name: "Gym", path: "/category/Gym" },
];

const CategorySection = () => {
  return (
    <section className="category" aria-labelledby="browse-styles-heading">
      <div className="category__container">
        <h2 id="browse-styles-heading" className="category__heading">
          BROWSE BY DRESS STYLE
        </h2>
        <div className="category__image-container">
          {dressStyles.map((style) => (
            <Link
              key={style.name}
              className={style.className}
              to={style.path}
              aria-label={`Shop ${style.name} styles`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategorySection;
