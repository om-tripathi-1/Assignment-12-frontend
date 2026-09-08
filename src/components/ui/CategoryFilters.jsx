import React from "react";
import { Link, useParams } from "react-router-dom";

const FilterSection = ({ title, children }) => (
  <section className="category-page__filter-section">
    <h2 className="category-page__filter-title">{title}</h2>
    {children}
  </section>
);

const CategoryFilters = ({
  categories = [],
  filters,
  isOpen = false,
  onChange,
  onApply,
  onClose,
}) => {
  const { categoryName } = useParams();

  return (
    <aside className={`category-page__filters${isOpen ? " is-open" : ""}`} aria-label="Catalog filters">
      <div className="category-page__filters-header">
        <h2>Filters</h2>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close filters drawer"
        >
          ×
        </button>
      </div>

      {/* Categories List */}
      <FilterSection title="Categories">
        <div className="category-page__category-list">
          <Link
            to="/category"
            className={`category-page__category-link ${!categoryName ? "active" : ""}`}
            onClick={onClose}
          >
            All Categories
            <span aria-hidden="true">›</span>
          </Link>
          {categories.map((category) => {
            const isSelected =
              categoryName?.toLowerCase() === category.name?.toLowerCase();
            return (
              <Link
                key={category._id}
                to={`/category/${category.name}`}
                className={`category-page__category-link ${isSelected ? "active" : ""}`}
                onClick={onClose}
              >
                {category.name}
                <span aria-hidden="true">›</span>
              </Link>
            );
          })}
        </div>
      </FilterSection>

      {/* Price Range Filter */}
      <FilterSection title="Price">
        <div className="category-page__price-fields">
          <label>
            <span>From</span>
            <input
              name="minPrice"
              type="number"
              min="0"
              value={filters.minPrice}
              onChange={onChange}
              placeholder="$0"
            />
          </label>
          <label>
            <span>To</span>
            <input
              name="maxPrice"
              type="number"
              min="0"
              value={filters.maxPrice}
              onChange={onChange}
              placeholder="$500"
            />
          </label>
        </div>
      </FilterSection>

      {/* Apply Action */}
      <button className="category-page__apply" type="button" onClick={onApply}>
        Apply Filters
      </button>
    </aside>
  );
};

export default CategoryFilters;

