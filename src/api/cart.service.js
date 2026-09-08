import api from "./axios";
import { getProductImageUrl } from "./product.service";

/**
 * Normalizes backend cart response documents into clean frontend cart items.
 * Safely filters out null references if a product has been removed from the database.
 */
const normalizeItems = (data) => {
  if (!data || !Array.isArray(data.items)) return [];

  return data.items
    .filter((item) => Boolean(item && item.productId))
    .map((item) => {
      const product = item.productId;
      const firstImage = Array.isArray(product.images)
        ? product.images[0]
        : product.images;

      return {
        id: product._id || product.id,
        name: product.name || "Unnamed Product",
        price: Number(product.price) || 0,
        oldPrice: product.originalPrice ? Number(product.originalPrice) : null,
        image: getProductImageUrl(
          typeof firstImage === "string" ? firstImage : firstImage?.path || firstImage?.url
        ),
        size: item.size || "Standard",
        color: item.color || "Default",
        quantity: Number(item.quantity) || 1,
      };
    });
};

/**
 * Retrieves the current user's cart items.
 */
export const getCartItems = async () => {
  try {
    const response = await api.get("/cart");
    return normalizeItems(response.data);
  } catch (error) {
    console.error("Failed to load cart items:", error);
    throw error;
  }
};

/**
 * Adds a product to the user's cart.
 */
export const addCartItem = async (productId, quantity = 1, metadata = {}) => {
  try {
    const response = await api.post("/cart/items", {
      productId,
      quantity,
      ...metadata,
    });
    return normalizeItems(response.data);
  } catch (error) {
    console.error("Failed to add product to cart:", error);
    throw error;
  }
};

/**
 * Updates the quantity of a cart item.
 */
export const updateCartItem = async (productId, quantity) => {
  try {
    const response = await api.put(`/cart/items/${productId}`, { quantity });
    return normalizeItems(response.data);
  } catch (error) {
    console.error(`Failed to update cart item ${productId}:`, error);
    throw error;
  }
};

/**
 * Removes an item completely from the cart.
 */
export const removeCartItem = async (productId) => {
  try {
    const response = await api.delete(`/cart/items/${productId}`);
    return normalizeItems(response.data);
  } catch (error) {
    console.error(`Failed to remove cart item ${productId}:`, error);
    throw error;
  }
};