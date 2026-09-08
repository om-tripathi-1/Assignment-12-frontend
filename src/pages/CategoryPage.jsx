import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Breadcrumb from "../components/ui/Breadcrumb";
import CategoryFilters from "../components/ui/CategoryFilters";
import CategoryHeader from "../components/ui/CategoryHeader";
import CategoryPagination from "../components/ui/CategoryPagination";
import CategoryProductGrid from "../components/ui/CategoryProductGrid";
import { getAllCategories } from "../api/category.service";
import { getAllProducts, getProductImageUrl } from "../api/product.service";

const initialFilters = { minPrice: "", maxPrice: "", sort: "newest" };

const CategoryPage = () => {
  const { categoryName } = useParams();
  const [categories, setCategories] = useState([]);
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
    (category) => category.name.toLowerCase() === (categoryName || "").toLowerCase(),
  );
  const pageTitle = selectedCategory?.name || categoryName || "Shop";

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const response = await getAllCategories();
        setCategories(response.categories || []);
      } catch {
        setCategories([]);
      }
    };

    loadCategories();
  }, []);

  useEffect(() => {
    const loadProducts = async () => {
      setIsLoading(true);
      setHasError(false);

      const productParams = {
        ...(selectedCategory?._id && { category: selectedCategory._id }),
        page: currentPage,
        limit: 9,
        sort: appliedFilters.sort,
      };

      if (appliedFilters.minPrice) productParams.minPrice = appliedFilters.minPrice;
      if (appliedFilters.maxPrice) productParams.maxPrice = appliedFilters.maxPrice;

      try {
        const response = await getAllProducts(productParams);
        setProducts(response.products || []);
        setTotalPages(response.totalPages || 1);
        setTotalProducts(response.totalProducts || 0);
      } catch {
        setHasError(true);
        setProducts([]);
      } finally {
        setIsLoading(false);
      }
    };

    loadProducts();
  }, [selectedCategory?._id, appliedFilters, currentPage]);

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
    const imagePath = typeof image === "string" ? image : image?.path || image?.url;
    return getProductImageUrl(imagePath);
  };

  return (
    <>
      <Breadcrumb items={[{ label: "Home", to: "/" }, { label: pageTitle }]} />
      <main className="category-page">
        <CategoryHeader
          title={pageTitle}
          totalProducts={totalProducts}
          filters={filters}
          onFilterChange={updateFilter}
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
        <CategoryPagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPrevious={() => setCurrentPage((page) => page - 1)}
          onNext={() => setCurrentPage((page) => page + 1)}
        />
      </main>
    </>
  );
};

export default CategoryPage;