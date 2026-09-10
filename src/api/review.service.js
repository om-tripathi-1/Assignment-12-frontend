import api from "./axios";

export const getReviewsByProduct = async (productId) => {
  try {
    const response = await api.get(`/reviews/product/${productId}`);
    return response.data;
  } catch (error) {
    console.error(`Failed to fetch reviews for product ${productId}:`, error);
    throw error;
  }
};

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

export const checkCanReview = async (productId) => {
  try {
    const response = await api.get(`/reviews/can-review/${productId}`);
    return response.data;
  } catch (error) {
    return { canReview: false };
  }
};
