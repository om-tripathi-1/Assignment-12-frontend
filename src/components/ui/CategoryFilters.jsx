import { Link, useParams } from "react-router-dom";

const MAX_PRICE = 7000;
const PRICE_STEP = 100;

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
  const minPrice = filters.minPrice === "" ? 0 : Number(filters.minPrice);
  const maxPrice = filters.maxPrice === "" ? MAX_PRICE : Number(filters.maxPrice);

  return (
    <aside className={`category-page__filters${isOpen ? " is-open" : ""}`} aria-label="Catalog filters">
      <div className="category-page__filters-header">
        <h2 className="category-page__filters-title">Filters</h2>
        <button
          className="category-page__filters-close"
          type="button"
          onClick={onClose}
          aria-label="Close filters drawer"
        >
          ×
        </button>
      </div>

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

      <FilterSection title="Price">
        <div
          className={`category-page__price-slider category-page__price-slider--min-${minPrice} category-page__price-slider--max-${maxPrice}`}
        >
          <div className="category-page__price-track" aria-hidden="true">
            <span className="category-page__price-track-fill" />
          </div>
          <label className="category-page__price-range-label">
            <input
              className="category-page__price-range category-page__price-range--min"
              name="minPrice"
              type="range"
              min="0"
              max={MAX_PRICE}
              step={PRICE_STEP}
              value={minPrice}
              onChange={(event) => {
                const value = Number(event.target.value);
                if (value <= maxPrice) onChange(event);
              }}
              aria-label="Minimum price"
            />
          </label>
          <label className="category-page__price-range-label">
            <input
              className="category-page__price-range category-page__price-range--max"
              name="maxPrice"
              type="range"
              min="0"
              max={MAX_PRICE}
              step={PRICE_STEP}
              value={maxPrice}
              onChange={(event) => {
                const value = Number(event.target.value);
                if (value >= minPrice) onChange(event);
              }}
              aria-label="Maximum price"
            />
          </label>
          <div className="category-page__price-values">
            <span>${minPrice}</span>
            <span>${maxPrice}</span>
          </div>
        </div>
      </FilterSection>

      <button className="category-page__apply" type="button" onClick={onApply}>
        Apply Filters
      </button>
    </aside>
  );
};

export default CategoryFilters;

