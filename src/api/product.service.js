import api from "./axios";

const BACKEND_ORIGIN =
  import.meta.env.VITE_BACKEND_URL ||
  (import.meta.env.VITE_API_URL
    ? new URL(import.meta.env.VITE_API_URL).origin
    : "http://localhost:8080");

/**
 * Resolves a product image path into an absolute URL.
 * Handles existing absolute URLs, relative server paths, and null cases.
 */
export const getProductImageUrl = (imagePath) => {
  if (!imagePath) return "/assets/images/placeholder.png";
  if (imagePath.startsWith("http://") || imagePath.startsWith("https://")) {
    return imagePath;
  }
  const cleanPath = imagePath.startsWith("/") ? imagePath : `/${imagePath}`;
  return `${BACKEND_ORIGIN}${cleanPath}`;
};

/**
 * Fetches products from the catalog with optional filters, search query, sorting, and pagination.
 */
export const getAllProducts = async (params = {}) => {
  try {
    const response = await api.get("/products", { params });
    return response.data;
  } catch (error) {
    console.error("Failed to fetch products:", error);
    throw error;
  }
};

/**
 * Fetches single product details by ID.
 */
export const getProductById = async (id) => {
  try {
    const response = await api.get(`/products/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Failed to fetch product with ID ${id}:`, error);
    throw error;
  }
};

/**
 * Fetches customer reviews for a given product ID.
 */
export const getReviewsByProduct = async (productId) => {
  try {
    const response = await api.get(`/reviews/product/${productId}`);
    return response.data;
  } catch (error) {
    console.error(`Failed to fetch reviews for product ${productId}:`, error);
    throw error;
  }
};

/**
 * Creates a new product with multipart form data (including images).
 */
export const createProduct = async (productData) => {
  try {
    const formData = new FormData();
    for (const key in productData) {
      if (key === "images" && Array.isArray(productData.images)) {
        productData.images.forEach((image) => {
          formData.append("images", image);
        });
      } else if (productData[key] !== undefined && productData[key] !== null) {
        formData.append(key, productData[key]);
      }
    }

    const response = await api.post("/products", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  } catch (error) {
    console.error("Failed to create product:", error);
    throw error;
  }
};

/**
 * Updates an existing product by ID with multipart form data.
 */
export const updateProduct = async (id, productData) => {
  try {
    const formData = new FormData();
    for (const key in productData) {
      if (key === "images" && Array.isArray(productData.images)) {
        productData.images.forEach((image) => {
          formData.append("images", image);
        });
      } else if (productData[key] !== undefined && productData[key] !== null) {
        formData.append(key, productData[key]);
      }
    }

    const response = await api.put(`/products/${id}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  } catch (error) {
    console.error(`Failed to update product with ID ${id}:`, error);
    throw error;
  }
};

