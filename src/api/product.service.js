import api from "./axios";

export const getAllProducts = async (params = {}) => {
    try {
        const response = await api.get("/products", {
            params,
        });

        return response.data;
    } catch (error) {
        console.error("Error fetching products:", error);
        throw error;
    }
};

export const getProductImageUrl = (imagePath) => {
    if (!imagePath) return "";
    if (imagePath.startsWith("http")) return imagePath;
    return `http://localhost:8080${imagePath}`;
};

export const getProductById = async (id) => {
    try {
        const response = await api.get(`/products/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching product with ID ${id}:`, error);
        throw error;
    }
};

export const getReviewsByProduct = async (productId) => {
    try {
        const response = await api.get(`/reviews/product/${productId}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching reviews for product ${productId}:`, error);
        throw error;
    }
};

export const createProduct = async (productData) => {
    try {
        const formData = new FormData();
        for (const key in productData) {
            if (key === "images") {
                productData.images.forEach((image) => {
                    formData.append("images", image);
                });
            } else {
                formData.append(key, productData[key]);
            }
        }
    }catch (error) {
        console.error("Error creating product:", error);
        throw error;
    }
};

export const updateProduct = async (id, productData) => {
    try {
        const formData = new FormData();
        for (const key in productData) {
            if (key === "images") {
                productData.images.forEach((image) => {
                    formData.append("images", image);
                });
            } else {
                formData.append(key, productData[key]);
            }
        }
    } catch (error) {
        console.error(`Error updating product with ID ${id}:`, error);
        throw error;
    }
};
