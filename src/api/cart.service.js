import api from "./axios";
import { getProductImageUrl } from "./product.service";

const normalizeItems = (data) =>
  (data.items || []).map((item) => ({
    id: item.productId._id,
    name: item.productId.name,
    price: item.productId.price,
    oldPrice: item.productId.originalPrice,
    image: getProductImageUrl(item.productId.images?.[0]),
    size: "Not selected",
    color: "Not available",
    quantity: item.quantity,
  }));

export const getCartItems = async () => {
  const response = await api.get("/cart");
  return normalizeItems(response.data);
};

export const getCartCount = async () => {
  const response = await api.get("/cart");
  return (response.data.items || []).reduce(
    (total, item) => total + item.quantity,
    0,
  );
};

const notifyCartUpdated = () => window.dispatchEvent(new Event("cart-updated"));

export const addCartItem = async (productId, quantity) => {
  const response = await api.post("/cart/items", { productId, quantity });
  notifyCartUpdated();
  return normalizeItems(response.data);
};

export const updateCartItem = async (productId, quantity) => {
  const response = await api.put(`/cart/items/${productId}`, { quantity });
  notifyCartUpdated();
  return normalizeItems(response.data);
};

export const removeCartItem = async (productId) => {
  const response = await api.delete(`/cart/items/${productId}`);
  notifyCartUpdated();
  return normalizeItems(response.data);
};