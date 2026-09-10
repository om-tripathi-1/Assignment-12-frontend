import api from "./axios";

const BACKEND_ORIGIN = "http://localhost:8080";

export const getProductImageUrl = (imagePath) => {
  if (imagePath && typeof imagePath === "object") {
    imagePath = imagePath.path || imagePath.url;
  }
  if (!imagePath) return "/assets/images/placeholder.png";
  if (imagePath.startsWith("http://") || imagePath.startsWith("https://")) {
    return imagePath;
  }
  const cleanPath = imagePath.startsWith("/") ? imagePath : `/${imagePath}`;
  return `${BACKEND_ORIGIN}${cleanPath}`;
};

export const getAllProducts = async (params = {}) => {
  try {
    const response = await api.get("/products", { params });
    return response.data;
  } catch (error) {
    console.error("Failed to fetch products:", error);
    throw error;
  }
};

export const getProductById = async (id) => {
  try {
    const response = await api.get(`/products/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Failed to fetch product with ID ${id}:`, error);
    throw error;
  }
};

export const createProduct = async (productData) => {
  try {
    const formData = new FormData();
    for (const key in productData) {
      if (key === "images" && Array.isArray(productData.images)) {
        productData.images.forEach((image) => {
          formData.append("images", image);
        });
      } else if (key === "variants") {
        formData.append(key, JSON.stringify(productData[key]));
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

export const updateProduct = async (id, productData) => {
  try {
    const formData = new FormData();
    for (const key in productData) {
      if (key === "images" && Array.isArray(productData.images)) {
        productData.images.forEach((image) => {
          formData.append("images", image);
        });
      } else if (key === "variants") {
        formData.append(key, JSON.stringify(productData[key]));
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

export const deleteProduct = async (id) => {
  try {
    await api.delete(`/products/${id}`);
  } catch (error) {
    console.error(`Failed to delete product with ID ${id}:`, error);
    throw error;
  }
};

