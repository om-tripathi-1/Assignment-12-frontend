const CategoryPagination = ({
  currentPage = 1,
  totalPages = 1,
  onPrevious,
  onNext,
}) => (
  <nav className="category-page__pagination" aria-label="Catalog page navigation">
    <button
      className="category-page__pagination-previous"
      type="button"
      disabled={currentPage <= 1}
      onClick={onPrevious}
      aria-label="Go to previous page"
    >
      ← Previous
    </button>
    <span className="category-page__pagination-status">
      Page {currentPage} of {Math.max(1, totalPages)}
    </span>
    <button
      className="category-page__pagination-next"
      type="button"
      disabled={currentPage >= totalPages}
      onClick={onNext}
      aria-label="Go to next page"
    >
      Next →
    </button>
  </nav>
);

export default CategoryPagination;
