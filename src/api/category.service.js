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

export const createCategory = async (categoryData) => {
  const response = await api.post("/categories/create", categoryData);
  return response.data.category;
};

export const updateCategory = async (id, categoryData) => {
  const response = await api.put(`/categories/${id}`, categoryData);
  return response.data.category;
};

export const deleteCategory = async (id) => {
  await api.delete(`/categories/${id}`);
};
