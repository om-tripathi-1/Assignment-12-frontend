import { Link } from "react-router-dom";

const FilterSection = ({ title, children }) => (
  <section className="category-page__filter-section">
    <h2 className="category-page__filter-title">{title}</h2>
    {children}
  </section>
);

const CategoryFilters = ({
  categories,
  filters,
  isOpen,
  onChange,
  onApply,
  onClose,
}) => (
  <aside className={`category-page__filters${isOpen ? " is-open" : ""}`}>
    <div className="category-page__filters-header">
      <h2>Filters</h2>
      <button type="button" onClick={onClose} aria-label="Close filters">
        ×
      </button>
    </div>
    <FilterSection title="Categories">
      <div className="category-page__category-list">
        {categories.map((category) => (
          <Link
            key={category._id}
            to={`/category/${category.name}`}
            className="category-page__category-link"
          >
            {category.name}
            <span aria-hidden="true">›</span>
          </Link>
        ))}
      </div>
    </FilterSection>
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
    <FilterSection title="Availability">
      <label className="category-page__checkbox">
        <input type="checkbox" disabled />
        <span>In stock</span>
      </label>
    </FilterSection>
    <button className="category-page__apply" type="button" onClick={onApply}>
      Apply filters
    </button>
  </aside>
);

export default CategoryFilters;
