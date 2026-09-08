const CategoryPagination = ({ currentPage, totalPages, onPrevious, onNext }) => (
  <nav className="category-page__pagination" aria-label="Product pages">
    <button type="button" disabled={currentPage === 1} onClick={onPrevious}>← Previous</button>
    <span>Page {currentPage} of {totalPages}</span>
    <button type="button" disabled={currentPage === totalPages} onClick={onNext}>Next →</button>
  </nav>
);

export default CategoryPagination;