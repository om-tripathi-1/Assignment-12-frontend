import api from "./axios";

export const getAdminUsers = async () => {
  const response = await api.get("/users");
  return response.data.users || [];
};

export const getAdminOrders = async () => {
  const response = await api.get("/orders");
  return response.data;
};

export const updateOrderStatus = async (orderId, status) => {
  const response = await api.put(`/orders/${orderId}/status`, { status });
  return response.data;
};
