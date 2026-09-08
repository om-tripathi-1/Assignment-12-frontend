import React from "react";
import ProductCard from "../layout/ProductCard";

const CategoryProductGrid = ({
  products = [],
  isLoading = false,
  hasError = false,
  getImageSource,
}) => (
  <section className="category-page__results" aria-live="polite">
    {isLoading && (
      <p className="category-page__message">Loading products...</p>
    )}
    {hasError && (
      <p className="category-page__message">
        Unable to load products. Please try again.
      </p>
    )}
    {!isLoading && !hasError && products.length === 0 && (
      <p className="category-page__message">No products matched your criteria.</p>
    )}
    {!isLoading &&
      !hasError &&
      products.map((product) => (
        <ProductCard
          key={product._id || product.id}
          product={product}
          imageSrc={getImageSource ? getImageSource(product) : ""}
          section="category-page"
        />
      ))}
  </section>
);

export default CategoryProductGrid;
