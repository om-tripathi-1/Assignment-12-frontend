import api from "./axios";

/**
 * Retrieves all reviews for a product.
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
 * Creates a review for a product for the authenticated user.
 */
export const createReview = async ({ productId, rating, comment }) => {
  try {
    const response = await api.post("/reviews/create", {
      productId,
      rating,
      comment,
    });
    return response.data;
  } catch (error) {
    console.error("Failed to create review:", error);
    throw error;
  }
};
