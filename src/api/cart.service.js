import api from "./axios";
import { getProductImageUrl } from "./product.service";

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
        id: item._id || `${product._id || product.id}-${item.size || "Standard"}`,
        productId: product._id || product.id,
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

export const getCartItems = async () => {
  try {
    const response = await api.get("/cart");
    return normalizeItems(response.data);
  } catch (error) {
    console.error("Failed to load cart items:", error);
    throw error;
  }
};

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

export const updateCartItem = async (item, quantity) => {
  try {
    const response = await api.put(`/cart/items/${item.productId}`, { quantity }, {
      params: { size: item.size || "Standard" },
    });
    return normalizeItems(response.data);
  } catch (error) {
    console.error(`Failed to update cart item ${item.productId}:`, error);
    throw error;
  }
};

export const removeCartItem = async (item) => {
  try {
    const response = await api.delete(`/cart/items/${item.productId}`, {
      params: { size: item.size || "Standard" },
    });
    return normalizeItems(response.data);
  } catch (error) {
    console.error(`Failed to remove cart item ${item.productId}:`, error);
    throw error;
  }
};
