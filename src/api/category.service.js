import api from "./axios";

/**
 * Fetches the full list of available categories from the catalog.
 */
export const getAllCategories = async () => {
  try {
    const response = await api.get("/categories");
    return response.data;
  } catch (error) {
    console.error("Failed to fetch product categories:", error);
    throw error;
  }
};