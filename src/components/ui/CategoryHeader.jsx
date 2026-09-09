const CategoryHeader = ({
  title = "Shop",
  totalProducts = 0,
  filters,
  onFilterChange,
  onFilterToggle,
  isFilterOpen = false,
}) => (
  <div className="category-page__heading-row">
    <div>
      <h1 className="category-page__heading">{title}</h1>
      <p className="category-page__count">
        Showing {totalProducts} product{totalProducts === 1 ? "" : "s"}
      </p>
    </div>
    <button
      className="category-page__filter-toggle"
      type="button"
      onClick={onFilterToggle}
      aria-expanded={isFilterOpen}
      aria-label="Toggle category filters"
    >
      Filters
    </button>
    <label className="category-page__sort">
      <span className="category-page__sort-label">Sort by </span>
      <select
        className="category-page__sort-select"
        name="sort"
        value={filters?.sort || "newest"}
        onChange={onFilterChange}
        aria-label="Sort products by"
      >
        <option value="newest">Newest</option>
        <option value="price_asc">Price: low to high</option>
        <option value="price_desc">Price: high to low</option>
        <option value="name">Name</option>
      </select>
    </label>
  </div>
);

export default CategoryHeader;

