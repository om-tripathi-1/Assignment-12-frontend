import ProductCard from "../layout/ProductCard";

const CategoryProductGrid = ({ products, isLoading, hasError, getImageSource }) => (
  <section className="category-page__results" aria-live="polite">
    {isLoading && <p className="category-page__message">Loading products...</p>}
    {hasError && <p className="category-page__message">Products could not be loaded.</p>}
    {!isLoading && !hasError && !products.length && <p className="category-page__message">No products found.</p>}
    {!isLoading && !hasError && products.map((product) => (
      <ProductCard key={product._id} product={product} imageSrc={getImageSource(product)} section="category-page" />
    ))}
  </section>
);

export default CategoryProductGrid;