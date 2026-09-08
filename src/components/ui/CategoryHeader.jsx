const CategoryHeader = ({ title, totalProducts, filters, onFilterChange, onFilterToggle, isFilterOpen }) => (
  <div className="category-page__heading-row">
    <div>
      <h1 className="category-page__heading">{title}</h1>
      <p className="category-page__count">Showing {totalProducts} products</p>
    </div>
    <button className="category-page__filter-toggle" type="button" onClick={onFilterToggle} aria-expanded={isFilterOpen}>Filters</button>
    <label className="category-page__sort">
      <span>Sort by</span>
      <select name="sort" value={filters.sort} onChange={onFilterChange}>
        <option value="newest">Newest</option>
        <option value="price_asc">Price: low to high</option>
        <option value="price_desc">Price: high to low</option>
        <option value="name">Name</option>
      </select>
    </label>
  </div>
);

export default CategoryHeader;