import api from "./axios";

export const createOrder = async (items) => {
  try {
    const products = (items || []).map((item) => ({
      product: item.productId || item.id,
      size: item.size || "Standard",
      quantity: Number(item.quantity) || 1,
    }));

    const response = await api.post("/orders", { products });
    return response.data;
  } catch (error) {
    console.error("Failed to create order:", error);
    throw error;
  }
};

export const getUserOrders = async () => {
  try {
    const response = await api.get("/orders/user");
    return response.data;
  } catch (error) {
    console.error("Failed to load user orders:", error);
    throw error;
  }
};
