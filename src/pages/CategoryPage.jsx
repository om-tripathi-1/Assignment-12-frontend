import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import Breadcrumb from "../components/ui/Breadcrumb";
import CategoryFilters from "../components/ui/CategoryFilters";
import CategoryHeader from "../components/ui/CategoryHeader";
import CategoryPagination from "../components/ui/CategoryPagination";
import CategoryProductGrid from "../components/ui/CategoryProductGrid";
import { getAllCategories } from "../api/category.service";
import { getAllProducts, getProductImageUrl } from "../api/product.service";

const initialFilters = { minPrice: "", maxPrice: "", sort: "newest" };

/**
 * Catalog browsing page supporting category filtering, keyword searching,
 * price boundaries, sort ordering, and pagination.
 */
const CategoryPage = () => {
  const { categoryName } = useParams();
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("search") || "";

  const [categories, setCategories] = useState([]);
  const [areCategoriesLoading, setAreCategoriesLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [filters, setFilters] = useState(initialFilters);
  const [appliedFilters, setAppliedFilters] = useState(initialFilters);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const selectedCategory = categories.find(
    (category) =>
      category.name?.toLowerCase() === (categoryName || "").toLowerCase()
  );
  const selectedCategoryId = selectedCategory?._id;

  const pageTitle = searchQuery
    ? `Search: "${searchQuery}"`
    : selectedCategory?.name || categoryName || "All Products";

  useEffect(() => {
    let isCurrent = true;

    const loadCategories = async () => {
      try {
        const response = await getAllCategories();
        if (isCurrent) {
          setCategories(response.categories || []);
        }
      } catch (error) {
        console.error("Could not load categories:", error);
        if (isCurrent) setCategories([]);
      } finally {
        if (isCurrent) setAreCategoriesLoading(false);
      }
    };

    loadCategories();

    return () => {
      isCurrent = false;
    };
  }, []);

  useEffect(() => {
    let isCurrent = true;

    const loadProducts = async () => {
      if (areCategoriesLoading) return;

      if (categoryName && !selectedCategoryId) {
        setProducts([]);
        setTotalPages(1);
        setTotalProducts(0);
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      setHasError(false);

      const productParams = {
        page: currentPage,
        limit: 9,
        sort: appliedFilters.sort,
      };

      if (selectedCategoryId) {
        productParams.category = selectedCategoryId;
      }

      if (searchQuery) {
        productParams.search = searchQuery;
      }

      if (appliedFilters.minPrice) {
        productParams.minPrice = appliedFilters.minPrice;
      }

      if (appliedFilters.maxPrice) {
        productParams.maxPrice = appliedFilters.maxPrice;
      }

      try {
        const response = await getAllProducts(productParams);
        if (isCurrent) {
          setProducts(response.products || []);
          setTotalPages(response.totalPages || 1);
          setTotalProducts(response.totalProducts || 0);
        }
      } catch (error) {
        console.error("Error fetching catalog products:", error);
        if (isCurrent) {
          setHasError(true);
          setProducts([]);
        }
      } finally {
        if (isCurrent) setIsLoading(false);
      }
    };

    loadProducts();

    return () => {
      isCurrent = false;
    };
  }, [
    areCategoriesLoading,
    categoryName,
    selectedCategoryId,
    searchQuery,
    appliedFilters,
    currentPage,
  ]);

  const updateFilter = (event) => {
    const { name, value } = event.target;
    setFilters((currentFilters) => ({ ...currentFilters, [name]: value }));
  };

  const applyFilters = () => {
    setCurrentPage(1);
    setAppliedFilters(filters);
    setIsFilterOpen(false);
  };

  const getImageSource = (product) => {
    const image = product.images?.[0];
    const imagePath =
      typeof image === "string" ? image : image?.path || image?.url;
    return getProductImageUrl(imagePath);
  };

  return (
    <>
      <Breadcrumb
        items={[
          { label: "Home", to: "/" },
          { label: "Shop", to: "/category" },
          ...(categoryName ? [{ label: selectedCategory?.name || categoryName }] : []),
        ]}
      />

      <main className="category-page">
        <CategoryHeader
          title={pageTitle}
          totalProducts={totalProducts}
          filters={filters}
          onFilterChange={(e) => {
            updateFilter(e);
            if (e.target.name === "sort") {
              setAppliedFilters((prev) => ({ ...prev, sort: e.target.value }));
            }
          }}
          onFilterToggle={() => setIsFilterOpen((isOpen) => !isOpen)}
          isFilterOpen={isFilterOpen}
        />

        <div className="category-page__layout">
          <CategoryFilters
            categories={categories}
            filters={filters}
            isOpen={isFilterOpen}
            onChange={updateFilter}
            onApply={applyFilters}
            onClose={() => setIsFilterOpen(false)}
          />

          <CategoryProductGrid
            products={products}
            isLoading={isLoading}
            hasError={hasError}
            getImageSource={getImageSource}
          />
        </div>

        {totalPages > 1 && (
          <CategoryPagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPrevious={() => setCurrentPage((page) => Math.max(1, page - 1))}
            onNext={() => setCurrentPage((page) => Math.min(totalPages, page + 1))}
          />
        )}
      </main>
    </>
  );
};

export default CategoryPage;

