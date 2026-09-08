import api from "./axios";

/**
 * Places a new customer order with line items from the active cart.
 * Formats line items into the backend required schema: { product: id, quantity }
 */
export const createOrder = async (items) => {
  try {
    const products = (items || []).map((item) => ({
      product: item.id,
      quantity: Number(item.quantity) || 1,
    }));

    const response = await api.post("/orders", { products });
    return response.data;
  } catch (error) {
    console.error("Failed to create order:", error);
    throw error;
  }
};

/**
 * Retrieves the authenticated user's complete order history.
 */
export const getUserOrders = async () => {
  try {
    const response = await api.get("/orders/user");
    return response.data;
  } catch (error) {
    console.error("Failed to load user orders:", error);
    throw error;
  }
};